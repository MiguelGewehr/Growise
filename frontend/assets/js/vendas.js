var valorTotalPedido = 0;

/**
 * Função para adicionar um produto ao pedido
 * @param {string} classeDadosProduto - classe do produto
 */
function adicionarProduto(classeDadosProduto) {    
    var produto = document.querySelector('.' + classeDadosProduto);
    var nome = produto.querySelector('h5').textContent;
    var dropdown = document.getElementById('dropdownMenuButton1');
    var quantidadeTexto = dropdown.textContent.trim();
    // Converte para número
    var quantidade = parseInt(quantidadeTexto);
    var preco = produto.querySelector('.preco').textContent;
    var valor = convertToFloat(preco) * quantidade;

    valorTotalPedido += valor;

    // Criando a estrutura HTML
    var novoProduto = `
        <div class="ms-4">
            <div class="produto-item">
                <p class="nome-produto">`+ nome +`</p>
                <p class="quantidade-produto">Quantidade: ` + quantidadeTexto + `</p>
                <p class="valor-total-produto">Valor: R$` + valor.toFixed(2).replace(".", ",") + `</p>
            </div>
        </div>
        <hr>
    `;
    
    // Inserindo a nova estrutura após o botão
    var container = document.querySelector('.container-pedidos');
    container.insertAdjacentHTML('beforeend', novoProduto);

    document.getElementById('valorTotal').textContent = `Valor total: R$ ${valorTotalPedido.toFixed(2).replace(".", ",")}`;
}

/**
 * Função para converter uma string de moeda para float
 * @param {string} currencyStr - string de moeda
 * @returns número convertido para float
 */
function convertToFloat(currencyStr) {
    // Remove o símbolo de moeda e espaços em branco
    let numberStr = currencyStr.replace('R$', '').trim();
    // Substitui a vírgula por um ponto
    numberStr = numberStr.replace(',', '.');
    // Converte a string para float
    let numberFloat = parseFloat(numberStr);

    return numberFloat;
}

/**
 * Função para exibir ou ocultar a seção de logout
 */
function toggleLogout() {
    var logoutSection = document.getElementById('logoutSection');

    // Toggle visibility of logout section
    if (logoutSection.style.display === 'none') {
        logoutSection.style.display = 'block';
    } else {
        logoutSection.style.display = 'none';
    }
}

/**
 * Função para realizar logout do sistema
 */
function logout() {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
}

// Add event listener to toggle logout section
document.getElementById('infoSection').addEventListener('click', function() {
    toggleLogout();
});
/**
     * Função para criar um card de produto
     * @param {Object} produto - dados do produto
     * @param {number} index - índice do produto
     * @returns card do produto
     */
    function criarCardProduto(produto, index) {
        const card = document.createElement('div');
        card.className = 'col-4';
        card.innerHTML = `
            <div class="card">
                <a data-bs-toggle="offcanvas" href="#offcanvas-produto-${index}" role="button" aria-controls="offcanvas-produto-${index}">
                    <img src="assets/img/foto_produto.png" alt="${produto.nome}" class="card-img-top">
                </a>
                <div class="card-body">
                    <h5 class="card-title">${produto.nome}</h5>
                    <p class="card-text">R$${produto.precoVenda.toFixed(2)}</p>
                    <p class="card-text">Quantidade em estoque: ${produto.quantidade}</p>
                </div>
                <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvas-produto-${index}" aria-labelledby="offcanvas-produto-${index}Label">
                    <div class="d-flex flex-column align-items-center dados_produtos">
                        <img class="img-fluid p-5" src="${produto.imagem}" alt="${produto.nome}">
                        <h5 class="text-center">${produto.nome}</h5>
                        <p class="text-center preco">R$${produto.precoVenda}</p>
                        <p class="text-center px-3">Descrição do produto: ${produto.descricao}</p>
                        <p class="text-center">Marca: ${produto.marca}</p>
                        <p class="text-center">Fornecedor: ${produto.fornecedor}</p>
                        <h6 class="mx-1">Quantidade:</h6>
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton${produto.quantidade}"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                Selecione um número
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton${produto.quantidade}" id="dropdownMenu${produto.quantidade}">
                                <!-- Opções serão adicionadas dinamicamente aqui -->
                            </ul>
                        </div>
                        <div class="d-flex flex-column align-items-center my-3">
                            <button type="button" class="btn btn-primary" onclick="adicionarProduto(${produto.quantidade})">Adicionar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        return card;
    }

    async function carregarProdutos() {
        const response = await fetch('http://localhost:8080/produto', {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }

        })
            .then(response => response.json())
            .then(data => {
                var container = document.querySelector('.products.row');
                data.forEach(produto => {
                    const card = criarCardProduto(produto, produto.id);
                    container.appendChild(card);
                });
            })
            .catch(error => console.error('Erro ao carregar produtos:', error));
    }

document.addEventListener("DOMContentLoaded", function() {
    //gera o card dos produtos
   

    

    /**
     * Função para carregar produtos e preencher a página
     */
    
    
    carregarProdutos();


    //gera a barra do pedido
    const maxNumber = 10; // Você pode mudar esse valor para quantos números quiser

    /**
     * Função que completa o dropdown menu com números
     * @param {Object} dropdownMenu - menu dropdown
     */
    function populateDropdownMenu(dropdownMenu) {
        // Limpa o conteúdo do menu antes de adicionar novos itens
        dropdownMenu.innerHTML = '';

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
    }

    // Adiciona event listeners para os botões que abrem os offcanvas
    const offcanvasButtons = document.querySelectorAll('[data-bs-toggle="offcanvas"]');

    offcanvasButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = button.getAttribute('href');
            const offcanvas = document.querySelector(targetId);
            const dropdownMenu = offcanvas.querySelector('#dropdownMenu');
            populateDropdownMenu(dropdownMenu);
        });
    });


    //cadastra venda
    document.getElementById('botaoVenda').addEventListener('click', function () {
        // Colete os dados dos produtos na aba do pedido
        let produtos = [];
        const pedidoLateral = document.getElementById('abaPedidoLateral');
        const produtosElementos = pedidoLateral.querySelectorAll('.produto-item');
        const valorTotalPedido = 0;

        produtosElementos.forEach(function (produtoElemento) {
            const nomeProduto = produtoElemento.querySelector('.nome-produto').innerText;
            const quantidadeProduto = produtoElemento.querySelector('.quantidade-produto').innerText;
            const valorTotalProduto = produtoElemento.querySelector('.valor-total-produto').innerText;
            valorTotalPedido += valorTotalProduto;

            produtos.push({
                nome: nomeProduto,
                quantidade: quantidadeProduto,
                valorTotalProduto: valorTotalProduto
            });
        });

        const pedido = {
            //numeroPedido: /*o numero do pedido não deveria vir do backend?*/,
            produtos: produtos,
            valorTotalPedido: valorTotalPedido
        };

        // Envie os dados ao backend
        fetch('URL_DO_SEU_BACKEND', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pedido)
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });

});

/*document.addEventListener("DOMContentLoaded", function() {
    const dropdownMenu = document.getElementsById('dropdownMenu');
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
});*/