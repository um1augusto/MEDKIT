// Referências dos elementos
const formulario = document.getElementById('historico-form'); // Obtém o formulário de histórico
const listaAlergias = document.getElementById('lista-alergias'); // Obtém a lista de alergias

// Array para armazenar as alergias
let alergias = [];

/**
 * Função para salvar uma nova alergia no array e exibi-la na página.
 * @param {Event} event - Evento de submissão do formulário.
 */
function salvarAlergia(event) {
    event.preventDefault(); // Previne o recarregamento da página ao enviar o formulário

    // Obtendo os valores dos campos de entrada
    const tipoAlergia = document.getElementById('tipo').value;
    const descricaoAlergia = document.getElementById('descricao').value;

    // Criar um novo objeto representando a alergia
    const novaAlergia = {
        tipo: tipoAlergia,
        descricao: descricaoAlergia
    };

    // Adicionando a alergia ao array
    alergias.push(novaAlergia);

    // Atualiza a exibição da lista de alergias na interface
    exibirAlergias();

    // Limpa os campos do formulário
    formulario.reset();
}

/**
 * Função para exibir as alergias na tela, criando elementos dinamicamente.
 */
function exibirAlergias() {
    // Limpar a lista atual antes de recriar os itens
    listaAlergias.innerHTML = '';

    // Criar e adicionar os itens da lista com as alergias armazenadas
    alergias.forEach((alergia, index) => {
        const item = document.createElement('li'); // Cria um elemento de lista
        item.classList.add('alergia-item'); // Adiciona uma classe CSS para estilização
        item.innerHTML = `
            <p><strong>Tipo:</strong> ${alergia.tipo}</p>
            <p><strong>Descrição:</strong> ${alergia.descricao}</p>
            <button onclick="removerAlergia(${index})">Remover</button>
        `;
        listaAlergias.appendChild(item); // Adiciona o item à lista na interface
    });
}

/**
 * Função para remover uma alergia da lista com base no índice.
 * @param {number} index - Índice do item no array a ser removido.
 */
function removerAlergia(index) {
    alergias.splice(index, 1); // Remove a alergia do array
    exibirAlergias(); // Atualiza a exibição após a remoção
}

// Evento para capturar a submissão do formulário e acionar a função de salvar alergia
formulario.addEventListener('submit', salvarAlergia);

// Exibe a lista de alergias ao carregar a página
window.onload = exibirAlergias;
