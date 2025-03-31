const mongoose = require('mongoose');

const RegistroSchema = new mongoose.Schema({
  nome: String,
  vidaMax: Number,
  sanidadeMax: Number,
  esforcoMax: Number,
  pm: Number,
  dinheiro: Number,
  classe: String,
  trilha: String,
  origem: String,
  idade: Number,
  missoes: [String],
  habilidades: [String],
  rituais: [String],
  comentarios: String,
  condecoracoes: [String],
  lojinha: [String],
  itensEspeciais: [String],
  skills: { type: Map, of: String },
  data: { type: Date, default: Date.now },
  favorito: { type: Boolean, default: false },
});

const Registro = mongoose.model('Registro', RegistroSchema);

module.exports = Registro;
