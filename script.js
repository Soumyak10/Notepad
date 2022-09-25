let newNote = document.querySelector('.add');
const form = document.querySelector('form');
const formTitle = document.querySelector('header p')
const noteTitle = document.querySelector('input')
const noteDescription = document.querySelector('textarea');
const save = document.querySelector('button');
const closeIcon = document.querySelector('header i');
const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, updateId;

newNote.addEventListener("click", function () {
    formTitle.textContent = "Add Note";
    save.textContent = "Save";
    form.classList.add("show");
});

closeIcon.addEventListener("click", function () {
    isUpdate = false;
    noteTitle.value = noteDescription.value = "";
    form.classList.remove("show");
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

function copyNote(noteId, title, description) {
    navigator.clipboard.writeText(description);
}

// function makeBold(noteId, title, description){
//     title.style.
// }

function showNotes() {
    if (!notes) return;
    document.querySelectorAll(".note").forEach(li => li.remove());
    notes.forEach((note, id) => {
        let filterDesc = note.description.replaceAll("\n", '<br/>');
        let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${filterDesc}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="menu">
                                    <li onclick="updateNote(${id}, '${note.title}', '${filterDesc}')">Edit</li>
                                    <li onclick="deleteNote(${id}), '${note.title}', '${filterDesc}'">Delete</li>
                                    <li onclick="makeBold(${id}), '${note.title}', '${filterDesc}'">Bold</li>
                                    <li onclick="copyNote(${id})">Copy</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
        newNote.insertAdjacentHTML("afterend", liTag);
    });
}
showNotes();
save.addEventListener("click", e => {
    e.preventDefault();
    let title = noteTitle.value.trim(),
        description = noteDescription.value.trim();

    if (title || description) {
        let currentDate = new Date(),
            month = months[currentDate.getMonth()],
            day = currentDate.getDate(),
            year = currentDate.getFullYear();

        let noteInfo = { title, description, date: `${month} ${day}, ${year}` }
        if (!isUpdate) {
            notes.push(noteInfo);
        } else {
            isUpdate = false;
            notes[updateId] = noteInfo;
        }
        localStorage.setItem("notes", JSON.stringify(notes));
        showNotes();
        closeIcon.click();
    }
});

function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if (e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    });
}


