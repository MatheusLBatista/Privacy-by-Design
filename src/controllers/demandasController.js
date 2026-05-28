const { demandas } = require("../db/banco");

function criar(req, res) {
  const { titulo, descricao } = req.body;

  if (!titulo || !descricao) {
    return res.status(400).json({ erro: "Título e descrição são obrigatórios" });
  }

  const novaDemanda = {
    id: demandas.length + 1,
    titulo,
    descricao,
    // TODO: corrigir
    imagem: req.file ? req.file.filename : null, // sem validação de tipo de arquivo
    usuarioId: req.usuario.id,
    status: "aberta",
    criadaEm: new Date().toISOString(),
  };

  demandas.push(novaDemanda);
  res.status(201).json({ mensagem: "Demanda registrada com sucesso", id: novaDemanda.id });
}

function listar(req, res) {
  // TODO: corrigir
  return res.json(demandas); // retorna demandas de todos os usuários
}

module.exports = { criar, listar };
