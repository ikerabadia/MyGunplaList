var usuarioLogueado = null;
var usuarioVista = null;
var idUsuarioVista = null;
var paginaActual = 0;
var elementosPorPagina = 20;
var estadoMostrado = "";
var idModelKitDelete = null;
var modelKitUpdateEstado = [];

window.onload = function () {
  pintarMenu();
  getUsuarioLogueado();
  cargarDatosUsuario();
  pintarMisGunplas();
};

function cargarDatosUsuario() {
  var settings = {
    url: "api/getUsuarioLogueado",
    method: "GET",
    timeout: 0,
    headers: {},
  };

  $.ajax(settings).done(function (response) {
    var json = response;
    resultados = eval(json);
    usuarioLogueado = resultados;

    if (usuarioLogueado == false) {
      usuarioLogueado = null;
    }

    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    idUsuarioVista = urlParams.get("id");

    var settings = {
      url: "api/usuario/" + idUsuarioVista,
      method: "GET",
      timeout: 0,
      headers: {},
    };

    $.ajax(settings).done(function (response2) {
      var json2 = response2;
      resultados2 = eval(json2);
      usuarioVista = resultados2["usuarios"][0];
      if (usuarioLogueado != null) {
        //INPUTS MODIFICACION
        //Pinto los inputs con los datos de los usuarios en la zona de modificacion
        if (usuarioLogueado["id_usuario"] == usuarioVista["id_usuario"]) {
          //boton de modificar
          document.getElementById("contenedorImg").innerHTML += `
                        <div class="btnEdit" id="btnEdit" onclick="mostrarEdicion()">
                            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                            <p>EDIT</p>
                        </div>
                    `;

          //bloque con todos los inputs con los datos y los botones de guardar y cancelar
          //link de youtube
          var linkYoutube = "";
          if (document.getElementById("linkYoutubeLink") != undefined) {
            document
              .getElementById("linkYoutubeLink")
              .parentNode.removeChild(
                document.getElementById("linkYoutubeLink")
              );
          }
          if (usuarioLogueado["link_youtube"] != null) {
            linkYoutube =
              '<div class="divDatoInput" id="divDatoInputLinkYoutube">' +
              "<label >Link Youtube</label>" +
              '<input type="text" id="inputUpdateLinkYoutube" value="' +
              usuarioLogueado["link_youtube"] +
              '">' +
              "</div>";
          }
          //link de instagram
          if (document.getElementById("linkInstagramLink") != undefined) {
            document
              .getElementById("linkInstagramLink")
              .parentNode.removeChild(
                document.getElementById("linkInstagramLink")
              );
          }
          var linkInstagram = "";
          if (usuarioLogueado["link_instagram"] != null) {
            linkInstagram =
              '<div class="divDatoInput" id="divDatoInputLinkInstagram">' +
              "<label >Link Instagram</label>" +
              '<input type="text" id="inputUpdateLinkInstagram" value="' +
              usuarioLogueado["link_instagram"] +
              '">' +
              "</div>";
          }

          document.getElementById("perfilInfo").innerHTML += `
                        <div class="perfilData" id="perfilDataEdit">
                            <div class="mb-3 divCreateInputImg">
                                <p>Imagen perfil</p>
                                <input class="form-control inputImg" type="file" id="inputImgPerfil" accept="image/*">
                            </div>
                            <div class="divDatoInput">
                                <label > Nombre de usuario</label>
                                <input type="text" id="inputUpdateUsername" value="${usuarioLogueado["username"]}">
                            </div>
                            <div class="divDatoInput">
                                <label > Email</label>
                                <input type="text" id="inputUpdateEmail" value="${usuarioLogueado["email"]}">
                            </div>
                            ${linkYoutube}
                            ${linkInstagram}
                            <div class="divBtnSaveCancel">
                                <div class="btnCancel" onclick="cancelEdit()">
                                    <p>Cancelar</p>
                                    <i class="fa fa-times" aria-hidden="true"></i>                                
                                </div>
                                <div class="btnGuardar" onclick="updateUser()">
                                    <i class="fa fa-floppy-o" aria-hidden="true"></i>   
                                    <p>Guardar</p>                                                            
                                </div>
                                <div class="btnSave">

                                </div>                            
                            </div>
                        </div>
                    `;

          //input img perfil
          inputImgPerfil.onchange = (evt) => {
            const [file] = inputImgPerfil.files;
            if (file) {
              document.getElementById("imgPerfil").style.background =
                "url(" + URL.createObjectURL(file) + ")";
              document.getElementById("imgPerfil").style.backgroundPosition =
                "center";
              document.getElementById("imgPerfil").style.backgroundSize =
                "cover";
              document.getElementById("imgPerfil").style.backgroundRepeat =
                "no-repeat";
            }
          };
        }
      }
      //imagen
      if (usuarioVista["img_usuario"] != "") {
        document.getElementById("imgPerfil").style.background =
          "url(" + usuarioVista["img_usuario"] + ")";
        document.getElementById("imgPerfil").style.backgroundPosition =
          "center";
        document.getElementById("imgPerfil").style.backgroundSize = "cover";
        document.getElementById("imgPerfil").style.backgroundRepeat =
          "no-repeat";
      }
      //usuario
      document.getElementById("datoUserUsername").innerHTML =
        usuarioVista["username"];
      //email
      document.getElementById("datoUserEmail").innerHTML =
        usuarioVista["email"];
      //link youtube
      if (usuarioVista["link_youtube"] != "") {
        document.getElementById("perfilDataInfo").innerHTML += `
                    <a href="${usuarioVista["link_youtube"]}" id="linkYoutubeLink">
                        <div class="contenedorYoutube">
                            <i class="fa fa-youtube-play" aria-hidden="true"></i>
                            <p id="datoUserYoutubeLink">YOUTUBE</p>
                        </div>
                    </a>
                `;
      }
      //link instagram
      if (usuarioVista["link_instagram"] != "") {
        document.getElementById("perfilDataInfo").innerHTML += `
                    <a href="${usuarioVista["link_instagram"]}" id="linkInstagramLink">
                        <div class="contenedorInstagram">
                            <i class="fa fa-instagram" aria-hidden="true"></i>
                            <p id="datoUserInstagramLink">INSTAGRAM</p>
                        </div>  
                    </a>
                `;
      }
    });
  });
}

