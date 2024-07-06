document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = /*'URL da API para buscar os produtos';*/

    // Função para criar um card de produto
    function criarCardProduto(produto) {
        const card = document.createElement('div');
        card.className = 'col-3';
        card.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${produto.imagem}" class="card-img-top" alt="${produto.nome}"> //caso o produto tenha imagem enviada
                <div class="card-body">
                    <h5 class="card-title">${produto.nome}</h5>
                    <p class="card-text">R$${produto.preco_venda},00</p>
                    <p class="card-text">Quantidade em estoque: ${produto.quantidade}</p>
                </div>
            </div>
        `;
        return card;
    }

    // Função para buscar os produtos e preencher a página
    function carregarProdutos() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const container = document.querySelector('.container.row');
                data.forEach(produto => {
                    const card = criarCardProduto(produto);
                    container.appendChild(card);
                });
            })
            .catch(error => console.error('Erro ao carregar produtos:', error));
    }

    // Carregar os produtos ao carregar a página
    carregarProdutos();
});