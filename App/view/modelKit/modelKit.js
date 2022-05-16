var pestanaActiva = "general";
var idModelKitActual = 0; 
var datosModelKit;

window.onload = function(){
    establecerIdModelKitActual();
    pintarMenu();
    getUsuarioLogueado();
    setModal();
    pintarDatos();
}

function establecerIdModelKitActual(){
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    idModelKitActual = urlParams.get('id');
}

function pintarDatos(){
    var settings = {
        "url": "api/getModelKitById/"+idModelKitActual,
        "method": "GET",
        "timeout": 0,
        "headers": {
        },
      };
      
      $.ajax(settings).done(function (response) {
        var json = response;
        resultados=eval(json);
        datosModelKit = resultados;

        //Nombre
        document.getElementById("tituloModelKit").innerHTML = ` 
            ${resultados["modelKits"][0]["nombre"]}
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" id="mostrarModalModificacion">
                            <i class="fa fa-pencil" aria-hidden="true"></i>
                            <p>MODIFICAR</p>
                        </button>
        `
        
        //Rank
        document.getElementById("puesto").innerHTML = resultados["modelKits"][0]["puesto_nota"];
        //nota
        if (resultados["modelKits"][0]["nota"] != null) {
            document.getElementById("nota").innerHTML = resultados["modelKits"][0]["nota"];
        }else{
            document.getElementById("nota").innerHTML = "&nbsp-";
        }
        //Estado
        $('#contenedorEstado').remove();
        if (usuarioLogueado == null) {
            document.getElementById("subtitulo").innerHTML += `
                <div class="contenedorEstado addMisGunplas" id="contenedorEstado" onclick='mostrarToast("red", "Debes iniciar sesión para añadir este model kit a tus gunplas")'>
                    <i class="fa fa-plus" aria-hidden="true"></i>
                    <P>Seguir</P>
                </div>
            `
            document.getElementById("contenedorEstado").style.cursor = "pointer";
        }else{
            if (resultados["modelKits"][0]["modelKitUserData"].length == 0) {
                document.getElementById("subtitulo").innerHTML += `
                    <div class="contenedorEstado addMisGunplas" id="contenedorEstado" onclick='addToMisGunplas(${resultados["modelKits"][0]["id_model_kit"]})'>
                        <i class="fa fa-plus" aria-hidden="true"></i>
                        <P>Seguir</P>
                    </div>
                `
                document.getElementById("contenedorEstado").style.cursor = "pointer";
            }else{
                switch (resultados["modelKits"][0]["modelKitUserData"]["estado"]) {
                    case "0":
                        document.getElementById("subtitulo").innerHTML += `
                            <div class="contenedorEstado enLista" id="contenedorEstado">
                                <i class="fa fa-list" aria-hidden="true"></i>
                                <P>Mis gunplas</P>
                            </div>
                        `
                        break;
                    case "1":
                        document.getElementById("subtitulo").innerHTML += `
                            <div class="contenedorEstado enBacklog" id="contenedorEstado">
                                <i class="fa fa-archive" aria-hidden="true"></i>
                                <P>Backlog</P>
                            </div>
                        `
                        break;       
                    case "2":
                        document.getElementById("subtitulo").innerHTML += `
                            <div class="contenedorEstado enConstruccion" id="contenedorEstado">
                                <i class="fa fa-wrench" aria-hidden="true"></i>
                                <P>En construccion</P>
                            </div>
                        `
                        break;     
                    case "3":
                        document.getElementById("subtitulo").innerHTML += `
                            <div class="contenedorEstado terminado" id="contenedorEstado">
                                <i class="fa fa-check" aria-hidden="true"></i>
                                <P>Completado</P>
                            </div>
                        `
                        break;
                    default:
                        break;
                }
            }
        }

        //imagenes
        var contenedorIndicadores = document.getElementById("contenedorIndicadores");
        var contenedorImagenes = document.getElementById("contenedorImagenes");
        contenedorIndicadores.innerHTML = "";
        contenedorImagenes.innerHTML = "";
        var linksImagenes = [];

        if (resultados["modelKits"][0]["img_caja"] != "") {
            linksImagenes.push(resultados["modelKits"][0]["img_caja"]);
        }
        if (resultados["modelKits"][0]["img_pose_base_delante"] != "") {
            linksImagenes.push(resultados["modelKits"][0]["img_pose_base_delante"]);
        }
        if (resultados["modelKits"][0]["img_pose_base_detras"] != "") {
            linksImagenes.push(resultados["modelKits"][0]["img_pose_base_detras"]);
        }
        if (resultados["modelKits"][0]["img_pose1"] != "") {
            linksImagenes.push(resultados["modelKits"][0]["img_pose1"]);
        }
        if (resultados["modelKits"][0]["img_pose2"] != "") {
            linksImagenes.push(resultados["modelKits"][0]["img_pose2"]);
        }

        if (linksImagenes.length > 0) {
            contenedorIndicadores.innerHTML += `
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            `
            contenedorImagenes.innerHTML += `
                <div class="carousel-item active h-100">
                    <img src="${linksImagenes[0]}" class="mx-auto d-block h-100">
                </div>
            `
            for (let i = 1; i < linksImagenes.length; i++) {
                contenedorIndicadores.innerHTML += `
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" aria-label="Slide ${i+1}"></button>
                `
                contenedorImagenes.innerHTML += `
                    <div class="carousel-item h-100">
                        <img src="${linksImagenes[i]}" class="mx-auto d-block h-100">
                    </div>
                `                
            }
            
        }

        //puntuaciones        
        establecerPuntuaciones();

        //Datos
        document.getElementById("datoGrado").innerHTML = resultados["modelKits"][0]["grado"];
        document.getElementById("datoEscala").innerHTML = resultados["modelKits"][0]["escala"];
        document.getElementById("datoFechaSalida").innerHTML = resultados["modelKits"][0]["fecha_salida"];
        document.getElementById("linkGunplaWiki").href = resultados["modelKits"][0]["link_gunpla_wiki"];
        document.getElementById("datoDescripcion").innerHTML = resultados["modelKits"][0]["descripcion"];

        //Edits
        pintarEdits();

        //Boton Puntuar
        pintarBotonPuntuar();

        //Modal puntuar
        pintarModalPuntuar();
        
        //Modal modificar
        pintarModalModificar();

      });
}

