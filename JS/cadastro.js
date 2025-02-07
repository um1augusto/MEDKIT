// Adiciona um evento ao formulário para capturar a submissão
document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Impede o recarregamento da página

    // Captura os valores dos campos do formulário
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const senha = document.getElementById('senha').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const genero = document.getElementById('genero').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const endereco = document.getElementById('endereco').value;
    const message = document.getElementById('message'); // Elemento para exibir mensagens ao usuário

    // Exibe mensagem de processamento
    message.textContent = 'Processando cadastro...';
    message.style.color = 'blue';

    try {
        // Envia os dados para o servidor via requisição HTTP POST
        const response = await fetch('http://localhost:3000/cadastro', {
            method: 'POST', // Define o método HTTP
            headers: { 'Content-Type': 'application/json' }, // Define o cabeçalho da requisição
            body: JSON.stringify({ nome, cpf, senha, dataNascimento, genero, email, telefone, endereco }), // Converte os dados para JSON
        });

        // Verifica se a requisição foi bem-sucedida
        if (response.ok) {
            message.textContent = 'Cadastro efetuado com sucesso! Redirecionando...';
            message.style.color = 'green';

            // Limpa os campos do formulário
            document.getElementById('form').reset();

            // Aguarda 3 segundos antes de redirecionar o usuário para a página de login
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 3000);
        } else {
            // Caso ocorra um erro no servidor, exibe a mensagem de erro retornada
            const errorMessage = await response.text();
            message.textContent = `Erro: ${errorMessage}`;
            message.style.color = 'red';
        }
    } catch (error) {
        // Captura erros de conexão com o servidor
        message.textContent = 'Erro ao conectar com o servidor. Tente novamente.';
        message.style.color = 'red';
    }
});
