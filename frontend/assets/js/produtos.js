document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = /*'URL da API para buscar os produtos';*/

    /**
     * Função para criar novo card de produto
     * @param {Object} produto - dados do produto
     * @returns card de produto
     */
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

    /**
     * Função para carregar produtos e preencher a página
     */
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

document.getElementById('infoSection').addEventListener('click', function() {
    toggleLogout();
});