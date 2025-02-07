// Array para armazenar os registros de vacinas (opcional, para manipulação futura)
let vacinas = [];

// Função para adicionar uma vacina ao containerVacina
function adicionarVacina() {
  // Captura os valores dos campos de entrada
  const nomeVacina = document.getElementById("vacina").value;
  const dataVacina = document.getElementById("vacinacao").value;
  
  // Seleciona o contêiner onde os dados serão exibidos
  const containerVacinas = document.querySelector('.containerVacina');

  // Verifica se os campos foram preenchidos
  if (nomeVacina && dataVacina) {
    const vacinaId = Date.now(); // Identificador único
    const novaVacina = { id: vacinaId, nome: nomeVacina, data: dataVacina };
    vacinas.push(novaVacina);

    // Cria o elemento para o item de vacina
    const vacinaItem = document.createElement("div");
    vacinaItem.classList.add("vacina-item");
    vacinaItem.id = `vacina-${vacinaId}`;
    
    // Cria o conteúdo com os dados da vacina
    vacinaItem.innerHTML = `
      <p><strong>Vacina:</strong> ${nomeVacina}</p>
      <p><strong>Data:</strong> ${dataVacina}</p>
    `;

    // Cria o botão de lixeira para remoção
    const btnRemover = document.createElement("button");
    btnRemover.classList.add("remover-btn");
    // Utilizando emoji de lixeira. Você também pode usar uma imagem, se preferir.
    btnRemover.innerHTML = "🗑️";
    btnRemover.addEventListener("click", () => {
      // Remove o item do DOM
      containerVacinas.removeChild(vacinaItem);
      // Opcional: remove do array de vacinas
      vacinas = vacinas.filter(vacina => vacina.id !== vacinaId);
    });

    // Adiciona o botão de remoção ao item e, em seguida, o item ao container
    vacinaItem.appendChild(btnRemover);
    containerVacinas.appendChild(vacinaItem);

    // Limpa os campos do formulário
    document.getElementById("vacina").value = '';
    document.getElementById("vacinacao").value = '';
  } else {
    alert("Por favor, preencha todos os campos.");
  }
}

// Associa a função ao clique do botão CONFIRMAR
document.getElementById("confirmar").addEventListener("click", adicionarVacina);
