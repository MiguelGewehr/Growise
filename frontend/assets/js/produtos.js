document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('nome-funcionario').innerText = localStorage.getItem("user");
    document.getElementById('funcao-funcionario').innerText = "GERENTE";

    const apiUrl = 'http://localhost:8080/produto';

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
                <img src="assets/img/foto_produto.png" class="card-img-top" alt="${produto.nome}"> 
                <div class="card-body">
                    <h5 class="card-title">${produto.nome}</h5>
                    <p class="card-text">R$${produto.precoVenda},00</p>
                    <p class="card-text">Quantidade em estoque: ${produto.quantidade}</p>
                </div>
            </div>
        `;
        return card;
    }

    /**
     * Função para carregar produtos e preencher a página
     */
    async function carregarProdutos() {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }

        })
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

document.getElementById('infoSection').addEventListener('click', function () {
    toggleLogout();
});