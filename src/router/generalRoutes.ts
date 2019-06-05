import { Router } from "express";
import generalController from "../controllers/generalController";

class GeneralRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.use("/generateId", generalController.generateId);
  }
}

const generalRoutes = new GeneralRoutes();
export default generalRoutes.router;
