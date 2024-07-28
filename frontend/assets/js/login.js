/**
 * Função para fazer login
 */

const botao = document.getElementById('botaoEntrar');
if (botao) {
    botao.addEventListener('click', async function () {

        const login = document.getElementById('email').value;
        const password = document.getElementById('senha').value;

        const data = {
            email: login,
            password: password
        };

        try {
            let response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            if (response.ok) {
                const data = await response.json();
                console.log(response); // true
                const token = data.token;
                const name = data.nome;
                const role = data.role;


                acessToken = 'Bearer ' + token;
                localStorage.setItem('accessToken', token);
                localStorage.setItem('user', name);
                console.log('Usuário logado com sucesso!');
                console.log('NOME: ' + name);
                console.log('ROLE: ' + role);

                if (data.role === 'USER') {
                    localStorage.setItem('role', "Vendedor");
                    window.location.href = 'vendas.html';
                } else if (data.role === 'ADMIN') {
                    localStorage.setItem('role', "Gerente");

                    window.location.href = 'dashboard.html';
                }
            } else {
                console.log('Erro:', response.statusText);
                alert('Usuário ou senha inválidos.');
            }
        }
        catch (error) {
            console.error('Error:', error);
            alert('Erro ao fazer login. Tente novamente mais tarde.');
        };
    });
}