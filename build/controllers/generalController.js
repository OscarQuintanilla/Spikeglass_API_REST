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
class GeneralController {
    generateId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_type } = req.body;
            var id = "";
            var initials = "";
            var table = "";
            var counter = 0;
            var assigned_number = 0;
            try {
                switch (id_type) {
                    case "user":
                        initials = "US";
                        table = "users";
                        break;
                }
                const accounts_list = yield database_1.default.query("SELECT id FROM " + table + " ORDER BY id ASC");
                console.log(JSON.stringify(accounts_list));
                accounts_list.forEach(entry => {
                    counter++;
                    let entry_parts = entry.id.split(/[S]/);
                    let quantity_parts = entry_parts.length;
                    if (+entry_parts[quantity_parts - 1] == counter) {
                        assigned_number = +entry_parts[quantity_parts - 1] + 1;
                        console.log(entry_parts[quantity_parts - 1]);
                    }
                    else {
                        console.log("Unknow error");
                    }
                });
                if (assigned_number < 10) {
                    id = initials + "0000000" + assigned_number;
                }
                else if (assigned_number < 100) {
                    id = initials + "000000" + assigned_number;
                }
                else if (assigned_number < 1000) {
                    id = initials + "00000" + assigned_number;
                }
                else if (assigned_number < 10000) {
                    id = initials + "0000" + assigned_number;
                }
                else if (assigned_number < 100000) {
                    id = initials + "000" + assigned_number;
                }
                else if (assigned_number < 1000000) {
                    id = initials + "00" + assigned_number;
                }
                else if (assigned_number < 10000000) {
                    id = initials + "0" + assigned_number;
                }
                else if (assigned_number < 10000000) {
                    id = initials + assigned_number;
                }
                else if (assigned_number >= 10000000) {
                    console.log("Limit of entries exceded");
                }
            }
            catch (error) {
                console.log("An error had ocurred: " + error);
            }
            res.json(id);
        });
    }
}
const generalController = new GeneralController();
exports.default = generalController;
