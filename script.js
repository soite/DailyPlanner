const StartHour = 9;
const EndHour = 23;
const container = document.getElementById("time-blocks");

function getTimeStatus(hour) {
    const currenthour = new Date().getHours();
    if(hour < currenthour) return "past";
    if(hour  == currenthour) return "present";
    return "future";
}

function loadPlanner() {
    for(let hour = StartHour; hour <= EndHour; hour++) {
        const savedTask = localStorage.getItem(`task-${hour}`) || "";
        const statusClass = getTimeStatus(hour);

        const timeBlock = document.createElement("div");
        timeBlock.classList.add("time-block", statusClass);

        const hourLabel = document.createElement("div");
        hourLabel.classList.add("hour");
        hourLabel.textContent = formatHour(hour);

        const input = document.createElement("input");
        input.classList.add("task");
        input.type = "text";
        input.value = savedTask;
        input.id = `input-${hour}`;

        const saveBtn = document.createElement("button");
        saveBtn.classList.add("saveBtn");
        saveBtn.textContent = "save";
        saveBtn.onclick = () => {
            const val = document.getElementById(`input-${hour}`).value;
            localStorage.setItem(`task-${hour}`, val);
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("deleteBtn");
        deleteBtn.textContent = "X";
        deleteBtn.onclick = () => {
            localStorage.removeItem(`task-${hour}`);
            document.getElementById(`input-${hour}`).value = "";
        };
        timeBlock.append(hourLabel, input, saveBtn, deleteBtn);
        container.appendChild(timeBlock);
    }
}

function formatHour(hour) {
    const suffix = hour >= 12 ? "pm" : "am";
    const hour12 = hour > 12 ? hour - 12 : hour;
    return `${hour12}${suffix}`;
}

loadPlanner();