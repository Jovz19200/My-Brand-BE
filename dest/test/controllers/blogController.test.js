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
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const db_1 = require("../../db_config/db");
const db_2 = require("../../db_config/db");
const request = require('supertest')(index_1.app);
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.connectDB)();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_2.closeDB)();
}));
describe('Blog Controller', () => {
    it('GET /', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get('/api/v1/blogs');
        expect(res.status).toBe(200);
        expect(res.body.status).toEqual('success');
        expect(Array.isArray(res.body.data)).toBe(true);
    }));
    it('GET /', () => __awaiter(void 0, void 0, void 0, function* () {
        const blogId = '65faa1650d0a7d15ded4deb4';
        const res = yield request.get(`/api/v1/blogs/${blogId}`);
        expect(res.status).toBe(200);
        expect(res.body.status).toEqual('success');
        expect(res.body.data._id).toEqual(blogId);
    }));
});
