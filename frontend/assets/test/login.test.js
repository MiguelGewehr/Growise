// login.test.js
if (typeof TextEncoder === 'undefined') {
    global.TextEncoder = require('util').TextEncoder;
    global.TextDecoder = require('util').TextDecoder;
}  

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

describe('Testes de Login', () => {
    let dom;
    let document;
    let botaoEntrar;

    beforeEach(() => {
        dom = new JSDOM(`
            <!DOCTYPE html>
            <html lang="en">
            <body>
                <input id="email" type="text">
                <input id="senha" type="password">
                <button id="botaoEntrar">Entrar</button>
            </body>
            </html>
        `, { url: "http://localhost:8080/auth/login" });

        document = dom.window.document;

        // Carregar o script de login
        require('../js/login');

        botaoEntrar = document.getElementById('botaoEntrar');
    });

    test('Login com sucesso', async () => {
        // Configuração do teste de sucesso
    });

    test('Login com falha (usuário ou senha inválidos)', async () => {
        // Configuração do teste de falha
    });
});