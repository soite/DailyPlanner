const StartHour = 9;
const EndHour = 23;
const container = document.getElementById("time-blocks");

function getTimeStatus(hour) {
    const currenthour = new Date().getHours();
    if(hour < currenthour) return "past";
    if(hour  == currenthour) return "present";
    return "future";
}

function Loadall() {
    fetch('http://127.0.0.1:8000/api/tasks/')
    .then(res => res.json())
    .then(data => {
        if(Object.keys(data).length === 0) {
            tasks = {1 : "", 2 : "",3 : "",4: "",5 : "",6 : "",7 : "",8 : "",9 : "",10: "",11 : "",12 : "",13 : "",14 : "",15 : "",16 : "", 17 : "", 18 : "", 19 : "", 20 : "", 21 : "", 22 : "", 23 : ""};
        } 
        else {
            tasks = data;
        }
        loadPlanner();
    });
}

function loadPlanner() {
    for(let hour = StartHour; hour <= EndHour; hour++) {
        const savedTask = tasks[hour] || "";
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
            const val = input.value;
            fetch('http://127.0.0.1:8000/api/tasks/', {
                method : 'POST',
                headers : {'content-type' : 'application/json' },
                body : JSON.stringify({hour:hour, text:val})
            }).then(() => {input.disabled = true});
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("deleteBtn");
        deleteBtn.textContent = "X";
        deleteBtn.onclick = () => {
            fetch(`http://127.0.0.1:8000/api/tasks/${hour}`, {method : 'DELETE'}).then(() => {
                input.value = "";
                input.disabled = true;
            });
        };

        const editBtn = document.createElement("button");
        editBtn.classList.add("editBtn");
        editBtn.textContent = "✏️ Edit";
        editBtn.onclick = () => {
            const input = document.getElementById(`input-${hour}`);
            input.disabled = false;
            input.focus();
        };

        timeBlock.append(hourLabel, input, saveBtn,editBtn,deleteBtn);
        container.appendChild(timeBlock);
    }
}

function formatHour(hour) {
    const suffix = hour >= 12 ? "pm" : "am";
    const hour12 = hour > 12 ? hour - 12 : hour;
    return `${hour12}${suffix}`;
}

Loadall();