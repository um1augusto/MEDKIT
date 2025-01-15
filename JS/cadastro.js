document.getElementById('form').addEventListener('submit', async (e) =>{
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const dataNascimento = document.getElementById('dataNascimento');
    const genero = document.getElementById('genero');
    const email = document.getElementById('email');
    const telefone = document.getElementById('telefone');
    const endereco = document.getElementById('endereco');
    const message = document.getElementById('message');

    message.textContent = 'Cadastro efetuado...';

    try{
        const response = await fetch ('http://localhost:3000/cadastro', {

            method: 'POST',
            headers:{'Content-Type': 'aplication/json' },
            body: JSON.stringify({nome, cpf, dataNascimento, genero, email, telefone, endereco})
        })

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token); // Armazena o token no localStorage
            window.location.href = 'login.html'; // Redireciona para a página do usuário
        } else {
            const errorMessage = await response.text();
            message.textContent = errorMessage; // Exibe a mensagem de erro
        }
    } catch (error) {
        message.textContent = 'Erro ao fazer o cadastro. Tente novamente.'; // Mensagem de erro em caso de falha na requisição
    }
});