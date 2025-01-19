document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const senha = document.getElementById('senha').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const genero = document.getElementById('genero').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const endereco = document.getElementById('endereco').value;
    const message = document.getElementById('message');

    if (!email || !senha) {
        message.textContent = 'Por favor, preencha todos os campos.';
        return;
    }

    message.textContent = 'Cadastro efetuado...';

    try {
        const response = await fetch('http://localhost:3000/cadastro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, cpf, senha, dataNascimento, genero, email, telefone, endereco })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            window.location.href = 'login.html';
        } else {
            const errorMessage = await response.text();
            message.textContent = errorMessage;
        }
    } catch (error) {
        message.textContent = 'Erro ao fazer o cadastro. Tente novamente.';
    }
});
