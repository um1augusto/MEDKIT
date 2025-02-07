// Referências dos elementos
const formulario = document.getElementById('historico-form');
const listaAlergias = document.getElementById('lista-alergias');

// Array para armazenar as alergias
let alergias = [];

// Função para salvar a alergia
function salvarAlergia(event) {
    event.preventDefault();

    // Obtendo os valores dos campos
    const tipoAlergia = document.getElementById('tipo').value;
    const descricaoAlergia = document.getElementById('descricao').value;

    // Criar um novo objeto alergia
    const novaAlergia = {
        tipo: tipoAlergia,
        descricao: descricaoAlergia
    };

    // Adicionando a alergia no array
    alergias.push(novaAlergia);

    // Adicionar a alergia à lista na página
    exibirAlergias();

    // Limpar o formulário
    formulario.reset();
}

// Função para exibir as alergias na tela
function exibirAlergias() {
    // Limpar a lista atual
    listaAlergias.innerHTML = '';

    // Criar os itens da lista
    alergias.forEach((alergia, index) => {
        const item = document.createElement('li');
        item.classList.add('alergia-item');
        item.innerHTML = `
            <p><strong>Tipo:</strong> ${alergia.tipo}</p>
            <p><strong>Descrição:</strong> ${alergia.descricao}</p>
            <button onclick="removerAlergia(${index})">Remover</button>
        `;
        listaAlergias.appendChild(item);
    });
}

// Função para remover uma alergia da lista
function removerAlergia(index) {
    alergias.splice(index, 1);
    exibirAlergias();
}

// Evento de submissão do formulário
formulario.addEventListener('submit', salvarAlergia);

// Exibe as alergias ao carregar a página
window.onload = exibirAlergias;
