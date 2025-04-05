const loginElement = document.getElementById("login-id");

loginElement.addEventListener("submit", (event) => {
  event.preventDefault();

  const datosForm = new FormData(loginElement);
  const datos = Object.fromEntries(datosForm);
  const mail = datos.correo;
  const password = datos.clave;
  

  fetch(`https://localhost:7167/api/User/UserLogin?correo=${mail}&password=${password}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.text();
      })
    .then((textResponse) => {
        alert(textResponse);
        window.location.href = "../index.html";        
      })
    .catch((error) => {
      console.error("Error inesperado: ", error);
      alert(error.message || "An unexpected error occurred. Please try again.");
    });
});