function pintarModalModificar() {
    document.getElementById("inputNombreModelKit").value = datosModelKit["modelKits"][0]["nombre"];    
    document.getElementById("inputCreateGrado").value = datosModelKit["modelKits"][0]["grado"];
    document.getElementById("inputCreateEscala").value = datosModelKit["modelKits"][0]["escala"];
    document.getElementById("inputCreateReleaseDate").value = datosModelKit["modelKits"][0]["fecha_salida"];
    document.getElementById("inputCreateLinkGunplaWiki").value = datosModelKit["modelKits"][0]["link_gunpla_wiki"];
    document.getElementById("descripcionModelKit").value = datosModelKit["modelKits"][0]["descripcion"];

    document.getElementById("imgCaja").src = datosModelKit["modelKits"][0]["img_caja"];
    document.getElementById("img1").src = datosModelKit["modelKits"][0]["img_pose_base_delante"];
    document.getElementById("img2").src = datosModelKit["modelKits"][0]["img_pose_base_detras"];
    document.getElementById("img3").src = datosModelKit["modelKits"][0]["img_pose1"];
    document.getElementById("img4").src = datosModelKit["modelKits"][0]["img_pose2"];
    
}

function pintarModalPuntuar() {
    if (datosModelKit["modelKits"][0]["modelKitUserData"] != null) {

          var inputNotaDificultad = document.getElementById("inputNotaDificultad");
          var inputNotaAcabadoOOB = document.getElementById("inputNotaAcabadoOOB");
          var inputNotaCalidad = document.getElementById("inputNotaCalidad");      
          var inputNotaPoses = document.getElementById("inputNotaPoses");   
          var inputNotaGeneral = document.getElementById("inputNotaGeneral");

          if (datosModelKit["modelKits"][0]["modelKitUserData"]["nota_dificultad"] != null) {
            inputNotaDificultad.value = datosModelKit["modelKits"][0]["modelKitUserData"]["nota_dificultad"];
          }
          if (datosModelKit["modelKits"][0]["modelKitUserData"]["nota_acabado_OOB"] != null) {
            inputNotaAcabadoOOB.value = datosModelKit["modelKits"][0]["modelKitUserData"]["nota_acabado_OOB"];
          }
          if (datosModelKit["modelKits"][0]["modelKitUserData"]["nota_calidad"] != null) {
            inputNotaCalidad.value = datosModelKit["modelKits"][0]["modelKitUserData"]["nota_calidad"];
          }
          if (datosModelKit["modelKits"][0]["modelKitUserData"]["nota_poses"] != null) {
            inputNotaPoses.value = datosModelKit["modelKits"][0]["modelKitUserData"]["nota_poses"];
          }
          if (datosModelKit["modelKits"][0]["modelKitUserData"]["nota_media_usuario"] != null) {
            inputNotaGeneral.value = datosModelKit["modelKits"][0]["modelKitUserData"]["nota_media_usuario"];
          }

          

    }
}