function updateUser() {
  var linkYoutube = document.getElementById("inputUpdateLinkYoutube").value;
  var linkInstagram = document.getElementById("inputUpdateLinkInstagram").value;
  var username = document.getElementById("inputUpdateUsername").value;
  var email = document.getElementById("inputUpdateEmail").value;

  var imgPerfil = document.getElementById("inputImgPerfil").files[0];

  var password = null;
  if (linkYoutube == usuarioLogueado["link_youtube"]) {
    linkYoutube = null;
  }
  if (linkInstagram == usuarioLogueado["link_instagram"]) {
    linkInstagram = null;
  }
  if (username == usuarioLogueado["username"]) {
    username = null;
  }
  if (email == usuarioLogueado["email"]) {
    email = null;
  }

  var formData = new FormData();
  formData.append("username", username);
  formData.append("email", email);
  formData.append("link_instagram", linkInstagram);
  formData.append("link_youtube", linkYoutube);
  formData.append("password", password);
  formData.append("img_usuario", imgPerfil);

  $.ajax({
    url: "api/updateUsuario/" + usuarioLogueado["id_usuario"],
    type: "post",
    data: formData,
    contentType: false,
    processData: false,
    success: function (response) {
      if (response.status == true) {
        cargarDatosUsuario();
        mostrarToast("green", "Su usuario se ha modificado correctamente");
        cancelEdit();
      } else {
        mostrarToast("red", response["mensaje"]);
      }
    },
  });
}

function pintarMisGunplas() {
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  idUsuarioVista = urlParams.get("id");
  var textoBuscador = document.getElementById("inputFiltrosTextoBuscador").value;

  pintarEstadoMostrado();

  var settings = {
    url: "api/getUserList",
    method: "POST",
    timeout: 0,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      estado: "" + estadoMostrado,
      idUsuario: "" + idUsuarioVista,
      textoBuscador: "" + textoBuscador
    },
  };

  $.ajax(settings).done(function (response) {
    var json = response;
    var resultados = eval(json);
    var modelKits = resultados["modelKits"];

    document.getElementById("modelKitBody").innerHTML = ``;
    for (let i = 0; i < modelKits.length; i++) {
      pintarModelKit(modelKits[i]);
    }
  });
}

