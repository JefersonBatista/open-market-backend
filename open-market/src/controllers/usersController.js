import bcrypt from "bcrypt";

import connection from "../db.js";

export async function signUp(req, res) {
  const { nome, email, senha } = req.body;

  const senhaCript = bcrypt.hashSync(senha, 10);

  try {
    const sameEmailResult = await connection.query(
      `SELECT * FROM usuarios WHERE email=$1;`,
      [email]
    );

    if (sameEmailResult.rowCount > 0) {
      return res
        .status(409)
        .send("Já existe um usuário cadastrado com esse email");
    }

    await connection.query(
      `INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3);`,
      [nome, email, senhaCript]
    );

    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.status(500).send("Houve um erro interno no servidor");
  }
}
