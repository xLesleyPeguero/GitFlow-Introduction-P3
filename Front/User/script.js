//All Country API
allUsers();

function allUsers() {
  const tablaHTML = document.getElementById("user-table-body");

  fetch("https://localhost:7167/api/User/AllUsers")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((user) => showData(user))
    .catch((error) => {
      console.log("There has been an error consiming the API: ", error);
      tablaHTML.textContent =
        "There has been an error: No data has been found. Please try again.";
    });

  const showData = (user) => {
    let body = "";
    for (let i = 0; i < user.length; i++) {
      body += `<tr><td>${user[i].id}</td><td>${user[i].nombre}</td><td>${user[i].correo}</td><td>${user[i].clave}</td><td>${user[i].estatus}</td></tr>`;
    }

    document.getElementById("user-table-body").innerHTML = body;
  };
}

// Configurar el manejador del evento 'submit' fuera de la función 'searchBar'
document.querySelector(".search-users-form").addEventListener("submit", (event) => {
    event.preventDefault(); // Previene que el formulario recargue la página
  
    
    searchBar();
  });
  
  // Función para manejar la búsqueda 
  function searchBar() {
    const tablaHTML = document.getElementById("user-table-body");
    const bar = document.querySelector(".search-users-form");
  
    // Captura los datos del formulario
    const formdata = new FormData(bar);
    const data = Object.fromEntries(formdata);
    const name = data.name; // Usa 'name' ya que es el nombre correcto del campo en el formulario
    
    // Realiza la llamada a la API
    fetch(`https://localhost:7167/api/User/FindUser?name=${name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((country) => {
        showData(country);
      })
      .catch((error) => {
        console.error("An error occured: API cannot be consumed:", error);
        tablaHTML.innerHTML =
          "No data found. Please try again.";
      });
  
    // Función para mostrar datos en la tabla
    const showData = (country) => {
      const body = `<tr>
        <td>${country.id}</td>
        <td>${country.nombre}</td>
        <td>${country.correo}</td>
        <td>${country.clave}</td>
        <td>${country.estatus}</td>
      </tr>`;
      tablaHTML.innerHTML = body;
    };
  }


  //Botón ocultar formulario
function ocultarFormulario() {
    const formContent = document.getElementById("form-content");
    if (formContent.firstChild) {
      formContent.innerHTML = ""; // Borra el contenido del div
    }
  }


//New User
function newUser(){
    const formContent = document.getElementById("form-content");
  
    if (document.querySelector(".new-form")) {
      return;
    }
  
    // Crear el formulario dinámicamente
    const form = document.createElement("form");
    form.setAttribute("action", "post");
    form.classList.add("new-form");
    form.innerHTML = `
      <input name="id" type="number" placeholder="id" value="0" class="hidden-input" />
      <label for="user-name">User</label>
      <input name="nombre" type="text" placeholder="Enter user" id="user-name" />
      <label for="correo">E-mail</label>
      <input name="correo" type="text" placeholder="Enter demonym" id="correo" />
      <label for="clave">Password</label>
      <input name="clave" type="text" placeholder="Enter capital" id="clave" />
      <label for="estatus">Status</label>
      <input name="estatus" type="text" placeholder="Active or Close" id="estatus" />
      <button type="submit" class="action-buttons" id="new-button">New User</button>
      <br />
      <button class="action-buttons" type="button" onclick="ocultarFormulario()">Hide form</button>
      
    `;
  
    // Insertar el formulario en el contenedor
    formContent.appendChild(form);
  
    //show new form
    const formelement = document.querySelector(".new-form");
  
    formelement.addEventListener("submit", (event) => {
      event.preventDefault();
  
      // Captura los datos del formulario
    const formdata = new FormData(formelement);
    const data = Object.fromEntries(formdata);
  
    console.log(data);
  
  
    fetch("https://localhost:7167/api/User/AddUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.text();
      })
      .then((textResponse) => {
        alert(textResponse)
        location.reload(); //reload web page
        
      })
      .catch((error) => {
        console.error("An error occured: API cannot be consumed:", error);
        tablaHTML.innerHTML =
          "No data found. Please try again.";
      });
    });
  }

  //Update User
function updateUser(){
    const formContent = document.getElementById("form-content");
  
    if (document.querySelector(".new-form")) {
      return;
    }
  
    // Crear el formulario dinámicamente
    const form = document.createElement("form");
    form.setAttribute("action", "post");
    form.classList.add("new-form");
    form.innerHTML = `
    <label for="id">ID Number</label>
    <input name="id" type="number" placeholder="Enter id" id="id"/>
    <label for="user-name">User</label>
    <input name="nombre" type="text" placeholder="Enter user" id="user-name" />
    <label for="correo">E-mail</label>
    <input name="correo" type="text" placeholder="Enter demonym" id="correo" />
    <label for="clave">Password</label>
    <input name="clave" type="text" placeholder="Enter capital" id="clave" />
    <label for="estatus">Status</label>
    <input name="estatus" type="text" placeholder="Active or Close" id="estatus" />
    <button type="submit" class="action-buttons" id="new-button">Update User</button>
    <br />
    <button class="action-buttons" type="button" onclick="ocultarFormulario()">Hide form</button>
    `;
  
    // Insertar el formulario en el contenedor
    formContent.appendChild(form);
  
    //show new form
    const formelement = document.querySelector(".new-form");
  
    formelement.addEventListener("submit", (event) => {
      event.preventDefault();
  
      // Captura los datos del formulario
    const formdata = new FormData(formelement);
    const data = Object.fromEntries(formdata);
  
    console.log(data);
  
  
    fetch("https://localhost:7167/api/User/UpdateUser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.text();
      })
      .then((textResponse) => {
        alert(textResponse)
        location.reload(); //reload web page
        
      })
      .catch((error) => {
        console.error("An error occured: API cannot be consumed:", error);
        tablaHTML.innerHTML =
          "No data found. Please try again.";
      });
    });
  }

  //Delete User
function deleteUser(){
    const formContent = document.getElementById("form-content");
  
    if (document.querySelector(".new-form")) {
      return;
    }
  
    // Crear el formulario dinámicamente
    const form = document.createElement("form");
    form.setAttribute("action", "post");
    form.classList.add("new-form");
    form.innerHTML = `
    <label for="id-user">ID Number</label>
    <input name="id" type="number" placeholder="Enter id" id="id-user"/>
    <button type="submit" class="action-buttons" id="delete-button">Delete User</button>
    <br />
    <button class="action-buttons" type="button" onclick="ocultarFormulario()">Hide form</button>
      
    `;
  
    // Insertar el formulario en el contenedor
    formContent.appendChild(form);
  
    //show new form
    const formelement = document.querySelector(".new-form");
  
    formelement.addEventListener("submit", (event) => {
      event.preventDefault();
  
      // Captura los datos del formulario
    const formdata = new FormData(formelement);
    const data = Object.fromEntries(formdata);
    const id = data.id;
  
    console.log(id);
  
  
    fetch(`https://localhost:7167/api/User/DeleteUser?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.text();
      })
      .then((textResponse) => {
        alert(textResponse)
        location.reload(); //reload web page
        
      })
      .catch((error) => {
        console.error("An error occured: API cannot be consumed:", error);
        tablaHTML.innerHTML =
          "No data found. Please try again.";
      });
    });
  }