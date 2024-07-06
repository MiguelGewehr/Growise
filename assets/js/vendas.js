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
    const maxNumber = 10; // Você pode mudar esse valor para quantos números quiser

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
});

document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = /*'URL da API para buscar os produtos';*/

    function criarCardProduto(produto, index) {
        const card = document.createElement('div');
        card.className = 'col-4';
        card.innerHTML = `
            <div class="card">
                <a data-bs-toggle="offcanvas" href="#offcanvas-produto-${index}" role="button" aria-controls="offcanvas-produto-${index}">
                    <img src="${produto.imagem}" alt="${produto.nome}" class="card-img-top">
                </a>
                <div class="card-body">
                    <h5 class="card-title">${produto.nome}</h5>
                    <p class="card-text">R$${produto.preco_venda.toFixed(2)}</p>
                    <p class="card-text">Quantidade em estoque: ${produto.quantidade}</p>
                </div>
                <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvas-produto-${index}" aria-labelledby="offcanvas-produto-${index}Label">
                    <div class="d-flex flex-column align-items-center dados_produtos">
                        <img class="img-fluid p-5" src="${produto.imagem}" alt="${produto.nome}">
                        <h5 class="text-center">${produto.nome}</h5>
                        <p class="text-center preco">R$${produto.preco_venda.toFixed(2)}</p>
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

    function carregarProdutos() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const container = document.querySelector('.container-fluid .row');
                container.innerHTML = ''; // Limpa os produtos existentes
                data.forEach((produto) => {
                    const card = criarCardProduto(produto);
                    container.appendChild(card);
                });
            })
            .catch(error => console.error('Erro ao carregar produtos:', error));
    }
    

    // Carregar os produtos ao carregar a página
    carregarProdutos();
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