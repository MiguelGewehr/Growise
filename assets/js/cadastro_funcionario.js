document.getElementById('cadastro-form').addEventListener('submit', async function (event) {
    event.preventDefault();

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
        //verificar se esse tipo de envio de dados está bom
        const response = await fetch('URL_DO_SEU_BACKEND', {
            method: 'POST',
            headers: {
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