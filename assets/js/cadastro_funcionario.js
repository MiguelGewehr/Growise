function toggleLogout() {
    var logoutSection = document.getElementById('logoutSection');

    // Toggle visibility of logout section
    if (logoutSection.style.display === 'none') {
        logoutSection.style.display = 'block';
    } else {
        logoutSection.style.display = 'none';
    }
}

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
        nome : "Ana Paula",
        funcao : "Gerente"
    };

    atualizarDadosUsuario(dados_usuario);
});

function atualizarDadosUsuario(dados) {
    document.getElementById('nome-funcionario').innerText = dados.nome;
    document.getElementById('funcao-funcionario').innerText = dados.funcao;
}

let botaoCadastrar = document.getElementById('botaoCadastrar');

if(botaoCadastrar){
    addEventListener('click', async function (event) {
    
        const nome = document.getElementById('nome').value;
        const cpf = document.getElementById('cpf').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        const funcao = document.getElementById('funcao').value;
    
        const data = {
            nome: nome,
            cpf: cpf,
            email: email,
            senha: senha,
            funcao: funcao
        };
    
        try {
            const response = await fetch('http://localhost:8080/auth/cadastro_funcionario', {
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
                //console.log(result);
            } else {
                alert('Erro ao cadastrar!');
                //console.error('Erro:', response.statusText);
            }
        } catch (error) {
            alert('Erro ao cadastrar!');
            //console.error('Erro:', error);
        }
    });
}

const botaoVoltar = document.getElementById('botaoVoltar');

botaoVoltar.addEventListener('click', function() {
    window.history.back();
});

