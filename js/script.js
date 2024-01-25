const inputElement = document.getElementById("title");
const createBtn = document.getElementById("create");
const listElement = document.getElementById("list");

const notes = [
  {
    title: "Позвонить Саша, для работы",
    completed: true,
  },
  {
    title: "Позdsadsadвонить Саша, для работы",
    completed: false,
  },
];

function render() {
  listElement.innerHTML = "";
  if (notes.length === 0){
    listElement.innerHTML = '<p>Нет элементов</p>'
  }
  for (i = 0; i < notes.length; i++) {
    listElement.insertAdjacentHTML("beforeend", getNoteTemplate(notes[i], i));
  }
}

render();

createBtn.onclick = function () {
  if (inputElement.value.length === 0) {
    return;
  }

  const newNote = {
    title: inputElement.value,
    completed: false,
  };

  notes.push(newNote);

  render();

  inputElement.value = "";
};

listElement.onclick = function (event){
  if(event.target.dataset.index){
    const index = Number(event.target.dataset.index)
    const type = event.target.dataset.type

    if(type === "toggle"){
      notes[index].completed = !notes[index].completed
    }else if (type === "remove"){
      notes.splice(index, 1)
    }

    render()
  }
}

function getNoteTemplate(note, index) {
  return `
  <li class="list-group-item" ->
      <span style="${note.completed ? "text-decoration: line-through;" : ""}">${
    note.title
  }</span>
      <span>
          <span class="check-btn" style="${
            note.completed ? "background-color: orange;" : ""
          }" data-index="${index}" data-type="toggle">&check;</span>
          <span class="check-btn" data-index="${index}" data-type="remove">&times;</span>
      </span>
  </li>
  `;
}
