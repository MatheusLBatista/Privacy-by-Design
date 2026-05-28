const { Router } = require("express");
const { cadastrar, login, listar } = require("../controllers/usuariosController");
const { autenticar } = require("../middlewares/autenticar");

const router = Router();

router.post("/cadastro", cadastrar);
router.post("/login", login);
router.get("/usuarios", autenticar, listar);

module.exports = router;
