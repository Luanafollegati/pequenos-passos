import express from 'express';
import pool from '../config/database.js';
import { verificarLogin } from '../middleware/auth.js';

const router = express.Router();

// Listar crianças
router.get('/criancas', verificarLogin, async (req, res) => {
    try {
        const resultado = await pool.query(`
            SELECT criancas.*, responsaveis.nome AS nome_responsavel
            FROM criancas
            INNER JOIN responsaveis
                ON criancas.responsavel_id = responsaveis.id
            ORDER BY criancas.nome
        `);

        res.render('criancas/index', {
            criancas: resultado.rows,
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).send('Erro ao carregar crianças.');
    }
});

// Abrir formulário de cadastro
router.get('/criancas/novo', verificarLogin, async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM responsaveis ORDER BY nome');

        res.render('criancas/formulario', {
            crianca: null,
            responsaveis: resultado.rows,
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).send('Erro ao carregar responsáveis.');
    }
});

// Cadastrar criança
router.post('/criancas', verificarLogin, async (req, res) => {
    try {
        const { nome, data_nascimento, responsavel_id } = req.body;

        await pool.query(
            `INSERT INTO criancas (nome, data_nascimento, responsavel_id)
             VALUES ($1, $2, $3)`,
            [nome, data_nascimento, responsavel_id],
        );

        res.redirect('/criancas');
    } catch (erro) {
        console.error(erro);
        res.status(400).send('Erro ao cadastrar criança.');
    }
});

// Abrir formulário de edição
router.get('/criancas/editar/:id', verificarLogin, async (req, res) => {
    try {
        const criancaResultado = await pool.query('SELECT * FROM criancas WHERE id = $1', [
            req.params.id,
        ]);

        if (criancaResultado.rows.length === 0) {
            return res.status(404).send('Criança não encontrada.');
        }

        const responsaveisResultado = await pool.query('SELECT * FROM responsaveis ORDER BY nome');

        res.render('criancas/formulario', {
            crianca: criancaResultado.rows[0],
            responsaveis: responsaveisResultado.rows,
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).send('Erro ao buscar criança.');
    }
});

// Atualizar criança
router.post('/criancas/editar/:id', verificarLogin, async (req, res) => {
    try {
        const { nome, data_nascimento, responsavel_id } = req.body;

        await pool.query(
            `UPDATE criancas
             SET nome = $1, data_nascimento = $2, responsavel_id = $3
             WHERE id = $4`,
            [nome, data_nascimento, responsavel_id, req.params.id],
        );

        res.redirect('/criancas');
    } catch (erro) {
        console.error(erro);
        res.status(400).send('Erro ao atualizar criança.');
    }
});

// Excluir criança
router.post('/criancas/excluir/:id', verificarLogin, async (req, res) => {
    try {
        await pool.query('DELETE FROM criancas WHERE id = $1', [req.params.id]);

        res.redirect('/criancas');
    } catch (erro) {
        console.error(erro);
        res.status(400).send(
            'Não foi possível excluir esta criança. Verifique se existem atendimentos vinculados.',
        );
    }
});

export default router;
