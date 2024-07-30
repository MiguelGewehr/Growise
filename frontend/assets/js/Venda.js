class Venda{
    
    vendas = [];

    constructor(data, ordens, valorTotal) {
        this.data = data;
        this.ordens = ordens;
        this.valorTotal = valorTotal;
    }

    static async carregarVendas() {
        try {
            const response = await fetch('http://localhost:8080/venda', {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                }
            });
            const data = await response.json();
            Venda.vendas = data.map(venda => new Venda(
                venda.data,
                venda.ordens,
                venda.valorTotal,
            ));
        } catch (error) {
            console.error('Erro ao carregar Vendas:', error);
        }
    }
}

// Carregar os produtos do banco de dados ao inicializar o programa
(async () => {
    await Venda.carregarVenda();
    console.log('Vendas carregados:', Produto.produtos);
})();