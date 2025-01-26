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
const pg_1 = require("pg");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const client = new pg_1.Client(process.env.POSTGRES_URI);
function connectDb() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var temp = yield client.connect();
            console.log("db connected!");
        }
        catch (error) {
            console.log(error);
        }
    });
}
connectDb();
app.get("/users", function fetchUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var users = yield client.query("SELECT * FROM USERS;");
            res.json({
                users: users.rows,
            });
        }
        catch (error) {
            console.log(error);
        }
    });
});
app.post("/users", function InsertUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const username = req.body.username;
            const user = yield client.query(`INSERT INTO USERS(NAME)VALUES('${username}');`);
            res.status(200).json({
                message: "User Inserted Succesfully!",
            });
        }
        catch (error) {
            console.log(error);
            res.status(400).json({
                message: "Error Inserting User.",
                error
            });
        }
    });
});
app.listen(3000);
