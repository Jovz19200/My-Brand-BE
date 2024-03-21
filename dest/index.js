"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const blogRouter_1 = __importDefault(require("./routes/blogRouter"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const commentRouter_1 = __importDefault(require("./routes/commentRouter"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
exports.app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
mongoose_1.default.connect(process.env.mongoURI).then(() => {
}).catch(err => console.log(err));
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: false }));
exports.app.use((0, cors_1.default)());
exports.app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "welcome to My Brand Backend"
    });
});
exports.app.use("/api/v1/blogs", blogRouter_1.default);
exports.app.use("/api/v1/blogs", commentRouter_1.default);
exports.app.use("/api/v1/users", userRouter_1.default);
exports.app.use("/*", (req, res) => {
    res.status(404).json({
        status: "error",
        message: "Invalid url"
    });
});
exports.app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
