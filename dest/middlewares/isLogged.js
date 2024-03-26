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
exports.isLogged = void 0;
const userService_1 = require("../services/userService");
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_2 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const generateToken = (user) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT secret is not defined.");
    }
    return (0, jsonwebtoken_1.sign)({ email: user.email }, secret, { expiresIn: "5h" });
};
const isLogged = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = undefined;
    try {
        if (req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            return res.status(401).json({
                status: "Unauthorized",
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
        const decoded = jsonwebtoken_2.default.verify(token, secret);
        const loggedUser = yield (0, userService_1.getSingleUser)(decoded.userId);
        if (!loggedUser) {
            return res.status(401).json({
                status: "Unauthorized",
                message: "Token has expired. Please login again.",
            });
        }
        req.user = loggedUser;
        next();
    }
    catch (error) {
        return res.status(401).json({
            status: "failed",
            error: error.message + " Token has expired. Please login again.",
        });
    }
});
exports.isLogged = isLogged;
