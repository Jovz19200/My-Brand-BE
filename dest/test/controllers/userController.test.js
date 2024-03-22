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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../../index");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const globals_1 = require("@jest/globals");
const db_1 = require("../../db_config/db");
const db_2 = require("../../db_config/db");
(0, globals_1.describe)('Database Connection', () => {
    (0, globals_1.test)('should connect to the database', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, db_1.connectDB)();
    }));
});
(0, globals_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
    (0, db_2.closeDB)();
}));
(0, globals_1.describe)("GET /", () => {
    (0, globals_1.test)('responds with status 200 successs!', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.app).get("/api/v1/users");
        (0, globals_1.expect)(response.status).toBe(200);
    }));
});
(0, globals_1.describe)("POST /", () => {
    (0, globals_1.test)('responds with status 201 user created!', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.app).post("/api/v1/users").send({
            name: "Test User",
            email: "testUser5@gmail.com",
            role: "admin",
            password: "test@123"
        });
        (0, globals_1.expect)(response.status).toBe(201);
    }));
});
