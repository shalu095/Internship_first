document.addEventListener("DOMContentLoaded", () => {
  const topNavButtons = document.querySelectorAll(".top-nav-btn");
  const sideNavLinks = document.querySelectorAll(".side-nav-link");
  const contentSections = document.querySelectorAll(".content-section");
  const body = document.body;

  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");
  const clearButton = document.getElementById("clear-todos");

  // --- Util Functions for Local Storage ---
  function getStoredTodos() {
    return JSON.parse(localStorage.getItem("todos")) || [];
  }
document.querySelectorAll('.side-nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    // Remove active class from all nav links
    document.querySelectorAll('.side-nav-link').forEach(nav => nav.classList.remove('active'));

    // Add active class to clicked link
    link.classList.add('active');

    // Get target section id
    const targetId = link.getAttribute('data-target');

    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));

    // Show target section
    document.getElementById(targetId).classList.add('active');
  });
});

  function saveTodos(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function renderTodos() {
    todoList.innerHTML = "";
    const todos = getStoredTodos();
    todos.forEach(task => {
      addTodoToDOM(task.text, task.completed);
    });
  }

  function addTodoToDOM(task, completed = false) {
    const li = document.createElement("li");
    li.textContent = task;
    if (completed) li.classList.add("completed");

    li.addEventListener("click", () => {
      li.classList.toggle("completed");
      updateLocalStorageFromDOM();
    });

    li.addEventListener("dblclick", () => {
      if (confirm("Delete this task?")) {
        li.remove();
        updateLocalStorageFromDOM();
      }
    });

    li.classList.add("fade-todo");
    todoList.appendChild(li);

    setTimeout(() => li.classList.remove("fade-todo"), 500);
  }

  function updateLocalStorageFromDOM() {
    const todos = Array.from(todoList.children).map(li => ({
      text: li.textContent,
      completed: li.classList.contains("completed"),
    }));
    saveTodos(todos);
  }

  // --- Navigation Logic ---
  function showSection(sectionId) {
    contentSections.forEach(section => {
      const isActive = section.id === sectionId;
      section.classList.toggle("active", isActive);

      // Add fade-in effect on visible section
      if (isActive) {
        section.classList.remove("fade-in");
        void section.offsetWidth; // force reflow
        section.classList.add("fade-in");
      }
    });
  }

  topNavButtons.forEach(button => {
    button.addEventListener("click", () => {
      topNavButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const target = button.dataset.target;

      if (target === "portfolio") {
        body.classList.remove("todo-active");
        showSection("about");
        sideNavLinks.forEach((link, index) =>
          link.classList.toggle("active", index === 0)
        );
      } else if (target === "todo") {
        body.classList.add("todo-active");
        showSection("todo");
        sideNavLinks.forEach(link => link.classList.remove("active"));
      }
    });
  });

  sideNavLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      sideNavLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
      showSection(link.dataset.target);
    });
  });

  // --- Todo Logic ---
  if (todoForm) {
    todoForm.addEventListener("submit", e => {
      e.preventDefault();
      const task = todoInput.value.trim();
      if (!task) return;

      addTodoToDOM(task);
      updateLocalStorageFromDOM();

      todoInput.value = "";
    });

    if (clearButton) {
      clearButton.addEventListener("click", () => {
        if (confirm("Are you sure you want to clear all tasks?")) {
          todoList.innerHTML = "";
          saveTodos([]);
        }
      });
    }

    // Load todos on page load
    renderTodos();
  }
});
