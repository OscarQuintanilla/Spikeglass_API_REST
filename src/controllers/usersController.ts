import pool from "../database";
import { Request, Response } from "express";

export class UsersConstroller {
  public async verify(req: Request, res: Response) {
    const { email } = req.body;
    const { username } = req.body;
    const { password } = req.body;

    const server_response = await pool.query(
      "SELECT * FROM users WHERE (email = ? AND password = ?) OR (username = ? AND password = ?)",
      [email, password, username, password]
    );

    res.json(server_response);
  }

  public async CreateAccount(req: Request, res: Response) {

    await pool.query("SELECT username FROM users")
    const server_response = await pool.query("INSERT INTO users SET ?", [
      req.body
    ]);
    res.json(server_response);
  }

  public async UpdateInfo(req: Request, res: Response) {
    const { id } = req.body;
    const server_response = await pool.query("UPDATE users SET ? ", [id]);
    res.json(server_response);
  }

  public async DeleteAccount(req: Request, res: Response) {
    const { id } = req.params;
    const server_response = await pool.query("DELETE users WHERE id = ?", [id]);
    res.json(server_response);
  }
}

const usersController = new UsersConstroller();
export default usersController;
