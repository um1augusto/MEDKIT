// Variável que armazenará o horário do alarme
let alarmTime = null;
const alarmSound = new Audio("../mp3/iphone_alarm.mp3"); // Caminho do som do alarme

// Função que atualiza o relógio a cada segundo
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;

    // Verifica se o horário do alarme coincide com o relógio
    if (alarmTime && alarmTime === `${hours}:${minutes}` && seconds === "00") {
        playAlarm();
    }
}

// Função para tocar o alarme corretamente
function playAlarm() {
    alarmSound.play().catch(error => {
        console.error("Erro ao reproduzir o áudio:", error);
        alert("⚠️ O navegador bloqueou o áudio. Clique na tela antes de definir o alarme.");
    });

    // Exibe a notificação na tela dentro do container de alarme
    const alarmContainer = document.getElementById('alarm-container');
    alarmContainer.classList.add("show-alarm");
}

// Função para definir o alarme e exibir o container
function setAlarm() {
    const alarmInput = document.getElementById('alarm').value;
    const inputRemedy = document.getElementById('remedy').value;
    const alarmContainer = document.getElementById('alarm-container');
    const alarmInfo = document.getElementById('alarm-info');

    if (alarmInput && inputRemedy) {
        alarmTime = alarmInput.substring(0, 5);
        
        // Exibe os detalhes do alarme no container
        alarmInfo.innerHTML = `
            <p><strong>Remédio:</strong> ${inputRemedy}</p>
            <p><strong>Horário:</strong> ${alarmTime}</p>
        `;
        alarmContainer.classList.add("show-alarm");
    }
}

// Função para cancelar o alarme e esconder o container
function cancelAlarm() {
    alarmTime = null;
    const alarmContainer = document.getElementById('alarm-container');
    alarmContainer.classList.remove("show-alarm");
    alarmSound.pause();
    alarmSound.currentTime = 0;
}

// Atualiza o relógio a cada segundo
setInterval(updateClock, 1000);
