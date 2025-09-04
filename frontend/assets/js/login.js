/**
 * Função para fazer login
 */
const botao = document.getElementById('botaoEntrar');
if (botao) {
    botao.addEventListener('click', async function () {

        const login = document.getElementById('email').value;
        const password = document.getElementById('senha').value;

        console.log('=== DEBUG FRONTEND ===');
        console.log('Email digitado:', login);
        console.log('Senha digitada:', password);

        const data = {
            email: login,
            password: password
        };

        console.log('Dados que serão enviados:', data);

        try {
            let response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            console.log('Status da resposta:', response.status);
            console.log('Headers da resposta:', response.headers);

            if (response.ok) {
                const data = await response.json();
                console.log('Resposta completa:', data);
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
                console.log('Erro HTTP:', response.status);
                console.log('Status Text:', response.statusText);
                
                // Tentar ler a resposta de erro
                try {
                    const errorData = await response.text();
                    console.log('Corpo da resposta de erro:', errorData);
                } catch (e) {
                    console.log('Não foi possível ler o corpo da resposta de erro');
                }
                
                alert('Usuário ou senha inválidos.');
            }
        }
        catch (error) {
            console.error('Error:', error);
            alert('Erro ao fazer login. Tente novamente mais tarde.');
        };
    });
}