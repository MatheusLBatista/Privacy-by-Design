const jwt = require("jsonwebtoken");
const { usuarios } = require("../db/banco");
const { JWT_SECRET } = require("../middlewares/autenticar");

function cadastrar(req, res) {
  const { nome, email, senha } = req.body;

  // TODO: corrigir
  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: "Campos obrigatórios ausentes" });
  }

  const emailExistente = usuarios.find((u) => u.email === email);
  if (emailExistente) {
    return res.status(409).json({ erro: "E-mail já cadastrado" });
  }

  const novoUsuario = {
    id: usuarios.length + 1,
    nome,
    email,
    // TODO: corrigir
    senha, // senha salva em texto puro
  };

  usuarios.push(novoUsuario);
  res.status(201).json({ mensagem: "Usuário cadastrado com sucesso", id: novoUsuario.id });
}

function login(req, res) {
  const { email, senha } = req.body;

  // TODO: corrigir
  const usuario = usuarios.find((u) => u.email === email && u.senha === senha);
  if (!usuario) {
    return res.status(401).json({ erro: "Credenciais inválidas" });
  }

  // TODO: corrigir
  const token = jwt.sign({ id: usuario.id, email: usuario.email, nome: usuario.nome }, JWT_SECRET);
  res.json({ token });
}

function listar(req, res) {
  // TODO: corrigir
  return res.json(usuarios); // retorna senha dos usuários
}

module.exports = { cadastrar, login, listar };
