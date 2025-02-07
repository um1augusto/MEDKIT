// Adiciona um ouvinte de evento para o envio do formulário
document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Previne o envio padrão do formulário

    // Exibe no console que o formulário foi enviado
    console.log('Formulário enviado!'); // DEBUG

    // Coleta os valores dos campos CPF e Senha
    const cpf = document.getElementById('cpf').value;
    const senha = document.getElementById('senha').value;
    const message = document.getElementById('message');

    // Exibe os valores coletados no console para depuração
    console.log('CPF:', cpf); // DEBUG
    console.log('Senha:', senha); // DEBUG

    // Valida se os campos CPF e Senha foram preenchidos
    if (!cpf || !senha) {
        message.textContent = 'Preencha todos os campos!'; // Exibe mensagem de erro caso algum campo esteja vazio
        return; // Interrompe a execução da função
    }

    // Exibe mensagem informando que o login está sendo processado
    message.textContent = 'Fazendo login...';

    try {
        // Realiza a requisição POST ao servidor com os dados de CPF e Senha
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST', // Método da requisição
            headers: { 'Content-Type': 'application/json' }, // Define o tipo de conteúdo da requisição como JSON
            body: JSON.stringify({ cpf, senha }) // Envia os dados de CPF e Senha no corpo da requisição em formato JSON
        });

        // Processa a resposta do servidor
        const data = await response.json();
        console.log('Resposta do servidor:', data); // Exibe a resposta do servidor no console

        // Verifica se o login foi bem-sucedido
        if (response.ok && data.success) {
            // Armazena o token de autenticação no localStorage
            localStorage.setItem('token', data.token);
            // Redireciona o usuário para a página do menu
            window.location.href = 'menu.html'; 
        } else {
            // Exibe mensagem de erro caso o login não seja bem-sucedido
            message.textContent = data.message || 'Erro ao fazer login';
        }
    } catch (error) {
        // Captura e trata erros na requisição
        console.error('Erro na requisição:', error); // Exibe o erro no console
        message.textContent = 'Erro ao fazer login. Tente novamente.'; // Exibe mensagem genérica de erro
    }
});
