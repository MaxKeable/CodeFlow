const noteshandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector("#title-input").value.trim();
  const content = document.querySelector("#notes-input").value.trim();
  const codeSnippets = document
    .querySelector("#code-snippets-input")
    .value.trim();
  console.log(title);
  console.log(content);
  if (title && content) {
    const response = await fetch("/api/notes", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      console.log("respons is ok");
      //  document.location.replace("/modules");
    } else {
      alert("Failed to create a new note");
    }
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector("#save-button");
  button.addEventListener("click", noteshandler);
});
