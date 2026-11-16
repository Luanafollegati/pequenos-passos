import express from 'express';
import bcrypt from 'bcrypt';
import pool from '../config/database.js';
import { verificarLogin } from '../middleware/auth.js';

const router = express.Router();

// Abrir tela de login
router.get('/login', (req, res) => {
    res.render('login', { erro: null });
});

// Realizar login
router.post('/login', async (req, res) => {
    try {
        const { cpf, senha } = req.body;

        const resultado = await pool.query('SELECT * FROM usuarios WHERE cpf = $1', [cpf]);

        const usuario = resultado.rows[0];

        if (!usuario || !(await bcrypt.compare(senha, usuario.senha_hash))) {
            return res.render('login', {
                erro: 'CPF ou senha incorretos.',
            });
        }

        req.session.usuario = {
            id: usuario.id,
            nome: usuario.nome,
        };

        res.redirect('/home');
    } catch (erro) {
        console.error(erro);
        res.status(500).send('Erro ao realizar login.');
    }
});

// Abrir página inicial
router.get('/home', verificarLogin, (req, res) => {
    res.render('home', {
        usuario: req.session.usuario,
    });
});

// Sair do sistema
router.post('/logout', (req, res) => {
    req.session.destroy((erro) => {
        if (erro) {
            return res.status(500).send('Erro ao sair do sistema.');
        }

        res.clearCookie('connect.sid');
        res.redirect('/login');
    });
});

export default router;
