import { getSingleUser } from "../services/userService";
import { Request, Response, NextFunction } from "express";
import { UserType } from "../models/user";
import {sign, verify} from "jsonwebtoken";
import dotenv from "dotenv"
import jwt from "jsonwebtoken";
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
export const isLogged = async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined = undefined;
    try{
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            return res.status(401).json({
                status: "Unauthorized",
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
                status: "Unauthorized",
                message: "Token has expired. Please login again.",
            });
        }
        req.user = loggedUser;
        next();
    } catch (error: any) {
        return res.status(401).json({
            status: "failed",
            error: error.message + " Token has expired. Please login again.",
        });
    }
} 