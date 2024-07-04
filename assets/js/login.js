let botao = document.getElementById('botaoEntrar');

if(botao){
    botao.addEventListener('click', async function() {

        const login = document.getElementById('email').value;
        const password = document.getElementById('senha').value;

        const data = {
            login: login,
            password: password
        };

        try{
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

                acessToken = 'Bearer ' + token;
                localStorage.setItem('accessToken', token);
                console.log('Usuário cadastrado com sucesso!');

                if (data.role === 'vendedor') {
                    window.location.href = 'vendas.html';
                } else if (data.role === 'gerente') {
                    window.location.href = 'dashboard.html';
                }
            } else {
                console.log('Erro:', response.statusText);
                alert('Usuário ou senha inválidos.');
            }
        }
        catch(error) {
            console.error('Error:', error);
            alert('Erro ao fazer login. Tente novamente mais tarde.');
        };
    });
}