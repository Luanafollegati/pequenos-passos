import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import responsaveisRoutes from './routes/responsaveis.js';
import criancasRoutes from './routes/criancas.js';
import atendimentosRoutes from './routes/atendimentos.js';

dotenv.config();

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configuração da sessão
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 30 * 60 * 1000,
        },
    }),
);

// Rotas
app.use('/', authRoutes);
app.use('/', responsaveisRoutes);
app.use('/', criancasRoutes);
app.use('/', atendimentosRoutes);

// Página inicial
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Sistema rodando em http://localhost:${PORT}`);
});
