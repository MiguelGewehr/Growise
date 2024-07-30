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

document.addEventListener('DOMContentLoaded', function () {

    // Dados estáticos para teste
    const dados_usuario = {
        nome: localStorage.getItem("user"),
        funcao: localStorage.getItem("role")
    };

    const dados_venda_dia = {
        totalVendas: '999',
        produtosVendidos: '15',
        produtosEmFalta: '5',
        lucro: 'R$6.500,00'
    }

    atualizarDadosUsuario(dados_usuario);

    updateDashboardMetrics(dados_venda_dia);
});

/**
 * Função para atualizar dados do funcionário
 * @param {Object} dados - dados do funcionário
 */
function atualizarDadosUsuario(dados) {
    document.getElementById('nome-funcionario').innerText = dados.nome;
    document.getElementById('funcao-funcionario').innerText = dados.funcao;
}

document.addEventListener('DOMContentLoaded', function () {
    fetchDashboardData();
});

/**
 * Função para buscar dados do dashboard
 */
function fetchDashboardData() {
    fetch(/*'URL da API para buscar os produtos';*/)
        .then(response => response.json())
        .then(data => {
            updateDashboardMetrics(data);
            updateCharts(data);
        })
        .catch(error => console.error('Erro ao buscar dados do dashboard:', error));
}

/**
 * Função para atualizar dados de vendas do dia
 * @param {Object} dados - dados de vendas do dia
 */
function updateDashboardMetrics(data) {
    document.querySelector('.total-vendas').innerText = data.totalVendas;
    document.querySelector('.produtos-vendidos').innerText = data.produtosVendidos;
    document.querySelector('.produtos-em-falta').innerText = data.produtosEmFalta;
    document.querySelector('.lucro').innerText = `R$ ${data.lucro.toFixed(2)}`;
}

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


/**
 * Gráfico de vendas por semana
 * @type {HTMLCanvasElement}
 */
var myChart = new Chart(document.getElementById('grafico-semana'), {
    type: 'bar',
    data: {
        labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
        datasets: [
            {
                label: 'Número de vendas',
                data: [12000, 15000, 5000, 15000, 10000, 12000, 20000],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 25000
            }
        }
    }
});

/**
 * Gráfico de metas
 * @type {HTMLCanvasElement}
 */
var myLineChart = new Chart(document.getElementById('grafico-metas'), {
    type: 'line',
    data: {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
        datasets: [
            {
                label: 'Mês passado',
                data: [3004, 3200, 3100, 3300, 3400, 3500],
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1,
                fill: true,
                tension: 0.4
            },
            {
                label: 'Mês atual',
                data: [4504, 4300, 4200, 4100, 4000, 3900],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                fill: true,
                tension: 0.4
            }
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

/**
 * Gráfico de produtos
 * @type {HTMLCanvasElement}
 */
const myHorizontalBarChart = new Chart(document.getElementById('grafico-produtos').getContext('2d'), {
    type: 'bar',
    data: {
        labels: ['Camiseta Lisa', 'Jaqueta Jeans', 'Calça Preta', 'Casaco Mooleton', 'Tênis', 'Bolsa Azul'],
        datasets: [{
            label: 'Popularidade',
            data: [45, 29, 18, 4, 23, 43],
            backgroundColor: [
                'rgba(0, 123, 255, 0.2)',  // Azul claro
                'rgba(255, 0, 85, 0.2)',   // Rosa
                'rgba(255, 111, 0, 0.2)',  // Laranja
                'rgba(75, 192, 192, 0.2)', // Verde claro
                'rgba(54, 162, 235, 0.2)', // Azul mais escuro
                'rgba(153, 102, 255, 0.2)' // Roxo claro
            ],
            borderColor: [
                'rgba(0, 123, 255, 1)',    // Azul claro
                'rgba(255, 0, 85, 1)',     // Rosa
                'rgba(255, 111, 0, 1)',    // Laranja
                'rgba(75, 192, 192, 1)',   // Verde claro
                'rgba(54, 162, 235, 1)',   // Azul mais escuro
                'rgba(153, 102, 255, 1)'   // Roxo claro
            ],
            borderWidth: 1
        }]
    },
    options: {
        indexAxis: 'y',
        scales: {
            x: {
                beginAtZero: true,
                max: 100
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return context.raw + '%';
                    }
                }
            }
        }
    }
});