function pintarModelKit(modelKit) {
  if (estadoMostrado == "3") {                  //muestro los model kit terminados 
    
    var notaUsuario = "-";
    if (modelKit["nota_media_usuario"] != null) {
        notaUsuario = modelKit["nota_media_usuario"];
    }
    document.getElementById("modelKitBody").innerHTML += `
        <div class="modelKit ">
            <div class="contenedorPuesto w10 borderR">
                <p class="datoNota puesto1" >${modelKit["puesto_nota_mis_gunplas"]}</p>
            </div>
            <div class="contenedorPuesto w50 borderR divImgDatos">
                <a class="img" id="img${modelKit["model_kit"][0]["id_model_kit"]}" href="modelKit?id=${modelKit["model_kit"][0]["id_model_kit"]}">
                    
                </a>
                <div class="datosModelKit">
                    <h3 class="nombre nombreNota"><a href="modelKit?id=${modelKit["model_kit"][0]["id_model_kit"]}">${modelKit["model_kit"][0]["nombre"]}</a></h3>
                    <p>${modelKit["model_kit"][0]["grado"]}</p>
                    <p>${modelKit["model_kit"][0]["escala"]}</p>
                    <p>${modelKit["model_kit"][0]["fecha_salida"]}</p>                                
                </div>

            </div>
            <div class="contenedorPuesto w10 borderR">
                <p class="datoNota" id="notaUsuario1">${notaUsuario}</p>
            </div>
            <div class="contenedorPuesto contenedorPuestoEstado w30" id="estado${modelKit["model_kit"][0]["id_model_kit"]}">
                ${getEstado(modelKit["estado"])}
            </div>

        </div>
    `;
  } else {
    
    document.getElementById("modelKitBody").innerHTML += `
                                <div class="modelKit ">
                                    <div class="contenedorPuesto w70 borderRL divImgDatos">
                                        <a class="img" id="img${modelKit["model_kit"][0]["id_model_kit"]}" href="modelKit?id=${modelKit["model_kit"][0]["id_model_kit"]}">
                                            
                                        </a>
                                        <div class="datosModelKit">
                                            <h3 class="nombre nombreNota"><a href="modelKit?id=${modelKit["model_kit"][0]["id_model_kit"]}">${modelKit["model_kit"][0]["nombre"]}</a></h3>
                                            <p>${modelKit["model_kit"][0]["grado"]}</p>
                                            <p>${modelKit["model_kit"][0]["escala"]}</p>
                                            <p>${modelKit["model_kit"][0]["fecha_salida"]}</p>                                
                                        </div>
            
                                    </div>
                                    <div class="contenedorPuesto contenedorPuestoEstado w30" id="estado${modelKit["model_kit"][0]["id_model_kit"]}">
                                        ${getEstado(modelKit["estado"])}
                                    </div>
                                </div>
        `;
  }
  


  var settings = {
    "url": "api/getUsuarioLogueado",
    "method": "GET",
    "timeout": 0,
  };
  
  $.ajax(settings).done(function (response) {
    var json = response;
    var resultados = eval(json);
    var usuario = resultados;

    if (usuario != false && idUsuarioVista == usuario["id_usuario"]) {
      document.getElementById("estado" + modelKit["model_kit"][0]["id_model_kit"]).innerHTML += `
        <div class="btnEliminarDeMisGunplas" data-bs-toggle="modal" data-bs-target="#modalEliminarModelKit" onclick="establecerModelKitEliminar(${modelKit["model_kit"][0]["id_model_kit"]})">
          <p>ELIMINAR</p>
          <i class="fa fa-trash" aria-hidden="true"></i>          
        </div>
        <div class="btnModificarEstadoMisGunplas" data-bs-toggle="modal" data-bs-target="#modalModificarEstado" onclick="establecerModelKitModificarEstado(${modelKit["model_kit"][0]["id_model_kit"]}, ${modelKit["estado"]})">
          <i class="fa fa-pencil" aria-hidden="true"></i>
          <p>ESTADO</p>
        </div>
      `
    }

  });
  
    
  if (modelKit["model_kit"][0]["img_caja"] != "") {
        document.getElementById("img"+modelKit["model_kit"][0]["id_model_kit"]).style.backgroundImage = "url('"+modelKit["model_kit"][0]["img_caja"]+"')";
  }else{
        document.getElementById("img"+modelKit["model_kit"][0]["id_model_kit"]).style.background = "#2A3439";
        document.getElementById("img"+modelKit["model_kit"][0]["id_model_kit"]).innerHTML = `
            <div class="noImagen" id="imgModelKit23"><p>SIN IMAGEN <br> :C</p></div>
        `
  }
}

