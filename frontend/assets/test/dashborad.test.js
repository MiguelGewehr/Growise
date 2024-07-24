// dashboard.test.js
if (typeof TextEncoder === 'undefined') {
    global.TextEncoder = require('util').TextEncoder;
    global.TextDecoder = require('util').TextDecoder;
}
  

describe('Testes de Dashboard', () => {
    test('Exemplo de teste', () => {
        expect(true).toBe(true);
    });
});
