import { Response, Request } from "express";
import pool from "../database";

class GeneralController {
  public async generateId(req: Request, res: Response) {
    const { id_type } = req.body;
    var id: string = "";
    var initials: string = "";
    var table: string = "";
    var counter: number = 0;
    var assigned_number: number = 0;

    try {
      switch (id_type) {
        case "user":
          initials = "US";
          table = "users";
          break;
      }

      const accounts_list: [{ id: "" }] = await pool.query(
        "SELECT id FROM " + table +" ORDER BY id ASC"
      );
      console.log(JSON.stringify(accounts_list));

      accounts_list.forEach(entry => {
        counter++;
        let entry_parts: string[] = entry.id.split(/[S]/);
        let quantity_parts: number = entry_parts.length;

        if (+entry_parts[quantity_parts - 1] == counter) {
          assigned_number = +entry_parts[quantity_parts - 1] + 1;
          console.log(entry_parts[quantity_parts - 1]);
        } else {
          console.log("Unknow error");
        }
      });

      if (assigned_number < 10) {
        id = initials + "0000000" + assigned_number;
      } else if (assigned_number < 100) {
        id = initials + "000000" + assigned_number;
      } else if (assigned_number < 1000) {
        id = initials + "00000" + assigned_number;
      } else if (assigned_number < 10000) {
        id = initials + "0000" + assigned_number;
      } else if (assigned_number < 100000) {
        id = initials + "000" + assigned_number;
      } else if (assigned_number < 1000000) {
        id = initials + "00" + assigned_number;
      } else if (assigned_number < 10000000) {
        id = initials + "0" + assigned_number;
      } else if (assigned_number < 10000000) {
        id = initials + assigned_number;
      } else if (assigned_number >= 10000000) {
        console.log("Limit of entries exceded");
      }
    } catch (error) {
      console.log("An error had ocurred: " + error);
    }

    res.json(id);
  }
}

const generalController = new GeneralController();
export default generalController;
