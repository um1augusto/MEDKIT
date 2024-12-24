const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./dbConfig')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const SECRET_KEY = 'segredo';

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
