const signupFormHandler = async (event) => {
  event.preventDefault();

  const firstName = document.querySelector("#signup-firstname").value.trim();
  const lastName = document.querySelector("#signup-lastname").value.trim();
  const email = document.querySelector("#signup-email").value.trim();
  const password = document.querySelector("#signup-password").value.trim();
  const confirmpassword = document
    .querySelector("#signup-password-confirm")
    .value.trim();

  // console.log(firstName, lastName, email, password, confirmpassword);

  if (firstName && lastName && email && password && confirmpassword) {
    if (password !== confirmpassword) {
      return alert("Passwords don't match!");
    }
    // let data = {
    //   firstName,
    //   lastName,
    //   email,
    //   password,
    // };
    // console.log(data);
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
};

const signinFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#signin-email").value.trim();
  const password = document.querySelector("#signin-password").value.trim();

  if (email && password) {
    // let data = {
    //   email,
    //   password,
    // };
    // console.log(data);
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log("[DORIS]: ok");
      document.location.replace("/");
    } else {
      console.log("[DORIS]: not ok");
      alert(response.statusText);
    }
  }
};

document
  .querySelector("#signin-submit")
  .addEventListener("click", signinFormHandler);

document
  .querySelector("#signup-submit")
  .addEventListener("click", signupFormHandler);
