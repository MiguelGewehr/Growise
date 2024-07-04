function adicionarProduto(classeDadosProduto) {
    
    var produto = document.querySelector('.' + classeDadosProduto);

    var nome = produto.querySelector('h5').textContent;

    var dropdown = document.getElementById('dropdownMenuButton1');

    var quantidadeTexto = dropdown.textContent.trim();
    
    // Converte para número
    var quantidade = parseInt(quantidadeTexto);

    var preco = produto.querySelector('.preco').textContent;


    // Criando a estrutura HTML
    var novoProduto = `
        <div class="ms-4">
            <p>`+ nome +`</p>
            <p>Quantidade: ` + quantidadeTexto + `</p>
            <p>Valor: R$ ` + preco + `</p>
        </div>
        <hr>
    `;
    

    // Inserindo a nova estrutura após o botão
    var container = document.querySelector('.container-pedidos');
    container.insertAdjacentHTML('beforeend', novoProduto);
}