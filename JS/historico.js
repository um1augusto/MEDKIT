document.addEventListener('DOMContentLoaded', () => {
    carregarRegistros();
});

document.getElementById('historico-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const tipo = document.getElementById('tipo').value;
    const descricao = document.getElementById('descricao').value.trim();

    if (tipo && descricao) {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Você precisa estar logado.");
            return;
        }

        fetch('http://localhost:3000/alergias', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ tipo: tipo, descricao: descricao })
        })
        .then(response => response.text()) // Primeiro pegamos o texto da resposta
        .then(text => {
            try {
                return JSON.parse(text); // Tentamos converter para JSON
            } catch (error) {
                throw new Error(`Erro ao interpretar resposta do servidor: ${text}`);
            }
        })
        .then(data => {
            if (data.message) {
                alert(data.message);
            }
            carregarRegistros();
            document.getElementById('historico-form').reset();
        })
        .catch(error => {
            console.error('Erro ao salvar:', error);
            alert("Erro ao salvar o histórico.");
        });
    }
}); // <== Fechando a função submit corretamente

function carregarRegistros() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert("Você precisa estar logado.");
        return;
    }

    fetch('http://localhost:3000/alergias', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const listaAlergias = document.getElementById('lista-alergias');
        listaAlergias.innerHTML = '';

        data.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.tipo}: ${item.descricao}`;
            listaAlergias.appendChild(li);
        });
    })
    .catch(error => console.error('Erro ao carregar registros:', error));
}