function getEstado(estado){    

            if (estado == 0 || estado == "0") {
                return `
                        <div class="contenedorEstado enLista" id="contenedorEstado">
                            <i class="fa fa-list" aria-hidden="true"></i>
                            <P>Mis gunplas</P>
                        </div>
                    `;
            }else if(estado == 1 || estado == "1"){
                return `
                        <div class="contenedorEstado enBacklog" id="contenedorEstado">
                            <i class="fa fa-archive" aria-hidden="true"></i>
                            <P>Backlog</P>
                        </div>
                    `;
            }else if(estado == 2 || estado == "2"){
                return `
                        <div class="contenedorEstado enConstruccion" id="contenedorEstado">
                            <i class="fa fa-wrench" aria-hidden="true"></i>
                            <P>En construccion</P>
                        </div>
                    `
            }else if(estado == 3 || estado == "3"){
                return `
                        <div class="contenedorEstado terminado" id="contenedorEstado">
                            <i class="fa fa-check" aria-hidden="true"></i>
                            <P>Terminado</P>
                        </div>
                    `
            }       
    
}

function pintarEstadoMostrado() {
    var claseTodos = "";
    var claseDeseados = "";
    var claseBacklog = "";
    var claseConstruccion = "";
    var claseTerminado = "";
    if (estadoMostrado === "") {
      claseTodos = "filtroEstadoMostrado";
    }else if(estadoMostrado == 0){
      claseDeseados = "filtroEstadoMostrado";
    }else if(estadoMostrado == 1){
      claseBacklog = "filtroEstadoMostrado";
    }else if(estadoMostrado == 2){
      claseConstruccion = "filtroEstadoMostrado";
    }else if(estadoMostrado == 3){
      claseTerminado = "filtroEstadoMostrado";
    }
    document.getElementById("filtrosEstadoContenedor").innerHTML = `
                            <div class="filtroEstado ${claseTodos}" id="filtroEstadoTodos" onclick="filtrarEstado('')">
                                TODOS
                            </div>
                            <div class="filtroEstado ${claseDeseados}" id="filtroEstadoDeseados" onclick="filtrarEstado(0)">
                                DESEADOS
                            </div>
                            <div class="filtroEstado ${claseBacklog}" id="filtroEstadoBacklog" onclick="filtrarEstado(1)">
                                BACKLOG
                            </div>
                            <div class="filtroEstado ${claseConstruccion}" id="filtroEstadoConstruccion" onclick="filtrarEstado(2)">
                                CONSTRUCCION
                            </div>
                            <div class="filtroEstado ${claseTerminado}" id="filtroEstadoTerminado" onclick="filtrarEstado(3)">
                                TERMINADOS
                            </div>
    `

    document.getElementById("modelKitsHeader").innerHTML = `
        <h2 class="w70 borderRL">INFORMACION</h2>
        <h2 class="w30">ESTADO</h2>                    
    `;
    /* if (estadoMostrado === "") {
        var btnEstado = document.getElementById("filtroEstadoTodos");
        btnEstado.style.width = "22%";
        btnEstado.style.height = "70px";
        btnEstado.style.fontSize = "1.1em";
        btnEstado.style.backgroundColor = "#2a3439";
    }else if(estadoMostrado == 0){
        var btnEstado = document.getElementById("filtroEstadoDeseados");
        btnEstado.style.width = "22%";
        btnEstado.style.height = "70px";
        btnEstado.style.fontSize = "1.1em";
        btnEstado.style.backgroundColor = "rgb(255, 255, 255)";
    }else if(estadoMostrado == 1){
        var btnEstado = document.getElementById("filtroEstadoBacklog");
        btnEstado.style.width = "22%";
        btnEstado.style.height = "70px";
        btnEstado.style.fontSize = "1.1em";
        btnEstado.style.backgroundColor = "#184bba";
    }else if(estadoMostrado == 2){
        var btnEstado = document.getElementById("filtroEstadoConstruccion");
        btnEstado.style.width = "22%";
        btnEstado.style.height = "70px";
        btnEstado.style.fontSize = "1.1em";
        btnEstado.style.backgroundColor = "rgb(159, 159, 159)";
    }else  */if(estadoMostrado == 3){
      document.getElementById("modelKitsHeader").innerHTML = `
            <h2 class="w10 borderR">PUESTO</h2>        
            <h2 class="w50 borderR">INFORMACION</h2>  
            <h2 class="w10 borderR">NOTA</h2>      
            <h2 class="w30">ESTADO</h2>                        
        `;
        /* var btnEstado = document.getElementById("filtroEstadoTerminado");
        btnEstado.style.width = "22%";
        btnEstado.style.height = "70px";
        btnEstado.style.fontSize = "1.1em";
        btnEstado.style.backgroundColor = "#99ff00"; */
    }
}

