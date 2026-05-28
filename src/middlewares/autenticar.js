const jwt = require("jsonwebtoken");

// TODO: corrigir
const JWT_SECRET = "123456";

function autenticar(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ erro: "Token não fornecido" });

  jwt.verify(token, JWT_SECRET, (err, usuario) => {
    if (err) return res.status(403).json({ erro: "Token inválido" });
    req.usuario = usuario;
    next();
  });
}

module.exports = { autenticar, JWT_SECRET };
