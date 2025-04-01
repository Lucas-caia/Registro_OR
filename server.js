const express = require('express');
const cors = require('cors'); // Adicione essa linha
const mongoose = require('mongoose');
const Registro = require('./list');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.RAILWAY_PRIVATE_DOMAIN}:27017/Registro_OR`;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

app.use(express.static('css'));
app.use(express.static('Pages'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/Pages/PrincipalPage.html');
});

app.get('/api/registros', async (req, res) => {
  try {
    const registros = await Registro.find();
    res.json(registros);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/api/registros/:id', async (req, res) => {
  try {
    const registro = await Registro.findById(req.params.id);
    if (!registro) return res.status(404).send("Registro não encontrado");
    res.json(registro);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/api/registros', async (req, res) => {
  try {
    const novoRegistro = new Registro(req.body);
    await novoRegistro.save();
    res.status(201).json(novoRegistro);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.put('/api/registros/:id', async (req, res) => {
  try {
    const registroAtualizado = await Registro.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(registroAtualizado);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete('/api/registros/:id', async (req, res) => {
  try {
    await Registro.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
