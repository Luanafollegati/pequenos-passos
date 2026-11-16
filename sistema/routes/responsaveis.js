import express from 'express';
import pool from '../config/database.js';
import { verificarLogin } from '../middleware/auth.js';

const router = express.Router();

// Listar e pesquisar responsáveis
router.get('/responsaveis', verificarLogin, async (req, res) => {
    try {
        const busca = req.query.busca || '';

        const resultado = await pool.query(
            `SELECT * FROM responsaveis
             WHERE nome ILIKE $1
             ORDER BY nome`,
            [`%${busca}%`],
        );

        res.render('responsaveis/index', {
            responsaveis: resultado.rows,
            busca,
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).send('Erro ao carregar responsáveis.');
    }
});

// Abrir formulário de cadastro
router.get('/responsaveis/novo', verificarLogin, (req, res) => {
    res.render('responsaveis/formulario', {
        responsavel: null,
    });
});

// Cadastrar responsável
router.post('/responsaveis', verificarLogin, async (req, res) => {
    try {
        const { nome, cpf, email, telefone } = req.body;

        await pool.query(
            `INSERT INTO responsaveis (nome, cpf, email, telefone)
             VALUES ($1, $2, $3, $4)`,
            [nome, cpf, email, telefone],
        );

        res.redirect('/responsaveis');
    } catch (erro) {
        console.error(erro);
        res.status(400).send('Erro ao cadastrar responsável. Verifique os dados informados.');
    }
});

// Abrir formulário de edição
router.get('/responsaveis/editar/:id', verificarLogin, async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM responsaveis WHERE id = $1', [
            req.params.id,
        ]);

        if (resultado.rows.length === 0) {
            return res.status(404).send('Responsável não encontrado.');
        }

        res.render('responsaveis/formulario', {
            responsavel: resultado.rows[0],
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).send('Erro ao buscar responsável.');
    }
});

// Atualizar responsável
router.post('/responsaveis/editar/:id', verificarLogin, async (req, res) => {
    try {
        const { nome, cpf, email, telefone } = req.body;

        await pool.query(
            `UPDATE responsaveis
             SET nome = $1, cpf = $2, email = $3, telefone = $4
             WHERE id = $5`,
            [nome, cpf, email, telefone, req.params.id],
        );

        res.redirect('/responsaveis');
    } catch (erro) {
        console.error(erro);
        res.status(400).send('Erro ao atualizar responsável. Verifique os dados informados.');
    }
});

// Excluir responsável
router.post('/responsaveis/excluir/:id', verificarLogin, async (req, res) => {
    try {
        await pool.query('DELETE FROM responsaveis WHERE id = $1', [req.params.id]);

        res.redirect('/responsaveis');
    } catch (erro) {
        console.error(erro);
        res.status(400).send(
            'Não foi possível excluir este responsável. Ele pode possuir crianças vinculadas.',
        );
    }
});

export default router;
