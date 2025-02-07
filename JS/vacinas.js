// Array para armazenar os registros de vacinas (se necessário para outras operações)
let vacinas = [];

// Função para adicionar uma vacina no containerVacina
function adicionarVacina() {
  // Captura os valores dos campos de entrada
  const nomeVacina = document.getElementById("vacina").value;
  const dataVacina = document.getElementById("vacinacao").value;
  
  // Seleciona o contêiner onde os dados serão exibidos
  const containerVacinas = document.querySelector('.containerVacina');

  // Verifica se ambos os campos foram preenchidos
  if (nomeVacina && dataVacina) {
    // Cria um identificador único para o registro
    const vacinaId = Date.now();
    // Cria um objeto para armazenar os dados (opcional, para futuras manipulações)
    const novaVacina = { id: vacinaId, nome: nomeVacina, data: dataVacina };
    vacinas.push(novaVacina);

    // Cria um novo elemento para exibir os dados da vacina
    const vacinaItem = document.createElement("div");
    vacinaItem.classList.add("vacina-item");
    vacinaItem.innerHTML = `
      <p><strong>Vacina:</strong> ${nomeVacina}</p>
      <p><strong>Data:</strong> ${dataVacina}</p>
    `;

    // Adiciona o novo elemento ao contêiner de vacinas
    containerVacinas.appendChild(vacinaItem);

    // Limpa os campos do formulário após o cadastro
    document.getElementById("vacina").value = '';
    document.getElementById("vacinacao").value = '';
  } else {
    alert("Por favor, preencha todos os campos.");
  }
}

// Associa a função ao clique do botão CONFIRMAR
document.getElementById("confirmar").addEventListener("click", adicionarVacina);