function ponerNota() {
    var notaDificultad = document.getElementById("inputNotaDificultad").value;
    var notaAcabadoOOB = document.getElementById("inputNotaAcabadoOOB").value;
    var notaCalidad = document.getElementById("inputNotaCalidad").value;      
    var notaPoses = document.getElementById("inputNotaPoses").value;   
    var notaGeneral = document.getElementById("inputNotaGeneral").value;

    var settings = {
        "url": "api/ponerNota",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "idModelKit": ""+idModelKitActual,
          "notaDificultad": ""+notaDificultad,
          "notaOOB": ""+notaAcabadoOOB,
          "notaCalidad": ""+notaCalidad,
          "notaPoses": ""+notaPoses,
          "notaGeneral": ""+notaGeneral
        }
      };
      
      $.ajax(settings).done(function (response) {
        var json = response;
        resultados=eval(json);

        if (resultados["status"] == true) {
            mostrarToast("green", "El model kit se ha modificado correctamente");
            pintarDatos();
        }else{
            mostrarToast("red", "No se ha podido puntuar el model kit correctamente");
        }

        document.getElementById("btnCerrarModalPutuar").click();

      });
}

function pintarBotonPuntuar() {
    if (usuarioLogueado != null) {
        document.getElementById("contenedorPuntuacionesMedia").innerHTML += `
        <div id="btnPuntuar" data-bs-toggle="modal" data-bs-target="#modalNotas">
            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
            <p>Puntuar</p>
        </div>
    `;
    }else{
        document.getElementById("contenedorPuntuacionesMedia").innerHTML += `
        <div id="btnPuntuar" onclick='mostrarToast("red", "Debes iniciar sesion para puntuar un model kit")'>
            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
            <p>Puntuar</p>
        </div>
    `;
    }
    
}

function pintarEdits() {
    
    var settings = {
        "url": "api/getModificacionesModelKit/"+idModelKitActual,
        "method": "POST",
        "timeout": 0,
        "headers": {
        },
      };
      
      $.ajax(settings).done(function (response) {
        var json = response;
        resultados=eval(json);

        document.getElementById("userUltimoEdit").innerHTML = resultados["modificaciones"][0]["username"];
        document.getElementById("userUltimoEdit").href = "usuario/" + resultados["modificaciones"][0]["fk_usuario"];

        

        for (let i = 0; i < resultados["modificaciones"].length; i++) {
            
            document.getElementById("modificacionesModelKit").innerHTML += `
                <p><i class="fa fa-caret-right" aria-hidden="true"></i> Modificado el <span class="listaEditsFecha">${resultados["modificaciones"][i]["fecha_modificacion"]}</span> por <a class="listaEditsUser" href="usuario/${resultados["modificaciones"][i]["fk_usuario"]}" >${resultados["modificaciones"][i]["username"]}</a></p>   
                <hr>
            `
            
        }

        

      });

}

function addToMisGunplas(idModelKit){
    var settings = {
        "url": "api/addToMisGunplas",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "idModelKit": ""+idModelKit
        }
      };
      
      $.ajax(settings).done(function (response) {
        var json = response;
        resultados=eval(json);
        if (resultados["status"] == true) {
            mostrarToast("green", "Model kit añadido a tus gunplas");
            document.getElementById("contenedorEstado").innerHTML = `
                <i class="fa fa-list" aria-hidden="true"></i>
                <P>Mis gunplas</P>
            `
            document.getElementById("contenedorEstado").classList.remove("addMisGunplas");
            document.getElementById("contenedorEstado").classList.add("enLista");
        }else{
            mostrarToast("red", "Error al añadir el model kit a tus gunplas");
        }
      });
}

