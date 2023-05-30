const noteshandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector("#title-input").value.trim();
  const notes = document.querySelector("#notes-input").value.trim();
  const codeSnippets = document
    .querySelector("#code-snippets-input")
    .value.trim();
  if (title) {
    const response = await fetch("/api/notes", {
      method: "POST",
      body: JSON.stringify({ title, notes, codeSnippets }),
      headers: { "Content-Type": "application/json" },
    });
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector("#save-button");
  button.addEventListener("click", noteshandler);
});
