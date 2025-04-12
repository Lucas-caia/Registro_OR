const express = require('express');
const cors = require('cors'); // Adicione essa linha
const mongoose = require('mongoose');
const Registro = require('./list');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://192.168.0.1:27017/Registro_OR', {
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

app.post('/api/registros/import', async (req, res) => {
  try {
    await Registro.deleteMany({});
    const novos = await Registro.insertMany(req.body);
    res.status(201).json(novos);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/api/export', async (req, res) => {
  try {
    const registros = await Registro.find();
    const jsonContent = JSON.stringify(registros, null, 2);
    const filename = `registros.json`;
    const outputPath = path.join(__dirname, 'js', filename);
    fs.writeFileSync(outputPath, jsonContent, 'utf8');
    res.json({ message: 'Exportação realizada com sucesso!', filename });
  } catch (error) {
    console.error("Erro na exportação:", error);
    res.status(500).json({ message: 'Falha ao exportar registros.', error });
  }
});

// Rota para páginas não encontradas (Erro 404)
// Essa rota é executada após todas as demais, capturando as requisições não tratadas.
app.use((req, res) => {
  res.status(404).sendFile(__dirname + '/Pages/404.html');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
