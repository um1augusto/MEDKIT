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

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
