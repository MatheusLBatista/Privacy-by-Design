const express = require("express");
const usuariosRoutes = require("./routes/usuarios");
const demandasRoutes = require("./routes/demandas");

const app = express();
app.use(express.json());

app.use(usuariosRoutes);
app.use(demandasRoutes);

module.exports = app;
