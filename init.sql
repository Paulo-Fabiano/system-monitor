CREATE TABLE resultados (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    status_teste BOOLEAN NOT NULL,
    duracao INTEGER NOT NULL,
    inicio_teste TIMESTAMP NOT NULL,
    erro TEXT
);