function tooglePestanaPuntuacion(){
    if(pestanaActiva == "general"){
        pestanaActiva = "personal";
        document.getElementById("pestanaPuntuacionesGeneral").style.backgroundColor = "white";
        document.getElementById("pestanaPuntuacionesGeneral").style.color = "#2A3439";
        document.getElementById("pestanaPuntuacionesPersonal").style.backgroundColor = "#2A3439";
        document.getElementById("pestanaPuntuacionesPersonal").style.color = "white";
        document.getElementById("btnPuntuar").style.display = "flex";
    }else{
        pestanaActiva = "general";
        document.getElementById("pestanaPuntuacionesGeneral").style.backgroundColor = "#2A3439";
        document.getElementById("pestanaPuntuacionesGeneral").style.color = "white";
        document.getElementById("pestanaPuntuacionesPersonal").style.backgroundColor = "white";
        document.getElementById("pestanaPuntuacionesPersonal").style.color = "#2A3439";
        document.getElementById("btnPuntuar").style.display = "none";
    }
    establecerPuntuaciones();
}

function establecerPuntuaciones(){
    var notaGeneral = document.getElementById("notaGeneral");
    var notaDificultad = document.getElementById("notaDificultad");
    var notaAcabadoOOB = document.getElementById("notaAcabadoOOB");
    var notaCalidad = document.getElementById("notaCalidad");
    var notaPoses = document.getElementById("notaPoses");

    if (pestanaActiva == "general") {

        if (datosModelKit["modelKits"][0]["nota"] != null) {
            notaGeneral.innerHTML = datosModelKit["modelKits"][0]["nota"];
        }else{
            notaGeneral.innerHTML = "&nbsp-";
        }     
        if (datosModelKit["modelKits"][0]["nota_dificultad"] != null) {
            notaDificultad.innerHTML = datosModelKit["modelKits"][0]["nota_dificultad"];
        }else{
            notaDificultad.innerHTML = "&nbsp-";
        } 
        if (datosModelKit["modelKits"][0]["nota_acabado_OOB"] != null) {
            notaAcabadoOOB.innerHTML = datosModelKit["modelKits"][0]["nota_acabado_OOB"];
        }else{
            notaAcabadoOOB.innerHTML = "&nbsp-";
        } 
        if (datosModelKit["modelKits"][0]["nota_calidad"] != null) {
            notaCalidad.innerHTML = datosModelKit["modelKits"][0]["nota_calidad"];
        }else{
            notaCalidad.innerHTML = "&nbsp-";
        } 
        if (datosModelKit["modelKits"][0]["nota_poses"] != null) {
            notaPoses.innerHTML = datosModelKit["modelKits"][0]["nota_poses"];
        }else{
            notaPoses.innerHTML = "&nbsp-";
        }

    }else if (pestanaActiva == "personal") {

        if (datosModelKit["modelKits"][0]["modelKitUserData"] != null) {

            if (datosModelKit["modelKits"][0]["modelKitUserData"]["nota_media_usuario"] != null) {
                notaGeneral.innerHTML = datosModelKit["modelKits"][0]["modelKitUserData"]["nota_media_usuario"];
            }else{
                notaGeneral.innerHTML = "&nbsp-";
            }     
            if (datosModelKit["modelKits"][0]["modelKitUserData"]["nota_dificultad"] != null) {
                notaDificultad.innerHTML = datosModelKit["modelKits"][0]["modelKitUserData"]["nota_dificultad"];
            }else{
                notaDificultad.innerHTML = "&nbsp-";
            } 
            if (datosModelKit["modelKits"][0]["modelKitUserData"]["nota_acabado_OOB"] != null) {
                notaAcabadoOOB.innerHTML = datosModelKit["modelKits"][0]["modelKitUserData"]["nota_acabado_OOB"];
            }else{
                notaAcabadoOOB.innerHTML = "&nbsp-";
            } 
            if (datosModelKit["modelKits"][0]["modelKitUserData"]["nota_calidad"] != null) {
                notaCalidad.innerHTML = datosModelKit["modelKits"][0]["modelKitUserData"]["nota_calidad"];
            }else{
                notaCalidad.innerHTML = "&nbsp-";
            } 
            if (datosModelKit["modelKits"][0]["modelKitUserData"]["nota_poses"] != null) {
                notaPoses.innerHTML = datosModelKit["modelKits"][0]["modelKitUserData"]["nota_poses"];
            }else{
                notaPoses.innerHTML = "&nbsp-";
            }

        }else{
            notaGeneral.innerHTML = "&nbsp-";
            notaDificultad.innerHTML = "&nbsp-";
            notaAcabadoOOB.innerHTML = "&nbsp-";
            notaCalidad.innerHTML = "&nbsp-";
            notaPoses.innerHTML = "&nbsp-";
        }

    }
    
}

