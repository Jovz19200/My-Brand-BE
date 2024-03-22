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
const db_1 = require("../../db_config/db");
describe('database connection', () => {
    test('must open db', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, db_1.connectDB)();
    }));
});
describe('Blog Controller', () => {
    test('GET /', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.app)
            .get('/api/v1/blogs')
            .expect(200);
        expect(res.body.status).toEqual('success');
        expect(Array.isArray(res.body.data)).toBe(true);
    }));
    test('GET /', () => __awaiter(void 0, void 0, void 0, function* () {
        const blogId = 'some-id';
        const res = yield (0, supertest_1.default)(index_1.app)
            .get(`/api/v1/blogs/${blogId}`)
            .expect(200);
        expect(res.body.status).toEqual('success');
        expect(res.body.data._id).toEqual(blogId);
    }));
    test('POST /', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.app)
            .post('/api/v1/blogs')
            .send({
            title: 'Test Blog',
            content: 'This is a test blog',
            Image: '../images/test1.jpg',
        });
    }));
});
