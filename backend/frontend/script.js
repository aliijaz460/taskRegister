document.getElementById('login-btn').addEventListener('click', login);
document.getElementById('register-btn').addEventListener('click', register);
document.getElementById('add-task-btn').addEventListener('click', addTask);

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    if (res.ok) {
        const { token } = await res.json();
        localStorage.setItem('token', token);
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('task-section').style.display = 'block';
        loadTasks();
    }
}

async function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
}

async function loadTasks() {
    const token = localStorage.getItem('token');
    const res = await fetch('/api/tasks', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const tasks = await res.json();
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = `${task.title} - ${task.category}`;
        taskList.appendChild(li);
    });
}

async function addTask() {
    const token = localStorage.getItem('token');
    const title = document.getElementById('task-title').value;
    const category = document.getElementById('task-category').value;
    await fetch('/api/tasks', {
        method: 'POST',
        headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ title, category })
    });
    loadTasks();
}
