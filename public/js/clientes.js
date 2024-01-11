const HOST = "http://localhost:3000/api/";
const tbody = document.querySelector('tbody');
const fieldId = document.getElementById('id');
const fieldNombre = document.getElementById('nombre');
const fieldApellidos = document.getElementById('apellidos');
const fieldLocalidad = document.getElementById('localidad');
function loadClients() {
  fetch(HOST + 'clientes')
  .then(res => res.json())
  .then(json => {
    let clientes = json.data.clientes;
    //rellenar la tabla de clientes
    tbody.innerHTML = "";
    clientes.forEach(client => {
      let tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${client.id}</td>
        <td>${client.nombre}</td>
        <td>${client.apellidos}</td>
        <td>${client.localidad}</td>
        <td>
        <img
          src="img/editar.png"
          onclick="loadClient(${client.id})"/>
        <img
          src="img/eliminar.png"
          onclick="deleteClient(${client.id})"/>
        </td>
      `;
      tbody.append(tr);
    });
  });
  tbody.innerHTML = "<tr><td colspan= \"5\">Cargando...</td></tr>";
}
function loadClient(id){
  fetch(HOST + 'clientes/' + id)
  .then(res => res.json())
  .then(json => {
    console.log(json);
    let client = json.data;
    fieldId.value = client.id;
    fieldNombre.value = client.nombre;
    fieldApellidos.value = client.apellidos;
    fieldLocalidad.value = client.direccion.localidad;
  });
}
function deleteClient(id){
let requestOptiones = {
  method: "DELETE"
};
fetch(HOST + 'clientes/' + id, requestOptiones)
.then(res => res.json())
.then(json => {
  console.log(json);
  loadClients();
})
}
function crearUsuario(){
  let nombre = fieldNombre.value;
  let apellidos = fieldApellidos.value;
  let localidad = fieldLocalidad.value;
  let cliente = {
    "nombre": nombre,
    "apellidos": apellidos,
    "direccion": {
      "localidad": localidad
    }
  };
  let requestOptiones = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cliente) //cliente
    
  };
  fetch(HOST + 'clientes', requestOptiones)
  .then(res => res.json())
  .then(json => {
    console.log(json);
    loadClients();
  })
}

function modificarCliente(){
  let id = fieldId.value;
  let nombre = fieldNombre.value;
  let apellidos = fieldApellidos.value;
  let localidad = fieldLocalidad.value;
  let cliente = {
    "nombre": nombre,
    "apellidos": apellidos,
    "direccion": {
      "localidad": localidad
    }
  };
  let requestOptiones = {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cliente) //cliente
  }
  fetch(HOST + 'clientes/' + id, requestOptiones)
  .then(res => res.json())
  .then(json => {
    console.log(json);
    loadClients();
  })
  }

// function deleteClient(id){
//   fetch(HOST + 'clientes/' + id, {
//     method: 'DELETE',
//   })
//   .then(res => res.json())
//   .then(json => {
//     console.log(json);
//     loadClients();
//   });
// }
loadClients();