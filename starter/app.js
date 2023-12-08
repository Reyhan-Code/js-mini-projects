///kumpulkan semua element ui

const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const filterInput = document.getElementById("filter-input");
const todoList = document.getElementById("todo-list");
const clearButton = document.getElementById("clear-todos");

//ini adalah  kumpulan eventlistener
immediateLoadEventListener();

function immediateLoadEventListener() {
  //mendapatkan todos dari local storage dan tampilkan render di browser
  document.addEventListener("DOMContentLoaded", getTodos);

  //ini adalah event untuk menambahkan todo
  todoForm.addEventListener("submit", addTodo);

  //ini adalah event menghapus 1 todo
  todoList.addEventListener("click", deleteTodo);

  //ini adalah event yang hapus semua todo
  clearButton.addEventListener("click", clearTodos);

  //ini adalah event untuk filtering todos
  filterInput.addEventListener("keyup", filterTodos);
}

//reusecodes
function createTodoElement(value) {
  //membuat li element
  const li = document.createElement("li");

  //nambahkan class pada element li
  li.className =
    "todo-item list-group-item d-flex justify-content-between align-items-center mb-1";

  //nambahin children ke element li
  li.appendChild(document.createTextNode(value)); // dengan append maka

  //membuat delete button
  const a = document.createElement("a");

  //memberi properti untuk element a
  a.href = "#";
  a.className = "badge badge-danger delete-todo";
  a.innerHTML = "Delete";

  //menyisipkan element a ke children li
  li.appendChild(a);

  //memasukkan element li yang telah di buat dengan javascript ke dalam element todoList
  todoList.appendChild(li);
}

function getItemFromLocalStorage() {
  let todos;

  if (localStorage.getItem("todos") == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

//ini adalah DOM Function
function getTodos() {
  const todos = getItemFromLocalStorage();
  todos.forEach((todo) => {
    createTodoElement(todo);
  });
}

function addTodo(e) {
  e.preventDefault(); //ketika melakukan submit maka akan refresh atau tereload

  //if dijalankan kalo ada jalanin
  if (todoInput.value) {
    createTodoElement(todoInput.value); //input yang masukkan dari fungsi input todo
    addTodoLocalStorage(todoInput.value);
    //setelah submit maka akan dihapus
    todoInput.value = "";
  } //kalo kosong maka tulis kosong
  else {
    alert("input tidak boleh kosong, silakan masukan kembali!");
  }
}

function addTodoLocalStorage(todoInputValue) {
  const todos = getItemFromLocalStorage();
  todos.push(todoInputValue);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteTodo(e) {
  e.preventDefault();
  if (e.target.classList.contains("delete-todo")) {
    if (confirm("apakah yakin akan menghapus?")) {
      const parent = e.target.parentElement;
      parent.remove();

      deleteTodoLocalStorage(parent);
    }
  }
}

function deleteTodoLocalStorage(deletedElement) {
  const todos = getItemFromLocalStorage(); // akan menghapus element parent tongkol yakni li elemen

  todos.forEach((todo, index) => {
    if (deletedElement.firstChild.textContent == todo) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}
function clearTodos() {
  todoList.innerHTML = "";
  clearTodosLocalStorage();
}

function clearTodosLocalStorage() {
  localStorage.clear();
}
function filterTodos(e) {
  //ini untuk filter kata dari yang diinputkan
  const filterText = e.target.value.toLowerCase();
  const todoItems = document.querySelectorAll(".todo-item");

  //looping
  todoItems.forEach((item) => {
    //firstchile itu untuk mengambil anak dari li yakni tulisan yang di dalam elemennya yakni text isi kontentnya
    const itemText = item.firstChild.textContent.toLowerCase();

    if (itemText.indexOf(filterText) !== -1) {
      //kalo ada kita munculin tetep render ke browser
      //ini mah iseng aja pake inline css in js aslinya dari video mah setattribut
      item.setAttribute("style", "display: block;");
    } else {
      //kalo ga ada kita kasih none
      item.setAttribute("style", "display: none !important;");
      //bisa juga seperti aslinya kek dibawah ini
      //item.setAttribut("style","display : none !important;");
      // item.style.visibility = "hidden";
    }

    console.log(itemText);
  });

  // console.log(todoItems);
}
