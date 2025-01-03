const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('./dbConfig');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const SECRET_KEY = 'segredo';

// Middleware para autenticação de token
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Endpoint de login
app.post('/login', async (req, res) => {
    const { cpf, senha } = req.body;

    // Busca o usuário pelo CPF
    const query = 'SELECT * FROM usuarios WHERE cpf = ?';
    db.query(query, [cpf], async (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro no servidor.' });
        }

        if (results.length === 0) {
            return res.status(400).json({ success: false, message: 'Usuário ou senha incorretos!' });
        }

        const user = results[0];

        // Verifica se a senha está correta
        const passwordMatch = await bcrypt.compare(senha, user.senha);
        if (!passwordMatch) {
            return res.status(400).json({ success: false, message: 'Usuário ou senha incorretos!' });
        }

        // Gera o token JWT
        const token = jwt.sign({ id: user.id_usuario, cpf: user.cpf }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ success: true, message: 'Login bem-sucedido!', token });
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
