document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Previne o envio padrão do formulário

    const cpf = document.getElementById('cpf').value;
    const senha = document.getElementById('senha').value;
    const message = document.getElementById('message');

    message.textContent = 'Fazendo login...'; // Mensagem de carregamento

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cpf, senha }) // Envia CPF e senha para o servidor
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token); // Armazena o token no localStorage
            window.location.href = 'menu.html'; // Redireciona para a página do usuário
        } else {
            const errorMessage = await response.text();
            message.textContent = errorMessage; // Exibe a mensagem de erro
        }
    } catch (error) {
        message.textContent = 'Erro ao fazer login. Tente novamente.'; // Mensagem de erro em caso de falha na requisição
    }
});
