let alarms = [];
const alarmSound = new Audio("../mp3/iphone_alarm.mp3"); // Caminho do som do alarme

function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;

    // Verifica se algum alarme está ativo
    alarms.forEach(alarm => {
        if (alarm.time === `${hours}:${minutes}` && seconds === "00") {
            playAlarm(alarm);
        }
    });
}

function playAlarm(alarm) {
    alarmSound.play().catch(error => {
        console.error("Erro ao reproduzir o áudio:", error);
        alert("⚠️ O navegador bloqueou o áudio. Clique na tela antes de definir o alarme.");
    });

    const alarmItem = document.getElementById(`alarm-${alarm.id}`);
    if (alarmItem) {
        alarmItem.classList.add("alarm-active");
    }
}

function setAlarm() {
    const alarmInput = document.getElementById('alarm').value;
    const inputRemedy = document.getElementById('remedy').value;
    const alarmList = document.getElementById('alarm-list');

    if (alarmInput && inputRemedy) {
        const alarmId = Date.now();
        const newAlarm = { id: alarmId, time: alarmInput.substring(0, 5), remedy: inputRemedy };
        alarms.push(newAlarm);

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

function cancelAlarm(alarmId) {
    alarms = alarms.filter(alarm => alarm.id !== alarmId);
    const alarmItem = document.getElementById(`alarm-${alarmId}`);
    if (alarmItem) {
        alarmItem.remove();
    }
    alarmSound.pause();
    alarmSound.currentTime = 0;
}

setInterval(updateClock, 1000);
