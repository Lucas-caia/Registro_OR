const fs = require('fs');
const mongoose = require('mongoose');
const Registro = require('./list');

require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI ||
  `mongodb://127.0.0.1:27017/Registro_OR`;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Conectado ao MongoDB');
    return Registro.find();
  })
  .then(registros => {
    const jsonContent = JSON.stringify(registros, null, 2);
    fs.writeFileSync('exported_registros.json', jsonContent, 'utf8');
    console.log('Exportação realizada com sucesso! O arquivo "exported_registros.json" foi criado.');
    process.exit(0);
  })
  .catch(err => {
    console.error('Erro durante a exportação:', err);
    process.exit(1);
  });
