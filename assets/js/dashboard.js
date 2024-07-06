document.addEventListener('DOMContentLoaded', function() {
    fetchDashboardData();
});

function fetchDashboardData() {
    fetch(/*'URL da API para buscar os produtos';*/)
        .then(response => response.json())
        .then(data => {
            updateDashboardMetrics(data);
            updateCharts(data);
        })
        .catch(error => console.error('Erro ao buscar dados do dashboard:', error));
}

function updateDashboardMetrics(data) {
    document.querySelector('.total-vendas').innerText = data.totalVendas;
    document.querySelector('.produtos-vendidos').innerText = data.produtosVendidos;
    document.querySelector('.produtos-em-falta').innerText = data.produtosEmFalta;
    document.querySelector('.lucro').innerText = `R$ ${data.lucro.toFixed(2)}`;
}
/*
function updateCharts(data) {
    // Atualizar gráficos com Chart.js

    const ctxMetas = document.getElementById('grafico-metas').getContext('2d');
    new Chart(ctxMetas, {
        type: 'bar',
        data: {
            labels: data.metas.labels,
            datasets: [{
                label: 'Lucro',
                data: data.metas.data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const ctxSemana = document.getElementById('grafico-semana').getContext('2d');
    new Chart(ctxSemana, {
        type: 'line',
        data: {
            labels: data.semana.labels,
            datasets: [{
                label: 'Receita Total',
                data: data.semana.data,
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const ctxProdutos = document.getElementById('grafico-produtos').getContext('2d');
    new Chart(ctxProdutos, {
        type: 'pie',
        data: {
            labels: data.produtos.labels,
            datasets: [{
                label: 'Produtos Mais Vendidos',
                data: data.produtos.data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true
        }
    });
}*/

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


const ctxGraficoSemana = document.getElementById('grafico-semana');

var myChart = new Chart(ctxGraficoSemana, {
    type: 'bar',
    data: {
        labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
        datasets: [
            {
                label: 'Vendas Atual',
                data: [12000, 15000, 5000, 15000, 10000, 12000, 20000],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            },
            {
                label: 'Meta de Vendas',
                data: [15000, 12000, 22000, 10000, 12000, 15000, 18000],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
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

const ctxGraficoMetas = document.getElementById('grafico-metas');

var myLineChart = new Chart(ctxGraficoMetas, {
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


const ctxGraficoProdutos = document.getElementById('grafico-produtos').getContext('2d');
const myHorizontalBarChart = new Chart(ctxGraficoProdutos, {
    type: 'bar',
    data: {
        labels: ['Camiseta Lisa', 'Jaqueta Jeans', 'Calça Preta', 'Casaco Mooleton', 'Tênis', 'Bolsa Azul'],
        datasets: [{
            label: 'Popularidade',
            data: [45, 29, 18, 4, 23,  43],
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