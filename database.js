import { Pool } from 'pg';

// Configuração da conexão com o banco de dados PostgreSQL usando Pool
const pool = new Pool({

  host: '172.17.0.2', // Host do servidor do banco de dados
  user: 'sistema', // Usuário do banco de dados
  password: 'sistema', // Senha do banco de dados
  database: 'monitoramento', // Nome do banco de dados
  port: '5432', // Porta do banco de dados

});

// Função assíncrona para inserir resultados de teste
export async function inserirResultado(testeResultados) {

  
  const cliente = await pool.connect(); // Aguardar a conexão com o banco de dados

  try {
    // Iterar sobre todos os resultados de teste
    for (const resultadoTeste of testeResultados) {
      const { nome, status_teste, duracao, inicio_teste, erro } = resultadoTeste;

      // Definir a query SQL
      const query = `
        INSERT INTO resultados (nome, status_teste, duracao, inicio_teste, erro) 
        VALUES ($1, $2, $3, $4, $5);
      `;

      
      await cliente.query(query, [nome, status_teste, duracao, inicio_teste, erro]);

    }

    console.log('Todos os resultados foram inseridos com sucesso no banco de dados.');

  } catch (err) {
    console.error('Erro ao inserir resultados dos testes no banco de dados:', err.message);

  } finally {
    // Garantir que o client seja liberado após a execução
    cliente.release();
  }

}

// Fechar o pool de conexões ao final do processo
export async function fecharPool() {

  await pool.end(); // Encerra todas as conexões no pool

}