function establecerModelKitEliminar(idModelKit) {
  idModelKitDelete = idModelKit;
}
function establecerModelKitModificarEstado(idModelKit, estado) {
  modelKitUpdateEstado["id_model_kit"] = idModelKit;
  modelKitUpdateEstado["estado"] = estado;
  selectEstadoUpdate(estado);
}
function deleteModelKit() {
  var settings = {
    "url": "api/deleteFromMisGunplas",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    "data": {
      "idModelKit": ""+idModelKitDelete
    }
  };
  
  $.ajax(settings).done(function (response) {
    var json = response;
    var resultados = eval(json);
    if (resultados["status"] == true) {
      mostrarToast("green", "Se ha eliminado el model kit de Mis Gunplas");      
    }else{
      mostrarToast("red", resultados["mensaje"]);
    }
    idModelKitDelete = null;
    document.getElementById("btnCloseDeleteModal").click();
    pintarMisGunplas();
  });
}

function selectEstadoUpdate(nuevoEstado) {
  //Limpio las opciones de ahora
  document.getElementById("opcionEstadoDeseado").classList.remove("opcionEstadoDeseadoSelected");
  document.getElementById("opcionEstadoBacklog").classList.remove("opcionEstadoBacklogSelected");
  document.getElementById("opcionEstadoConstruccion").classList.remove("opcionEstadoConstruccionSelected");
  document.getElementById("opcionEstadoTerminado").classList.remove("opcionEstadoTerminadoSelected");

  modelKitUpdateEstado["estado"] = nuevoEstado;
  //Pongo la nueva clase 
  if (modelKitUpdateEstado["estado"] == 0) {
    document.getElementById("opcionEstadoDeseado").classList.add("opcionEstadoDeseadoSelected");
  }else if (modelKitUpdateEstado["estado"] == 1) {
    document.getElementById("opcionEstadoBacklog").classList.add("opcionEstadoBacklogSelected");
  }else if (modelKitUpdateEstado["estado"] == 2) {
    document.getElementById("opcionEstadoConstruccion").classList.add("opcionEstadoConstruccionSelected");
  }else if (modelKitUpdateEstado["estado"] == 3) {
    document.getElementById("opcionEstadoTerminado").classList.add("opcionEstadoTerminadoSelected");
  }

}

function patchEstado() {
  var settings = {
    "url": "api/patchEstadoMisGunplas",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    "data": {
      "idModelKit": ""+modelKitUpdateEstado["id_model_kit"],
      "estado": ""+modelKitUpdateEstado["estado"]
    }
  };
  
  $.ajax(settings).done(function (response) {
    var json = response;
    var resultados = eval(json);
    if (resultados["status"] == true) {
      mostrarToast("green", "Se ha modificado el estado del model kit correctamente");      
    }else{
      mostrarToast("red", resultados["mensaje"]);
    }
    modelKitUpdateEstado["id_model_kit"] = "";
    modelKitUpdateEstado["estado"] = "";
    document.getElementById("btnCloseUpdateEstadoModal").click();
    pintarMisGunplas();
  });
}

function filtrarEstado(estado) {
    estadoMostrado = estado;
    pintarMisGunplas();
}

function mostrarEdicion() {
  document.getElementById("perfilDataInfo").style.display = "none";
  document.getElementById("btnEdit").style.display = "none";

  document.getElementById("perfilDataEdit").style.display = "flex";
}

function cancelEdit() {
  document.getElementById("perfilDataInfo").style.display = "flex";
  document.getElementById("btnEdit").style.display = "flex";

  document.getElementById("perfilDataEdit").style.display = "none";
}
