let newNote = document.querySelector(".add");
const form = document.querySelector("#form");
const formTitle = document.querySelector(".content-heading p");
const noteTitle = document.querySelector("input");
const noteDescription = document.querySelector("textarea");
const save = document.querySelector(".save-btn");
const closeIcon = document.querySelector(".close-icon");
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false,
  updateId;

newNote.addEventListener("click", note);

function note() {
  form.classList.add("form-show");
  formTitle.textContent = "Add Note";
  save.textContent = "Save";
}
closeIcon.addEventListener("click", function () {
  isUpdate = false;
  noteTitle.value = noteDescription.value = "";

  form.classList.remove("form-show");
});

function deleteNote(noteId) {
  notes.splice(noteId, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

function updateNote(noteId, title, description) {
  updateId = noteId;
  isUpdate = true;
  newNote.click();
  noteTitle.value = title;
  noteDescription.value = description;
  formTitle.textContent = "Update Note";
  save.textContent = "Save";
}

function copyNote(description) {
  navigator.clipboard.writeText(description);
  alert("Note has been copied");
}

function makeBold(noteId) {
  let note = document.getElementById(`note-${noteId}`);

  note.firstElementChild.classList.toggle("bold");
}

function showNotes() {
  if (!notes) return;
  document.querySelectorAll(".note").forEach((li) => li.remove());
  notes.forEach((note, id) => {
    let filterDesc = note.description.replaceAll("\n", "<br/>");
    let liTag = `
    <li class="note" id='note-${id}' >
        <div class="details">
            <h4 style="text-align:center;">
              ${note.title}
            </h4>
            <span>${filterDesc}</span>
        </div>
        <div class="bottom-content">
            <div>
              <span>${note.time}</span>
              <span>${note.date}</span>
            </div>
            <div>
                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                <div class="menu">
                  <button onclick="updateNote(${id}, '${note.title}', '${filterDesc}')">
                      <img height =20px width = 20px src="https://www.iconpacks.net/icons/3/free-content-icon-9813.png">
                  </button>
                  <button onclick="copyNote('${filterDesc}')">
                      <img height = 20px width = 20px src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx81OEaDzpOV9SwXuYblF3u6R4XXZF4RZEfA&usqp=CAU">
                  </button>
                  <button onclick="makeBold(${id})">
                      <img height = 20px width = 20px src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTraRl_S3a883tG3m7Q1kn6U4DzxrI7uieMtw&usqp=CAU"
                  </button>
                  <button onclick="deleteNote(${id})">
                      <img height=20px width = 20px src="https://www.iconpacks.net/icons/3/free-icon-trash-can-10412.png">
                  </button>
                </div>
            </div>
        </div>
    </li>`;
    newNote.insertAdjacentHTML("afterend", liTag);
  });
}
showNotes();
save.addEventListener("click", (e) => {
  e.preventDefault();
  let title = noteTitle.value.trim(),
    description = noteDescription.value.trim();
  if (title == "" || description == "") {
    alert("Field cannot be empty.");
    return;
  }
  newNote.addEventListener("click", note);
  if (title || description) {
    let currentDate = new Date(),
      month = months[currentDate.getMonth()],
      day = currentDate.getDate(),
      year = currentDate.getFullYear(),
      time = currentDate.toTimeString().slice(0, 9);

    let noteInfo = {
      title,
      description,
      date: `${month} ${day}, ${year}`,
      time,
    };
    if (!isUpdate) {
      notes.push(noteInfo);
    } else {
      isUpdate = false;
      notes[updateId] = noteInfo;
    }
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
    noteTitle.value = noteDescription.value = "";
    form.classList.remove("form-show");
  }
});

function showMenu(elem) {
  elem.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != elem) {
      elem.parentElement.classList.remove("show");
    }
  });
}
