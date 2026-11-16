# Clínica Pediátrica Pequenos Passos


Sistema web desenvolvido para auxiliar no gerenciamento de uma clínica pediátrica, permitindo organizar responsáveis, crianças e atendimentos.


## 1. Tecnologias utilizadas


Node.js
Express
EJS
PostgreSQL
JavaScript
HTML e CSS
bcrypt
express-session
dotenv
## 2. Funcionalidades


Login de usuários com CPF e senha.
Proteção das páginas internas por sessão.
Cadastro, consulta, edição e exclusão de responsáveis.
Pesquisa de responsáveis pelo nome.
Cadastro, consulta, edição e exclusão de crianças.
Associação de crianças aos seus responsáveis.
Cadastro, consulta, edição e exclusão de atendimentos.
Associação de atendimentos às crianças.
Exibição dos nomes das crianças e responsáveis nos atendimentos.
Organização dos atendimentos por data e horário.
## 3. Estrutura do projeto
text
sistema/
├── app.js
├── package.json
├── package-lock.json
├── .env
├── README.md
├── config/
│   └── database.js
├── middleware/
│   └── auth.js
├── routes/
│   ├── auth.js
│   ├── responsaveis.js
│   ├── criancas.js
│   └── atendimentos.js
├── views/
│   ├── login.ejs
│   ├── home.ejs
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── responsaveis/
│   ├── criancas/
│   └── atendimentos/
└── public/
    ├── css/
    │   └── style.css
    └── js/
        └── script.js


## 4. Configuração do banco de dados


O projeto utiliza PostgreSQL.


Crie um banco de dados chamado:


clinica_pediatrica


Configure o arquivo .env com os dados da sua instalação:
env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=clinica_pediatrica
DB_PASSWORD=sua_senha_do_postgresql
DB_PORT=7777
SESSION_SECRET=coloque_uma_chave_secreta


A porta utilizada neste projeto é 7777, conforme a configuração local do PostgreSQL.


## 5. Instalação


Abra o terminal dentro da pasta sistema e execute:
bash
npm install


## 6. Execução


Para iniciar o sistema, execute:
bash
node app.js


Depois, abra o navegador no endereço:


http://localhost:3000


## 7. Banco de dados


O arquivo clinica_pediatrica.sql, entregue na pasta principal do projeto, contém a estrutura das tabelas e os registros de teste utilizados no sistema.


## 8. Observações


O sistema foi desenvolvido para execução local, utilizando formulários HTML, rotas Express, páginas EJS e banco de dados PostgreSQL.


Os dados utilizados para testes são fictícios.
