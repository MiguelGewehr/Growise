function adicionarProduto(classeDadosProduto) {
    
    var produto = document.querySelector('.' + classeDadosProduto);

    var nome = produto.querySelector('h5').textContent;

    var dropdown = document.getElementById('dropdownMenuButton1');

    var quantidadeTexto = dropdown.textContent.trim();
    
    // Converte para número
    var quantidade = parseInt(quantidadeTexto);

    var preco = produto.querySelector('.preco').textContent;

    var valor = convertToFloat(preco) * quantidade;


    // Criando a estrutura HTML
    var novoProduto = `
        <div class="ms-4">
            <p>`+ nome +`</p>
            <p>Quantidade: ` + quantidadeTexto + `</p>
            <p>Valor: R$` + valor + `</p>
        </div>
        <hr>
    `;
    

    // Inserindo a nova estrutura após o botão
    var container = document.querySelector('.container-pedidos');
    container.insertAdjacentHTML('beforeend', novoProduto);
}

function convertToFloat(currencyStr) {
    // Remove o símbolo de moeda e espaços em branco
    let numberStr = currencyStr.replace('R$', '').trim();
    // Substitui a vírgula por um ponto
    numberStr = numberStr.replace(',', '.');
    // Converte a string para float
    let numberFloat = parseFloat(numberStr);

    return numberFloat;
}


document.addEventListener("DOMContentLoaded", function() {
    const dropdownMenu = document.getElementById('dropdownMenu');
    const maxNumber = 10; // Você pode mudar esse valor para quantos números quiser

    for (let i = 1; i <= maxNumber; i++) {
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.className = 'dropdown-item';
        a.href = '#';
        a.textContent = i;
        a.addEventListener('click', function() {
            document.getElementById('dropdownMenuButton1').textContent = i;
        });
        li.appendChild(a);
        dropdownMenu.appendChild(li);
    }
});