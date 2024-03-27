import jwt, {sign, verify} from "jsonwebtoken";
import { getSingleUser } from "../services/userService";
import { Request, Response, NextFunction } from "express";
import { UserType } from "../models/user";
import dotenv from "dotenv"
dotenv.config();

declare global {
    namespace Express {
        interface Request {
            user?: UserType;
        }
    }
}
const generateToken = (user: any) =>{
    const secret: string | undefined = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT secret is not defined.");
    }
    return sign({email: user.email}, secret, {expiresIn: "5h"})

}


export const Authorization = async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined = undefined;

    try {
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
           return  res.status(401).json({
                status: "failed",
                message: "You are not logged in. Please login to continue.",
            });
        }
        const secret: string | undefined = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT secret is not defined.");
        }
        if (typeof token !== "string") {
            throw new Error("Token is not a string.");
        }
        const decoded: any = jwt.verify(token, secret);
        const loggedUser: UserType = await getSingleUser(decoded.userId);
        if (!loggedUser) {
            return res.status(401).json({
                status: "failed",
                message: "Token has expired. Please login again.",
            });
        }
        const isAdmin = loggedUser.role === "admin";
        if(!isAdmin){
            return res.status(401).json({
                status: "failed",
                message: "only admin user have this access"
            });
        }
        req.user = loggedUser;
        if(loggedUser && isAdmin) {
            next();
        } else {
            throw new Error("you are not authorised for this action")
        }
    } catch (error: any) {
       return  res.status(401).json({
            status: "failed",
            error: error.message + " Token has expired. Please login again.",
        });
    }
};