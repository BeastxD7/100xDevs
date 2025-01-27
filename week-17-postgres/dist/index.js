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
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.users.findMany({
            select: {
                username: true,
                email: true
            }
        });
        res.status(200).json({
            messsage: "success",
            users,
        });
    }
    catch (error) {
        res.status(400).json({
            messsage: "error",
            error,
        });
    }
}));
app.get("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const users = yield prisma.users.findFirst({
            where: { id: parseInt(id) },
            select: {
                username: true,
                email: true
            }
        });
        res.status(200).json({
            messsage: "success",
            users,
        });
    }
    catch (error) {
        res.status(400).json({
            messsage: "error",
            error,
        });
    }
}));
app.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const user = yield prisma.users.create({
            data: {
                username,
                email,
                password,
            },
        });
        res.status(200).json({
            messsage: "success",
            user,
        });
    }
    catch (error) {
        res.status(400).json({
            messsage: "error",
            error,
        });
    }
}));
app.listen(3000, () => {
    console.log(`server running`);
});
