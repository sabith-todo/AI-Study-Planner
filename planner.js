document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
    updateSummary();
});

function addTask() {
    const subject = document.getElementById("subject").value.trim();
    const task = document.getElementById("task").value.trim();
    const date = document.getElementById("date").value;
    const priority = document.getElementById("priority").value;

    if (subject === "" || task === "" || date === "" || priority === "") {
        alert("Please fill all fields.");
        return;
    }

    const taskData = {
        id: Date.now(),
        subject: subject,
        task: task,
        date: date,
        priority: priority,
        completed: false
    };

    let tasks = JSON.parse(localStorage.getItem("studixTasks")) || [];
    tasks.push(taskData);
    localStorage.setItem("studixTasks", JSON.stringify(tasks));

    document.getElementById("subject").value = "";
    document.getElementById("task").value = "";
    document.getElementById("date").value = "";
    document.getElementById("priority").value = "";

    loadTasks();
    updateSummary();
}

function loadTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let tasks = JSON.parse(localStorage.getItem("studixTasks")) || [];

    if (tasks.length === 0) {
        taskList.innerHTML = `<li class="empty-message">No tasks added yet.</li>`;
        return;
    }

    tasks.forEach(function (task) {
        const li = document.createElement("li");

        if (task.priority === "High") {
            li.classList.add("priority-high");
        } else if (task.priority === "Medium") {
            li.classList.add("priority-medium");
        } else if (task.priority === "Low") {
            li.classList.add("priority-low");
        }

        if (task.completed) {
            li.classList.add("completed-task");
        }

        li.innerHTML = `
            <div class="task-content">
                <strong>Subject:</strong> ${task.subject}<br>
                <strong>Task:</strong> ${task.task}<br>
                <strong>Date:</strong> ${task.date}<br>
                <strong>Priority:</strong> ${task.priority}<br>
                <strong>Status:</strong> ${task.completed ? "Completed" : "Pending"}
            </div>
            <div class="task-buttons">
                <button class="complete-btn" onclick="toggleTask(${task.id})">
                    ${task.completed ? "Undo" : "Complete"}
                </button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

function toggleTask(id) {
    let tasks = JSON.parse(localStorage.getItem("studixTasks")) || [];

    tasks = tasks.map(function (task) {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });

    localStorage.setItem("studixTasks", JSON.stringify(tasks));
    loadTasks();
    updateSummary();
}

function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem("studixTasks")) || [];

    tasks = tasks.filter(function (task) {
        return task.id !== id;
    });

    localStorage.setItem("studixTasks", JSON.stringify(tasks));
    loadTasks();
    updateSummary();
}

function updateSummary() {
    let tasks = JSON.parse(localStorage.getItem("studixTasks")) || [];

    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;

    document.getElementById("totalTasks").textContent = total;
    document.getElementById("completedTasks").textContent = completed;
    document.getElementById("pendingTasks").textContent = pending;
}