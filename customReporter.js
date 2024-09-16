// customReporter.js
import { fecharPool, inserirResultado } from './database.js';
/** @implements {import('@playwright/test/reporter').Reporter} */
import fs from 'fs';
import path from 'path';

class CustomReporter {

    constructor() { // Inicializando um array vazio para coletar os resultados de cada teste

        this.resultados = []; 

      }

    async onTestEnd(test, result) { // onTestEnd é um método que é chamado ao final de cada teste
        
        // A hora atual, ajustada para o fuso horário desejado
        const dataAjustada = new Date();
        dataAjustada.setHours(dataAjustada.getHours() - 3); // Ajusta a hora subtraindo 3 horas

        const testeResultados = {

            nome: test.title,
            status_teste: result.status === 'passed' ? true : false,
            duracao: result.duration,
            inicio_teste: dataAjustada, 
            erro: result.errors
            
        };

        this.resultados.push(testeResultados)

    }

    async onEnd() { // onEnd é um método que chamamos após todos os testes terem sido executados

        const resultadoJson = JSON.stringify(this.resultados, null, 2);
        const nomeArquivo = 'resultadoTestes.json'

        const pastaArq = path.join(process.cwd(), 'Resultados-Testes', nomeArquivo)
        fs.mkdirSync(path.dirname(pastaArq), {recursive: true}) // Cria um diretório "Resultado-Testes" se ele não existir

        try {

            fs.writeFileSync(pastaArq, resultadoJson) // Escreve o JSON no arquivo;
            console.log(`Os resultados dos testes foram salvos com sucesso em: ${pastaArq}`);

        } catch (error) {

            console.error('Erro ao salvar os resultados no arquivo JSON: ', error)

        }

        try {

        // Chamando a função de inserir resultado
        await inserirResultado(this.resultados)

        // Fechando a conexão com o banco
        await fecharPool(); 
        console.log('Fechando o pool de conexão com sucesso.');

        } catch (error) {

            console.error('Erro ao fechar pool de conexão: ', error);

        }

    }

}



export default CustomReporter;