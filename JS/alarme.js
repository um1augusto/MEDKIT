let alarms = []; // Lista para armazenar os alarmes
const alarmSound = new Audio("../mp3/iphone_alarm.mp3"); // Caminho do som do alarme

/**
 * Atualiza o relógio digital na tela e verifica se há alarmes ativos.
 */
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0'); // Obtém as horas formatadas com dois dígitos
    const minutes = now.getMinutes().toString().padStart(2, '0'); // Obtém os minutos formatados com dois dígitos
    const seconds = now.getSeconds().toString().padStart(2, '0'); // Obtém os segundos formatados com dois dígitos

    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`; // Atualiza o relógio na interface

    // Verifica se algum alarme deve ser ativado no horário atual
    alarms.forEach(alarm => {
        if (alarm.time === `${hours}:${minutes}` && seconds === "00") {
            playAlarm(alarm);
        }
    });
}

/**
 * Reproduz o som do alarme e destaca o alarme ativo na tela.
 * @param {Object} alarm - Objeto contendo os dados do alarme.
 */
function playAlarm(alarm) {
    alarmSound.play().catch(error => {
        console.error("Erro ao reproduzir o áudio:", error);
        alert("⚠️ O navegador bloqueou o áudio. Clique na tela antes de definir o alarme.");
    });

    const alarmItem = document.getElementById(`alarm-${alarm.id}`);
    if (alarmItem) {
        alarmItem.classList.add("alarm-active"); // Adiciona uma classe para destacar o alarme ativo
    }
}

/**
 * Define um novo alarme com o horário e o nome do remédio informado pelo usuário.
 */
function setAlarm() {
    const alarmInput = document.getElementById('alarm').value; // Obtém o horário do alarme
    const inputRemedy = document.getElementById('remedy').value; // Obtém o nome do remédio
    const alarmList = document.getElementById('alarm-list'); // Obtém a lista de alarmes na interface

    if (alarmInput && inputRemedy) {
        const alarmId = Date.now(); // Gera um identificador único para o alarme
        const newAlarm = { id: alarmId, time: alarmInput.substring(0, 5), remedy: inputRemedy };
        alarms.push(newAlarm); // Adiciona o novo alarme à lista

        // Cria um elemento na interface para exibir o alarme
        const alarmItem = document.createElement("div");
        alarmItem.id = `alarm-${alarmId}`;
        alarmItem.classList.add("alarm-item");
        alarmItem.innerHTML = `
            <p><strong>Remédio:</strong> ${inputRemedy}</p>
            <p><strong>Horário:</strong> ${alarmInput.substring(0, 5)}</p>
            <button onclick="cancelAlarm(${alarmId})">Cancelar</button>
        `;
        alarmList.appendChild(alarmItem);
    }
}

/**
 * Cancela um alarme removendo-o da lista e parando o som caso esteja tocando.
 * @param {number} alarmId - Identificador único do alarme a ser removido.
 */
function cancelAlarm(alarmId) {
    alarms = alarms.filter(alarm => alarm.id !== alarmId); // Remove o alarme da lista
    const alarmItem = document.getElementById(`alarm-${alarmId}`);
    if (alarmItem) {
        alarmItem.remove(); // Remove o alarme da interface
    }
    alarmSound.pause(); // Para o som do alarme
    alarmSound.currentTime = 0; // Reinicia o áudio para o início
}

// Atualiza o relógio a cada segundo
setInterval(updateClock, 1000);
