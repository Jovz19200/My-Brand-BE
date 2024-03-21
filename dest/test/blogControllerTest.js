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
const your_app_1 = require("your-app"); // import your Express app
describe('Blog Controller', () => {
    it('should fetch all blogs', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(your_app_1.app)
            .get('/blogs') // adjust this to your actual route
            .expect(200);
        expect(res.body.status).toEqual('success');
        expect(Array.isArray(res.body.data)).toBe(true);
    }));
    it('should fetch a blog by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const blogId = 'some-id'; // replace with an actual id from your database
        const res = yield (0, supertest_1.default)(your_app_1.app)
            .get(`/blogs/${blogId}`) // adjust this to your actual route
            .expect(200);
        expect(res.body.status).toEqual('success');
        expect(res.body.data._id).toEqual(blogId);
    }));
});
