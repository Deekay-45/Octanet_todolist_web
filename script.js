document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const toggleThemeBtn = document.getElementById('toggle-theme');
    
    // Load saved tasks from local storage
    loadTasks();

    // Add task
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (taskInput.value.trim() !== '') {
            addTask(taskInput.value.trim());
            taskInput.value = '';  // Clear the input field after adding
        } else {
            console.error('Task input is empty.');
        }
    });

    // Toggle task completion and delete task
    taskList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            removeTask(e.target.parentElement);
        } else if (e.target.tagName === 'LI') {
            toggleComplete(e.target);
        }
    });

    // Toggle dark mode
    toggleThemeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark');
    });

    function addTask(task) {
        const li = document.createElement('li');
        li.textContent = task;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '✖';
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
        saveTasks();
    }

    function toggleComplete(task) {
        task.classList.toggle('completed');
        saveTasks();
    }

    function removeTask(task) {
        task.remove();
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(task => {
            tasks.push({
                text: task.firstChild.textContent,
                completed: task.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.text;
            if (task.completed) {
                li.classList.add('completed');
            }
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '✖';
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    }
});
