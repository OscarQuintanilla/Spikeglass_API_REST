"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class UsersConstroller {
    verify(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const { username } = req.body;
            const { password } = req.body;
            const server_response = yield database_1.default.query("SELECT * FROM users WHERE (email = ? AND password = ?) OR (username = ? AND password = ?)", [email, password, username, password]);
            res.json(server_response);
        });
    }
    CreateAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query("SELECT username FROM users");
            const server_response = yield database_1.default.query("INSERT INTO users SET ?", [
                req.body
            ]);
            res.json(server_response);
        });
    }
    UpdateInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            const server_response = yield database_1.default.query("UPDATE users SET ? ", [id]);
            res.json(server_response);
        });
    }
    DeleteAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const server_response = yield database_1.default.query("DELETE users WHERE id = ?", [id]);
            res.json(server_response);
        });
    }
}
exports.UsersConstroller = UsersConstroller;
const usersController = new UsersConstroller();
exports.default = usersController;
