const signupFormHandler = async (event) => {
  event.preventDefault();

  const firstName = document.querySelector("#signup-firstname").value.trim();
  const lastName = document.querySelector("#signup-lastname").value.trim();
  const email = document.querySelector("#signup-email").value.trim();
  const password = document.querySelector("#signup-password").value.trim();
  const confirmpassword = document
    .querySelector("#signup-password-confirm")
    .value.trim();

  if (firstName && lastName && email && password && confirmpassword) {
    if (password !== confirmpassword) {
      return alert("Passwords don't match!");
    }

    const response = await fetch("/api/users/signup", {
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
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      // alert(response.statusText);
      alert("Wrong email or password");
    }
  }
};

document
  .querySelector("#signin-submit")
  .addEventListener("click", signinFormHandler);

document
  .querySelector("#signup-submit")
  .addEventListener("click", signupFormHandler);
