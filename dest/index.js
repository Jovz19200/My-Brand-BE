"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogRouter_1 = __importDefault(require("./routes/blogRouter"));
const commentRouter_1 = __importDefault(require("./routes/commentRouter"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
mongoose_1.default.connect(process.env.mongoURI).then(() => {
    console.log("mongoDB Connected!");
}).catch(err => console.log(err));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "welcome to my brand backend"
    });
});
app.use("/blogs", blogRouter_1.default);
app.use("/blogs", commentRouter_1.default);
app.use("/*", (req, res) => {
    res.status(404).json({
        status: "error",
        message: "Invalid url"
    });
});
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
