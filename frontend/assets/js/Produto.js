class Produto{
    
    produtos = [];

    constructor(id, nome, fornecedor, precoVenda, precoCompra, quantidade, descricao, marca, imagem) {
        this.id = id;
        this.nome = nome;
        this.fornecedor = fornecedor;
        this.precoVenda = precoVenda;
        this.precoCompra = precoCompra;
        this.quantidade = quantidade;
        this.descricao = descricao;
        this.marca = marca;
        this.imagem = imagem;
        this.valor = valor;
    }

    static async carregarProdutos() {
        try {
            const response = await fetch('http://localhost:8080/produto', {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                }
            });
            const data = await response.json();
            Produto.produtos = data.map(produto => new Produto(
                produto.id,
                produto.nome,
                produto.fornecedor,
                produto.precoVenda,
                produto.precoCompra,
                produto.quantidade,
                produto.descricao,
                produto.marca,
                produto.imagem
            ));
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
        }
    }
}

// Carregar os produtos do banco de dados ao inicializar o programa
(async () => {
    await Produto.carregarProdutos();
    console.log('Produtos carregados:', Produto.produtos);
})();

export default Produto;