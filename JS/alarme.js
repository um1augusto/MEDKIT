const token = localStorage.getItem("token"); // Pegando o token salvo após o login

// Função para definir o alarme e salvar no banco de dados
function setAlarm() {
    const alarmInput = document.getElementById("alarm").value;
    const inputRemedy = document.getElementById("remedy").value;
    const diasSemana = "1234567"; // Defina os dias selecionados
    const somAlarme = "default.mp3"; // Som do alarme padrão

    if (alarmInput && inputRemedy) {
        fetch("http://localhost:3000/salvar-alarme", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": Bearer ${token}
            },
            body: JSON.stringify({
                horario: alarmInput,
                dias_semana: diasSemana,
                nome_remedio: inputRemedy,
                som_alarme: somAlarme
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                exibirAlarmes(); // Atualiza a lista de alarmes
            } else {
                alert("Erro ao salvar: " + data.message);
            }
        });
    } else {
        alert("Preencha todos os campos!");
    }
}

// Função para listar os alarmes salvos
function exibirAlarmes() {
    fetch("http://localhost:3000/listar-alarmes", {
        method: "GET",
        headers: {
            "Authorization": Bearer ${token}
        }
    })
    .then(response => response.json())
    .then(alarmes => {
        const lista = document.getElementById("lista-alarmes");
        lista.innerHTML = ""; // Limpa a lista antes de atualizar

        alarmes.forEach(alarme => {
            const item = document.createElement("li");
            item.innerHTML = <strong>${alarme.nome_remedio}</strong> - ${alarme.horario} - Dias: ${alarme.dias_semana};
            lista.appendChild(item);
        });
    });
}

// Atualiza a lista de alarmes ao carregar a página
document.addEventListener("DOMContentLoaded", exibirAlarmes);