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

document.addEventListener('DOMContentLoaded', function () {

    // Dados estáticos para teste
    const dados_usuario = {
        nome: localStorage.getItem("user"),
        funcao: localStorage.getItem("role")
    };

    atualizarDadosUsuario(dados_usuario);
});

/**
 * Função para atualizar dados do funcionário
 * @param {Object} dados - dados do funcionário
 */
function atualizarDadosUsuario(dados) {
    document.getElementById('nome-funcionario').innerText = localStorage.getItem("user");
    document.getElementById('funcao-funcionario').innerText = dados.funcao;
}


async function novoFuncionario() {
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;


    const funcao = document.getElementById('funcao').value;
    var role;

    if (funcao == 1) {
        role = "ADMIN"

    } else {
        role = "USER"
    }

    const data = {
        name: nome,
        cpf: cpf,
        email: email,
        password: senha,
        role: role
    };
    return data;
}
/**
 * Função para salvar o cadastro de um novo funcionário
 */
const form = document.getElementById('cadastroForm');

form.addEventListener('submit', async function (event) {

    event.preventDefault();

    const data = await novoFuncionario();

    try {
        
        const response = await fetch('http://localhost:8080/auth/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')

            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            
            alert('Cadastro realizado com sucesso!');
            window.location.reload();

        } else {
            alert('Erro ao cadastrar!');
            console.log('Erro response:' + response.statusText);
        }
    } catch (error) {
        alert('Erro ao cadastrar!');
        console.log('Erro fetch:' + error);
    }

});

/**
 * Função para voltar para a página anterior
 */

const botaoVoltar = document.getElementById('botaoVoltar');

botaoVoltar.addEventListener('click', function () {
    window.history.back();
});
