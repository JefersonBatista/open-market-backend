import connection from "../db.js";

export default async function validateAuth(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send("Você não está autorizado!");
  }

  const sessionResult = await connection.query(
    `SELECT * FROM sessoes WHERE token=$1`,
    [token]
  );

  if (sessionResult.rowCount < 1) {
    return res.status(401).send("Você não está autorizado!");
  }

  const [session] = sessionResult.rows;
  res.locals.userId = session.idUsuario;

  next();
}
