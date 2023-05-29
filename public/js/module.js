const newCodeSnippetHandler = async (event) => {
  event.preventDefault();

  const code = document.querySelector("#codeSnippet-name").value.trim();
  //const description = document.querySelector("#codeSnippet-desc").value.trim();

  if (code) {
    console.log("name");

    console.log(code);

    const response = await fetch("/api/codeSnippet", {
      method: "POST",
      body: JSON.stringify({ code }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("respons is ok");
      //  document.location.replace("/modules");
    } else {
      alert("Failed to create a new code snippet");
    }
  }
};

document
  .querySelector(".new-codeSnippet-form")
  .addEventListener("submit", newCodeSnippetHandler);
