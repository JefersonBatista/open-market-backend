import connection from "../db.js";

export async function createProduct(req, res) {
  const { nome, preco } = req.body;

  try {
    await connection.query(
      `INSERT INTO produtos (nome, preco, "idUsuario") VALUES ($1, $2, $3)`,
      [nome, preco, res.locals.userId]
    );

    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.status(500).send("Houve um erro interno no servidor");
  }
}
