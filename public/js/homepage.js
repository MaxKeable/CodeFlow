const noteshandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector("#title-input").value.trim();
  if (title) {
    console.log(title);
  }
};

const button = document.querySelector("#save-button");
button.onclick = noteshandler;

document.querySelector(".notes-form").addEventListener("submit", noteshandler);
