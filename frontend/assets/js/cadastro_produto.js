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

document.addEventListener('DOMContentLoaded', function() {

    // Dados estáticos para teste
    const dados_usuario = {
        nome : "Miguel",
        funcao : "Gerente"
    };

    atualizarDadosUsuario(dados_usuario);
});

/**
 * Função para atualizar dados do funcionário
 * @param {Object} dados - dados do funcionários
 */
function atualizarDadosUsuario(dados) {
    document.getElementById('nome-funcionario').innerText = dados.nome;
    document.getElementById('funcao-funcionario').innerText = dados.funcao;
}

/**
 * Função para salvar o cadastro de um novo produtos
 */
document.getElementById('botaoCadastrar').addEventListener('click', async function (event) {

    const nome = document.getElementById('nome').value;
    const precoCompra = document.getElementById('preco_compra').value;
    const estoque = document.getElementById('estoque').value;
    const marca = document.getElementById('marca').value;
    const fornecedor = document.getElementById('fornecedor').value;
    const precoVenda = document.getElementById('preco_venda').value;
    const quantidade = document.getElementById('quantidade').value;
    const descricao = document.getElementById('descricao').value;


    const data = {
        nome: nome,
        precoCompra: precoCompra,
        estoque: estoque,
        marca: marca,
        fornecedor: fornecedor,
        precoVenda: precoVenda,
        quantidade: quantidade,
        descricao: descricao
    };

    try {
        const response = await fetch('http://localhost:8080/auth/cadastro_produto', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            alert('Cadastro realizado com sucesso!');
        } else {
            alert('Erro ao cadastrar!');
        }
    } catch (error) {
        alert('Erro ao cadastrar!');
    }
});

/**
 * Função para voltar a página anterior
 */
function voltarPagina(){
    const botaoVoltar = document.getElementById('botaoVoltar');

    botaoVoltar.addEventListener('click', function() {
        window.history.back();
    });
}