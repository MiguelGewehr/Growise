document.getElementById('cadastro-form').addEventListener('submit', async function (event) {
    event.preventDefault();

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
        //console.error('Erro:', error);
    }
});
