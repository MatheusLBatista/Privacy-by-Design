const { Router } = require("express");
const { criar, listar } = require("../controllers/demandasController");
const { autenticar } = require("../middlewares/autenticar");
const upload = require("../middlewares/upload");

const router = Router();

router.post("/demandas", autenticar, upload.single("imagem"), criar);
router.get("/demandas", autenticar, listar);

module.exports = router;
