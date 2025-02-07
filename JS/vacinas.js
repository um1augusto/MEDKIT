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
    // Cria um identificador único para a vacina com base no timestamp atual
    const vacinaId = Date.now(); 
    // Cria um objeto com os dados da vacina
    const novaVacina = { id: vacinaId, nome: nomeVacina, data: dataVacina };
    // Adiciona o objeto vacina ao array de vacinas
    vacinas.push(novaVacina);

    // Cria o elemento para o item de vacina no HTML
    const vacinaItem = document.createElement("div");
    vacinaItem.classList.add("vacina-item");
    vacinaItem.id = `vacina-${vacinaId}`; // Define um ID único para o item baseado no id da vacina
    
    // Cria o conteúdo com os dados da vacina
    vacinaItem.innerHTML = `
      <p><strong>Vacina:</strong> ${nomeVacina}</p>
      <p><strong>Data:</strong> ${dataVacina}</p>
    `;

    // Cria o botão de lixeira para remoção
    const btnRemover = document.createElement("button");
    btnRemover.classList.add("remover-btn");
    // Utilizando emoji de lixeira como ícone. Você pode usar uma imagem, se preferir.
    btnRemover.innerHTML = "🗑️";
    // Associa o evento de clique para remover a vacina
    btnRemover.addEventListener("click", () => {
      // Remove o item de vacina do DOM
      containerVacinas.removeChild(vacinaItem);
      // Opcional: Remove a vacina do array de vacinas
      vacinas = vacinas.filter(vacina => vacina.id !== vacinaId);
    });

    // Adiciona o botão de remoção ao item de vacina e depois o item ao container
    vacinaItem.appendChild(btnRemover);
    containerVacinas.appendChild(vacinaItem);

    // Limpa os campos do formulário após adicionar a vacina
    document.getElementById("vacina").value = '';
    document.getElementById("vacinacao").value = '';
  } else {
    // Exibe um alerta caso algum campo não tenha sido preenchido
    alert("Por favor, preencha todos os campos.");
  }
}

// Associa a função 'adicionarVacina' ao clique do botão CONFIRMAR
document.getElementById("confirmar").addEventListener("click", adicionarVacina);
