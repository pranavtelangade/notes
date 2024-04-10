let noteIndex = 0;

const input = document.getElementById("note");
const addButton = document.getElementById("add");
const tooltip = document.getElementById("tooltip");
const contentWrapper = document.querySelector(".content-wrapper");
const undoButton = document.querySelector(".undo");

addButton.addEventListener("click", addNote);
input.addEventListener("keydown", handleEnter);

function addNote() {
  const data = input.value.trim();
  if (data) {
    createNoteElement(data);
  } else {
    displayTooltip();
  }
}

function handleEnter(e) {
  if (e.key === "Enter") {
    addNote();
  }
}

function createNoteElement(value) {
  const noteId = `note${noteIndex}`;
  contentWrapper.innerHTML += `
    <div class="content" id="${noteId}">
      <div class="display" id="${noteIndex}">
        <p>${value}</p>
      </div>
      <div class="operations">
        <div class="button" id="edit${noteIndex}" onclick="edit(${noteIndex})">Edit</div>
        <div class="button" id="delete${noteIndex}" onclick="deleteNote(${noteIndex})">Delete</div>
      </div>
    </div>`;
  noteIndex++;
  input.value = "";
}

function edit(id) {
  const editButton = document.getElementById(`edit${id}`);
  const noteContent = document.getElementById(id).querySelector("p");
  const value = noteContent.innerHTML;

  noteContent.innerHTML =
    "<input class='editor' type='text' name='newdata' id='new" +
    id +
    "' value='" +
    value +
    "' onkeydown='if(event.keyCode == 13) save(" +
    id +
    ")'>";
  editButton.innerHTML = "Save";
  editButton.setAttribute("onclick", `save(${id})`);
}

function save(id) {
  const editButton = document.getElementById(`edit${id}`);
  const newValue = document.getElementById(`new${id}`).value.trim();
  const noteContent = document.getElementById(id).querySelector("p");

  if (newValue) {
    noteContent.textContent = newValue;
  } else if (confirm("Empty note will be deleted!")) {
    deleteNote(id);
  }

  editButton.innerHTML = "Edit";
  editButton.setAttribute("onclick", `edit(${id})`);
}

function deleteNote(id) {
  const noteElement = document.getElementById(`note${id}`);
  noteElement.remove();
  showUndoButton(noteElement);
}

function showUndoButton(deletedElement) {
  undoButton.classList.add("show");
  setTimeout(() => {
    undoButton.classList.remove("show");
  }, 3000);

  undoButton.onclick = () => {
    contentWrapper.appendChild(deletedElement);
    undoButton.classList.remove("show");
  };
}

function displayTooltip() {
  tooltip.classList.add("show");
  setTimeout(() => {
    tooltip.classList.remove("show");
  }, 2000);
}