function updateModelKit(){
    var nombre = document.getElementById("inputNombreModelKit").value;    
    var grado = document.getElementById("inputCreateGrado").value;
    var escala = document.getElementById("inputCreateEscala").value;
    var fechaSalida = document.getElementById("inputCreateReleaseDate").value;
    var linkGunplaWiki = document.getElementById("inputCreateLinkGunplaWiki").value;
    var descripcion = document.getElementById("descripcionModelKit").value;

    var imgCaja = document.getElementById("inputCreateImgCaja").files[0];
    var imgDelante = document.getElementById("inputCreateImg1").files[0];
    var imgDetras = document.getElementById("inputCreateImg2").files[0];
    var imgPose1 = document.getElementById("inputCreateImg3").files[0];
    var imgPose2 = document.getElementById("inputCreateImg4").files[0];

    if (nombre == datosModelKit["modelKits"][0]["nombre"]) {
        nombre = null;
    }
    if (grado == datosModelKit["modelKits"][0]["grado"]) {
        grado = null;
    }
    if (escala == datosModelKit["modelKits"][0]["escala"]) {
        escala = null;
    }
    if (fechaSalida == datosModelKit["modelKits"][0]["fecha_salida"]) {
        fechaSalida = null;
    }
    if (linkGunplaWiki == datosModelKit["modelKits"][0]["link_gunpla_wiki"]) {
        linkGunplaWiki = null;
    }
    if (descripcion == datosModelKit["modelKits"][0]["descripcion"]) {
        descripcion = null;
    }


    var formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('grado', grado);
    formData.append('escala', escala);
    formData.append('descripcion', descripcion);
    formData.append('fechaSalida', fechaSalida);
    formData.append('linkGunplaWiki', linkGunplaWiki);
    formData.append('imgCaja', imgCaja);
    formData.append('imgPoseBaseDelante', imgDelante);
    formData.append('imgPoseBaseDetras', imgDetras);
    formData.append('imgPose1', imgPose1);
    formData.append('imgPose2', imgPose2);
    
    $.ajax({
        url: 'api/updateModelKit/'+idModelKitActual,
        type: 'post',
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {            
            if (response.status == true) {
                document.getElementById("btnCerrarModalCreateModelKit").click();
                pintarDatos();
                mostrarToast("green", "El model kit se ha modificado correctamente");
            }else{
                mostrarToast("red", response["mensaje"]);
            }
            
        }
    });

}

//PREVISUALIZADO DE IMAGENES EN LA MODIFICACION DE MODEL KITS
inputCreateImgCaja.onchange = evt => {
    const [file] = inputCreateImgCaja.files
    if (file) {
      imgCaja.src = URL.createObjectURL(file)
    }
}

inputCreateImg1.onchange = evt => {
    const [file] = inputCreateImg1.files
    if (file) {
      img1.src = URL.createObjectURL(file)
    }
}

inputCreateImg2.onchange = evt => {
    const [file] = inputCreateImg2.files
    if (file) {
      img2.src = URL.createObjectURL(file)
    }
}

inputCreateImg3.onchange = evt => {
    const [file] = inputCreateImg3.files
    if (file) {
      img3.src = URL.createObjectURL(file)
    }
}

inputCreateImg4.onchange = evt => {
    const [file] = inputCreateImg4.files
    if (file) {
      img4.src = URL.createObjectURL(file)
    }
}