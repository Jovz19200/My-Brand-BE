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
const index_1 = require("../../index");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const globals_1 = require("@jest/globals");
const db_1 = require("../../db_config/db");
const db_2 = require("../../db_config/db");
const user_1 = __importDefault(require("../../models/user"));
const request = require('supertest')(index_1.app);
(0, globals_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.connectDB)();
}));
(0, globals_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_2.closeDB)();
}));
let token;
// USers Test
(0, globals_1.describe)("Login /", () => {
    (0, globals_1.it)('responds with status 200 successs!', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post("/api/v1/users/auth").send({
            email: "gisubizo.jovan12@gmail.com",
            password: "ten10@2021"
        });
        (0, globals_1.expect)(response.status).toBe(200);
        (0, globals_1.expect)(response.body.status).toBe("success");
        token = response.body.token;
    }));
});
(0, globals_1.describe)("GET /", () => {
    (0, globals_1.it)('responds with status 200 successs!', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/api/v1/users").set("Authorization", `Bearer ${token}`);
        (0, globals_1.expect)(response.status).toBe(200);
    }));
});
(0, globals_1.describe)("POST /", () => {
    (0, globals_1.it)('responds with status 201 user created!', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            name: "Test User",
            email: "testUser55@gmail.com",
            role: "admin",
            password: "test@123"
        };
        const existingUser = user_1.default.findOne({ email: user.email });
        console.log(existingUser.body);
        if (existingUser) {
            user_1.default.deleteOne(existingUser);
        }
        else {
            const response = yield request.post("/api/v1/users").send(user);
            console.log(response.body);
            (0, globals_1.expect)(response.status).toBe(201);
        }
    }));
});
// Querries
