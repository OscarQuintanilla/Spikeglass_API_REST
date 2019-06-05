"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = __importDefault(require("../controllers/usersController"));
class UsersRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post("/verify", usersController_1.default.verify);
        this.router.post("/create", usersController_1.default.CreateAccount);
        this.router.put("/update", usersController_1.default.UpdateInfo);
        this.router.delete("/delete/:id", usersController_1.default.DeleteAccount);
    }
}
const usersRoutes = new UsersRoutes();
exports.default = usersRoutes.router;
