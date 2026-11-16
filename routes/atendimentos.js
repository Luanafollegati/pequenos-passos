import express from 'express';
import pool from '../config/database.js';
import { verificarLogin } from '../middleware/auth.js';

const router = express.Router();

// Listar atendimentos
router.get('/atendimentos', verificarLogin, async (req, res) => {
    try {
        const resultado = await pool.query(`
            SELECT
                a.*,
                c.nome AS nome_crianca,
                r.nome AS nome_responsavel
            FROM atendimentos a
            INNER JOIN criancas c ON a.crianca_id = c.id
            INNER JOIN responsaveis r ON c.responsavel_id = r.id
            ORDER BY a.data_atendimento ASC, a.horario ASC
        `);

        res.render('atendimentos/index', {
            atendimentos: resultado.rows,
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).send('Erro ao carregar atendimentos.');
    }
});

// Abrir formulário de cadastro
router.get('/atendimentos/novo', verificarLogin, async (req, res) => {
    try {
        const resultado = await pool.query(`
            SELECT
                criancas.id,
                criancas.nome,
                responsaveis.nome AS nome_responsavel
            FROM criancas
            INNER JOIN responsaveis
                ON criancas.responsavel_id = responsaveis.id
            ORDER BY criancas.nome
        `);

        res.render('atendimentos/formulario', {
            atendimento: null,
            criancas: resultado.rows,
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).send('Erro ao carregar crianças.');
    }
});

// Cadastrar atendimento
router.post('/atendimentos', verificarLogin, async (req, res) => {
    try {
        const { crianca_id, data_atendimento, horario, motivo, situacao } = req.body;

        if (!crianca_id || !data_atendimento || !horario || !motivo || !situacao) {
            return res.status(400).send('Preencha todos os campos.');
        }

        await pool.query(
            `INSERT INTO atendimentos
             (crianca_id, data_atendimento, horario, motivo, situacao)
             VALUES ($1, $2, $3, $4, $5)`,
            [crianca_id, data_atendimento, horario, motivo, situacao],
        );

        res.redirect('/atendimentos');
    } catch (erro) {
        console.error(erro);
        res.status(400).send('Erro ao cadastrar atendimento.');
    }
});

// Abrir formulário de edição
router.get('/atendimentos/editar/:id', verificarLogin, async (req, res) => {
    try {
        const atendimentoResultado = await pool.query('SELECT * FROM atendimentos WHERE id = $1', [
            req.params.id,
        ]);

        if (atendimentoResultado.rows.length === 0) {
            return res.status(404).send('Atendimento não encontrado.');
        }

        const criancasResultado = await pool.query(`
            SELECT
                criancas.id,
                criancas.nome,
                responsaveis.nome AS nome_responsavel
            FROM criancas
            INNER JOIN responsaveis
                ON criancas.responsavel_id = responsaveis.id
            ORDER BY criancas.nome
        `);

        res.render('atendimentos/formulario', {
            atendimento: atendimentoResultado.rows[0],
            criancas: criancasResultado.rows,
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).send('Erro ao buscar atendimento.');
    }
});

// Atualizar atendimento
router.post('/atendimentos/editar/:id', verificarLogin, async (req, res) => {
    try {
        const { crianca_id, data_atendimento, horario, motivo, situacao } = req.body;

        if (!crianca_id || !data_atendimento || !horario || !motivo || !situacao) {
            return res.status(400).send('Preencha todos os campos.');
        }

        await pool.query(
            `UPDATE atendimentos
             SET crianca_id = $1,
                 data_atendimento = $2,
                 horario = $3,
                 motivo = $4,
                 situacao = $5
             WHERE id = $6`,
            [crianca_id, data_atendimento, horario, motivo, situacao, req.params.id],
        );

        res.redirect('/atendimentos');
    } catch (erro) {
        console.error(erro);
        res.status(400).send('Erro ao atualizar atendimento.');
    }
});

// Excluir atendimento
router.post('/atendimentos/excluir/:id', verificarLogin, async (req, res) => {
    try {
        await pool.query('DELETE FROM atendimentos WHERE id = $1', [req.params.id]);

        res.redirect('/atendimentos');
    } catch (erro) {
        console.error(erro);
        res.status(400).send('Erro ao excluir atendimento.');
    }
});

export default router;
