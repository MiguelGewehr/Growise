// vendas.test.js
if (typeof TextEncoder === 'undefined') {
    global.TextEncoder = require('util').TextEncoder;
    global.TextDecoder = require('util').TextDecoder;
}
  
describe('Testes de Vendas', () => {
    test('Exemplo de teste', () => {
        expect(true).toBe(true);
    });
});
