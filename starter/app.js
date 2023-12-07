///kumpulkan semua element ui

const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const filterInput = document.getElementById("filter-input");
const todoList = document.getElementById("todo-list");
const clearButton = document.getElementById("clear-todos");

todoForm.addEventListener("submit", addTodo);
todoList.addEventListener("click", deleteTodo);
clearButton.addEventListener("click", clearTodos);
filterInput.addEventListener("keyup", filterTodos);

function addTodo(e) {
  e.preventDefault(); //ketika melakukan submit maka akan refresh atau tereload
  //if dijalankan kalo ada jalanin
  if (todoInput.value) {
    //membuat li element
    const li = document.createElement("li");

    //nambahkan class pada element li
    li.className =
      "list-group-item d-flex justify-content-between align-items-center mb-1";

    //nambahin children ke element li
    li.appendChild(document.createTextNode(todoInput.value)); // dengan append maka
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
    todoInput.value = ""; //mengkosongkan valuenya di kolom input tanpa spasi maka akan jadi hal yang kosong alias clear
  } //kalo kosong maka tulis kosong
  else {
    alert("input tidak boleh kosong, silakan masukan kembali!");
  }
}

function deleteTodo(e) {
  e.preventDefault();
  if (e.target.classList.contains("delete-todo")) {
    if (confirm("apakah yakin akan menghapus?")) {
      const parent = e.target.parentElement;
      parent.remove();
    }
  }
}

function clearTodos() {
  todoList.innerHTML = "";
}

function filterTodos(e) {
  const filterText = e.target.value.toLowerCase();//ini adalah nilai dari filter input dijadikan huruf kecil dan e adalah membuat elemen target vaue adalah isinya dari yang diinput
  
}
