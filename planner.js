
        document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const subject = document.getElementById("subject").value.trim();
    const task = document.getElementById("task").value.trim();
    const date = document.getElementById("date").value;
    const priority = document.getElementById("priority").value;

    if (subject === "" || task === "" || date === "" || priority === "") {
        alert("Please fill all fields");
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
}

function loadTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let tasks = JSON.parse(localStorage.getItem("studixTasks")) || [];

    tasks.forEach(function(task) {
        const li = document.createElement("li");

        li.innerHTML = `
            <strong>Subject:</strong> ${task.subject}<br>
            <strong>Task:</strong> ${task.task}<br>
            <strong>Date:</strong> ${task.date}<br>
            <strong>Priority:</strong> ${task.priority}<br>
            <strong>Status:</strong> ${task.completed ? "Completed" : "Pending"}
            <div class="task-buttons">
                <button onclick="toggleTask(${task.id})">Complete</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

        if (task.completed) {
            li.style.textDecoration = "line-through";
            li.style.opacity = "0.7";
        }

        taskList.appendChild(li);
    });
}

function toggleTask(id) {
    let tasks = JSON.parse(localStorage.getItem("studixTasks")) || [];

    tasks = tasks.map(function(task) {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });

    localStorage.setItem("studixTasks", JSON.stringify(tasks));
    loadTasks();
}

function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem("studixTasks")) || [];
    tasks = tasks.filter(function(task) {
        return task.id !== id;
    });

    localStorage.setItem("studixTasks", JSON.stringify(tasks));
    loadTasks();
}