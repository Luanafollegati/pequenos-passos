-- ============================================
-- CLÍNICA PEDIÁTRICA PEQUENOS PASSOS
-- Criação das tabelas e registros de teste
-- ============================================


-- TABELA DE USUÁRIOS
CREATE TABLE usuarios (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL
);


-- TABELA DE RESPONSÁVEIS
CREATE TABLE responsaveis (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL,
    telefone VARCHAR(20) NOT NULL
);


-- TABELA DE CRIANÇAS
CREATE TABLE criancas (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    data_nascimento DATE NOT NULL,
    responsavel_id INTEGER NOT NULL,
    CONSTRAINT fk_crianca_responsavel
        FOREIGN KEY (responsavel_id)
        REFERENCES responsaveis(id)
        ON DELETE RESTRICT
);


-- TABELA DE ATENDIMENTOS
CREATE TABLE atendimentos (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    crianca_id INTEGER NOT NULL,
    data_atendimento DATE NOT NULL,
    horario TIME NOT NULL,
    motivo VARCHAR(200) NOT NULL,
    situacao VARCHAR(50) NOT NULL,
    CONSTRAINT fk_atendimento_crianca
        FOREIGN KEY (crianca_id)
        REFERENCES criancas(id)
        ON DELETE RESTRICT
);


-- ============================================
-- INSERÇÃO DE USUÁRIOS
-- Senha de teste: Teste@123
-- Hash bcrypt gerado anteriormente
-- ============================================


INSERT INTO usuarios (nome, cpf, senha_hash) VALUES
('Operador Teste 1', '11111111111', '$2b$10$KhUqEcSTwBu8sDDb85RLkeyYAx6T8C8imd.eHXIlbnHNlO9VtPSp.'),
('Operador Teste 2', '22222222222', '$2b$10$KhUqEcSTwBu8sDDb85RLkeyYAx6T8C8imd.eHXIlbnHNlO9VtPSp.'),
('Operador Teste 3', '33333333333', '$2b$10$KhUqEcSTwBu8sDDb85RLkeyYAx6T8C8imd.eHXIlbnHNlO9VtPSp.');


-- ============================================
-- INSERÇÃO DE RESPONSÁVEIS
-- ============================================


INSERT INTO responsaveis (nome, cpf, email, telefone) VALUES
('Ana Souza', '44444444444', 'ana.souza@example.test', '11999990001'),
('Bruno Lima', '55555555555', 'bruno.lima@example.test', '11999990002'),
('Carla Mendes', '66666666666', 'carla.mendes@example.test', '11999990003');


-- ============================================
-- INSERÇÃO DE CRIANÇAS
-- ============================================


INSERT INTO criancas (nome, data_nascimento, responsavel_id) VALUES
('Lara Souza', '2018-04-12', 1),
('Pedro Lima', '2020-09-23', 2),
('Sofia Mendes', '2019-01-30', 3);


-- ============================================
-- INSERÇÃO DE ATENDIMENTOS
-- ============================================


INSERT INTO atendimentos
(crianca_id, data_atendimento, horario, motivo, situacao)
VALUES
(1, '2026-11-18', '09:00', 'Consulta de rotina', 'Agendado'),
(2, '2026-11-19', '10:30', 'Avaliação pediátrica', 'Confirmado'),
(3, '2026-11-20', '14:00', 'Consulta de retorno', 'Agendado');


-- ============================================
-- CONSULTAS PARA CONFERÊNCIA
-- ============================================


SELECT * FROM usuarios;
SELECT * FROM responsaveis;
SELECT * FROM criancas;


SELECT
    atendimentos.id,
    criancas.nome AS crianca,
    responsaveis.nome AS responsavel,
    atendimentos.data_atendimento,
    atendimentos.horario,
    atendimentos.motivo,
    atendimentos.situacao
FROM atendimentos
INNER JOIN criancas
    ON atendimentos.crianca_id = criancas.id
INNER JOIN responsaveis
    ON criancas.responsavel_id = responsaveis.id
ORDER BY atendimentos.data_atendimento, atendimentos.horario;
