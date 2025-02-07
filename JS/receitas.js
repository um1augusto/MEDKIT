// Adiciona um ouvinte de evento que é disparado quando o conteúdo da página é carregado
document.addEventListener('DOMContentLoaded', () => {
    carregarReceitas();  // Carrega as receitas quando a página for carregada
});

// Envio do formulário de receita
document.getElementById('receita-form').addEventListener('submit', function (event) {
    event.preventDefault();  // Previne o envio padrão do formulário, evitando o recarregamento da página

    // Coleta os valores dos campos do formulário
    const nomeMedicamento = document.getElementById('nome_medicamento').value.trim();  // Remove espaços em branco extras
    const dataValidade = document.getElementById('validade').value;
    const anexo = document.getElementById('anexo-receita').files[0];  // Obtém o arquivo enviado pelo usuário

    // Verifica se todos os campos foram preenchidos antes de enviar
    if (nomeMedicamento && dataValidade && anexo) {
        // Cria um objeto FormData para enviar os dados do formulário (incluindo o arquivo)
        const formData = new FormData();
        formData.append('nome_medicamento', nomeMedicamento);
        formData.append('validade', dataValidade);
        formData.append('anexo_receita', anexo);

        // Realiza uma requisição POST para salvar a receita no servidor
        fetch('http://localhost:3000/receitas', {
            method: 'POST', // Método da requisição
            body: formData // Corpo da requisição contendo os dados do formulário
        })
        .then(response => response.json())  // Converte a resposta para JSON
        .then(() => {
            carregarReceitas();  // Atualiza a lista de receitas após o envio
            this.reset();  // Reseta o formulário, limpando os campos
        })
        .catch(error => console.error('Erro ao salvar receita:', error));  // Exibe erro caso falhe
    }
});

// Função para carregar e exibir as receitas na lista
function carregarReceitas() {
    // Realiza uma requisição GET para buscar as receitas salvas
    fetch('http://localhost:3000/receitas')
        .then(response => response.json())  // Converte a resposta para JSON
        .then(data => {
            const listaExames = document.getElementById('lista-exames');  // Obtém o elemento da lista de receitas
            listaExames.innerHTML = '';  // Limpa a lista antes de adicionar novos itens

            // Itera sobre os dados das receitas e adiciona cada uma na lista
            data.forEach(item => {
                const li = document.createElement('li');  // Cria um novo item de lista
                const anexoUrl = `http://localhost:3000/uploads/${item.anexo_receita}`;  // URL do arquivo anexo

                // Adiciona as informações da receita no item de lista, incluindo um link para o arquivo
                li.innerHTML = `
                    Medicamento: ${item.nome_medicamento} <br>
                    Validade: ${item.validade} <br>
                    <a href="${anexoUrl}" target="_blank">Ver Receita</a>  <!-- Link para visualizar o arquivo -->
                `;
                listaExames.appendChild(li);  // Adiciona o item na lista
            });
        })
        .catch(error => console.error('Erro ao carregar receitas:', error));  // Exibe erro caso falhe
}