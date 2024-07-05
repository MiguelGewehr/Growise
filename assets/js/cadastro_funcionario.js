let botao = document.getElementById('botaoCadastrar');

if(botao){
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