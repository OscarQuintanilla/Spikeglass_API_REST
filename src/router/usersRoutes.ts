import { Router } from "express";
import usersController from "../controllers/usersController";

class UsersRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.post("/verify", usersController.verify);
    this.router.post("/create", usersController.CreateAccount);
    this.router.put("/update", usersController.UpdateInfo);
    this.router.delete("/delete/:id", usersController.DeleteAccount);
  }
}

const usersRoutes = new UsersRoutes();
export default usersRoutes.router;
