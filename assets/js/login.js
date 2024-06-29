document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
    })
    .then(response => response.json())
    .then(data => {
        if (data.role === 'vendedor') {
            window.location.href = 'vendas.html';
        } else if (data.role === 'gerente') {
            window.location.href = 'dashboard.html';
        } else {
            alert('Usuário ou senha inválidos.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Erro ao fazer login. Tente novamente mais tarde.');
    });
});
