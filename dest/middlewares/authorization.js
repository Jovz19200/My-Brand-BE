"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorization = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userService_1 = require("../services/userService");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Authorization = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = undefined;
    try {
        if (req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            res.status(401).json({
                status: "failed",
                message: "You are not logged in. Please login to continue.",
            });
        }
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT secret is not defined.");
        }
        if (typeof token !== "string") {
            throw new Error("Token is not a string.");
        }
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        const loggedUser = yield (0, userService_1.getSingleUser)(decoded.userId);
        if (!loggedUser) {
            res.status(401).json({
                status: "failed",
                message: "Token has expired. Please login again.",
            });
        }
        const isAdmin = loggedUser.role === "admin";
        if (!isAdmin) {
            res.status(401).json({
                status: "failed",
                message: "only admin user have this access"
            });
        }
        req.user = loggedUser;
        if (loggedUser && isAdmin) {
            next();
        }
        else {
            throw new Error("you are not authorised for this action");
        }
    }
    catch (error) {
        res.status(401).json({
            status: "failed",
            error: error.message + " Token has expired. Please login again.",
        });
    }
});
exports.Authorization = Authorization;
