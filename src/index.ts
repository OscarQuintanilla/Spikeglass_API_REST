import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";

import usersRoutes from "./router/usersRoutes";
import generalRoutes from "./router/generalRoutes";

class Server {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config(): void {
    this.app.set("port", process.env.PORT || 3000);
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes(): void {
    this.app.use("/session", usersRoutes);
    this.app.use("/general", generalRoutes);
  }

  start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log("Server: On \nPort: ", this.app.get("port"));
    });
  }
}

const server = new Server();
server.start();
