//All Country API
allCountry();

function allCountry() {
  const tablaHTML = document.getElementById("country-table-body");

  fetch("https://localhost:7167/api/Country/AllCountries")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((country) => showData(country))
    .catch((error) => {
      console.log("There has been an error consiming the API: ", error);
      tablaHTML.textContent =
        "There has been an error: No data has been found. Please try again.";
    });

  const showData = (country) => {
    let body = "";
    for (let i = 0; i < country.length; i++) {
      body += `<tr><td>${country[i].id}</td><td>${country[i].nombre}</td><td>${country[i].gentilicio}</td><td>${country[i].capital}</td><td>${country[i].estatus}</td></tr>`;
    }

    document.getElementById("country-table-body").innerHTML = body;
  };
}

// Configurar el manejador del evento 'submit' fuera de la función 'searchBar'
document.querySelector(".search-countries-form").addEventListener("submit", (event) => {
  event.preventDefault(); // Previene que el formulario recargue la página

  
  searchBar();
});

// Función para manejar la búsqueda
function searchBar() {
  const tablaHTML = document.getElementById("country-table-body");
  const bar = document.querySelector(".search-countries-form");

  // Captura los datos del formulario
  const formdata = new FormData(bar);
  const data = Object.fromEntries(formdata);
  const name = data.name; // Usa 'name' ya que es el nombre correcto del campo en el formulario

   // Realiza la llamada a la API
  fetch(`https://localhost:7167/api/Country/FindCountry?name=${name}`, {
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
      <td>${country.gentilicio}</td>
      <td>${country.capital}</td>
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


//New Country
function newCountry(){
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
    <label for="country-name">Country</label>
    <input name="nombre" type="text" placeholder="Enter country" id="country-name" />
    <label for="demonym">Demonym</label>
    <input name="gentilicio" type="text" placeholder="Enter demonym" id="demonym" />
    <label for="capital">Capital</label>
    <input name="capital" type="text" placeholder="Enter capital" id="capital" />
    <label for="status">Status</label>
    <input name="estatus" type="text" placeholder="Active or Close" id="status" />
    <button type="submit" class="action-buttons" id="new-button">New Country</button>
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


  fetch("https://localhost:7167/api/Country/AddCountry", {
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

//Update Country
function updateCountry(){
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
  <label for="country-name">Country</label>
  <input name="nombre" type="text" placeholder="Enter country" id="country-name" />
  <label for="demonym">Demonym</label>
  <input name="gentilicio" type="text" placeholder="Enter demonym" id="demonym" />
  <label for="capital">Capital</label>
  <input name="capital" type="text" placeholder="Enter capital" id="capital" />
  <label for="status">Status</label>
  <input name="estatus" type="text" placeholder="Active or Close" id="status" />
  <button type="submit" class="action-buttons" id="new-button">Update Country</button>
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


  fetch("https://localhost:7167/api/Country/UpdateCountry", {
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

//Delete Country
function deleteCountry(){
  const formContent = document.getElementById("form-content");

  if (document.querySelector(".new-form")) {
    return;
  }

  // Crear el formulario dinámicamente
  const form = document.createElement("form");
  form.setAttribute("action", "post");
  form.classList.add("new-form");
  form.innerHTML = `
  <label for="id-counrty">ID Number</label>
  <input name="id" type="number" placeholder="Enter id" id="id-counrty"/>
  <button type="submit" class="action-buttons" id="delete-button">Delete Country</button>
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


  fetch(`https://localhost:7167/api/Country/DeleteCountry?id=${id}`, {
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