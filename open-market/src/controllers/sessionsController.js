import bcrypt from "bcrypt";
import { v4 as generateToken } from "uuid";

import connection from "../db.js";

export async function signIn(req, res) {
  const { email, senha } = req.body;

  try {
    const userResult = await connection.query(
      `SELECT * FROM usuarios WHERE email=$1`,
      [email]
    );

    if (userResult.rowCount < 1) {
      return res
        .status(404)
        .send("Nenhum usuário com esse email está cadastrado");
    }

    const [user] = userResult.rows;
    const senhaCript = user.senha;
    if (!bcrypt.compareSync(senha, senhaCript)) {
      return res.status(401).send("Senha incorreta");
    }

    const token = generateToken();
    await connection.query(
      `INSERT INTO sessoes ("idUsuario", token) VALUES ($1, $2)`,
      [user.id, token]
    );

    res.send(token);
  } catch (error) {
    console.error(error);
    res.status(500).send("Houve um erro interno no servidor");
  }
}
