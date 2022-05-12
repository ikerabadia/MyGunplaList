
var paginaActual;
var elementosPorPagina;

window.onload = function() {
    paginaActual = 0;
    elementosPorPagina = 20;
    pintarMenu();
    setModal();
    pintarModelKits();
    
}

function pintarModelKits() {
    
    var orden = document.getElementById("inputFiltrosOrden").value;
    var notaMinima = document.getElementById("inputNotaMinima").value; 
    var notaMaxima = document.getElementById("inputNotaMaxima").value;
    var textoBuscador = document.getElementById("inputFiltrosTextoBuscador").value;
    var grado = document.getElementById("inputFiltrosGrado").value;

    var settings = {
        "url": "api/getAllModelKits",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "pagina": ""+paginaActual,
          "orden": ""+orden,
          "notaMinima": ""+notaMinima,
          "notaMaxima": ""+notaMaxima,
          "textoBuscador": ""+textoBuscador,
          "grado": ""+grado,
        }
      };
      
      $.ajax(settings).done(function (response) {
        var json = response;
        resultados=eval(json);
        
        if (resultados["status"] == true) {
            
            document.getElementById("modelKits").innerHTML = "";
            var modelKit = "";
            for (let i = 0; i < resultados["modelKits"].length; i++) {
                modelKit = resultados["modelKits"][i];
                pintarModelKit(modelKit);
            }

            pintarPaginado(resultados);

        }else{
            mostrarToast("red", "Ha ocurrido un error en la busqueda de los model kits");
        }
      });

}

function aplicarFiltros() {
    paginaActual = 0;
    pintarModelKits();
}

function pintarModelKit(modelKit) {
    
    document.getElementById("modelKits").innerHTML += `
    <div class="modelKit">
        <div class="modelKitLink" >  
            <a href="modelKit?id=${modelKit["id_model_kit"]}">                      
                <div class="ImgModelKit" id="imgModelKit${modelKit["id_model_kit"]}">

                </div>
            </a>
            <div class="fondoAnimado">
                <div class="datosModelKit">
                    <p class="nombreModelKit">
                        ${modelKit["nombre"]}
                    </p>
                    <div class="contenedorGradoEscala">
                        <p class="gradoModelKit">
                            ${modelKit["grado"]}
                        </p>
                        <p class="escalaModelKit">
                            ${modelKit["escala"]}
                        </p>
                    </div>
                </div>
            </div>   
            <p class="contenedorNotaModelKit">
                <i class="fa fa-star" aria-hidden="true"></i>
                <span id="notaModelKit">${modelKit["nota"]}</span>                                
            </p>
            <div class="contenedorEstadoModelKit">
                ${getEstadoModelKit(modelKit)}                                                
            </div>
        </div>
    </div>
    `;

    if(modelKit["img_caja"] != ""){
        url = modelKit["img_caja"];
        document.getElementById("imgModelKit"+modelKit["id_model_kit"]).innerHTML = `
            <img src="${url}" alt="">
        `;
        /* document.getElementById("imgModelKit"+modelKit["id_model_kit"]).style.backgroundImage = "url("+url+")"; */
    }else{
        document.getElementById("imgModelKit"+modelKit["id_model_kit"]).innerHTML = `<p>SIN IMAGEN <br> :C<p>`;
    }

}

function getEstadoModelKit(modelKit) {
    var estadoHtml = "";
    if(modelKit["modelKitUserData"] == null){
        estadoHtml = `
        <div class="estadoModelKit" id="mk${modelKit["id_model_kit"]}" onclick = "mostrarToast('red', 'Debes iniciar sesion para añadir un model kit a tus gunplas.')">
            <i class="fa fa-plus" aria-hidden="true"></i> 
            <i class="fa fa-list enLista" aria-hidden="true"></i>                                    
        </div>
        `;
    }else{
        if(modelKit["modelKitUserData"].length == 0){
            estadoHtml = `
            <div class="estadoModelKit" id="mk${modelKit["id_model_kit"]}" onclick = "addModelKitMisGunplas(${modelKit["id_model_kit"]})">
                <i class="fa fa-plus" aria-hidden="true"></i> 
                <i class="fa fa-list enLista" aria-hidden="true"></i>                                    
            </div>
            `;
        }else{
            switch (modelKit["modelKitUserData"]["estado"]) {
                case 0:
                    estadoHtml = '<i class="fa fa-list enLista" aria-hidden="true"></i>';
                    break;
                case 1:
                    estadoHtml = '<i class="fa fa-archive enBacklog" aria-hidden="true"></i>';
                    break;
                case 2:
                    estadoHtml = '<i class="fa fa-wrench enContruccion" aria-hidden="true"></i>';
                    break;
                case 3:
                    estadoHtml = '<i class="fa fa-check terminado" aria-hidden="true"></i>';
                    break;
                default:
                    break;
            }
        }
    }


    return estadoHtml;
}

function addModelKitMisGunplas(idModelKit) {

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

        console.log(resultados);
        if (resultados["status"] == true) {
            mostrarToast("green", "Model kit añadido a tus gunplas");
            document.getElementById("mk"+idModelKit).parentElement.innerHTML = `<i class="fa fa-list enLista" aria-hidden="true"></i>`;
        }else{
            mostrarToast("red", "Ha ocurrido un error al añadir el model kit a tus gunplas");
        }
      });

}

function pintarPaginado(listaModelKits) {
    if (paginaActual == 0) {
        document.getElementById("btnPaginaAnterior").style.display = "none";
    }else{
        document.getElementById("btnPaginaAnterior").style.display = "flex";
    }
    if (listaModelKits["modelKits"].length < elementosPorPagina || elementosPorPagina*(paginaActual+1) == listaModelKits["totalElements"]) {
        document.getElementById("btnPaginaSiguiente").style.display = "none";
    }else{
        document.getElementById("btnPaginaSiguiente").style.display = "flex";
    }
    
    if (listaModelKits["totalElements"] == 0) {
        document.getElementById("elements").innerHTML = "0 - 0"

        mostrarCrearModelKit();
    }else{
        document.getElementById("elements").innerHTML = `${paginaActual*elementosPorPagina+1} - ${(paginaActual*elementosPorPagina) + listaModelKits["modelKits"].length}`;
    }
    
    document.getElementById("totalElements").innerHTML = `${listaModelKits["totalElements"]}`;
}

function mostrarCrearModelKit() {
    if (usuarioLogueado == null) {
        document.getElementById("modelKits").innerHTML = `
            <div class="noEncuentraModelKit">
                <p>¿No encuentras el model kit que buscas? 
                <br> 
                <span>Regístrate o inicia sesión y créalo tu mismo</span></p>
                <a type="button" class="btn btn-primary" href="login" >
                    Login / Register
                </a>
            </div>
        `;
    }else{
        document.getElementById("modelKits").innerHTML = `
            <div class="noEncuentraModelKit">
                <p>¿No encuentras el model kit que buscas?</p>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    CREALO AQUI
                </button>
            </div>
        `;
    }
    
}

function paginaAnterior() {
    if (paginaActual > 0) {
        paginaActual--;
    }
    pintarModelKits();
}
function paginaSiguiente() {
    paginaActual++;
    pintarModelKits();
}

function mostrarToast(color, texto){
    document.getElementById("toastCuadradoColor").style.fill = color;
    document.getElementById("toastTexto").innerHTML = texto;
    var toastLiveExample = document.getElementById('toast')
    var toast = new bootstrap.Toast(toastLiveExample);
    toast.show();
}

function showCreateModelKitModal() {
    document.getElementById("createModelKitModal").style.display = "block";
}
function hideCreateModelKitModal() {
    document.getElementById("createModelKitModal").style.display = "none";
}

//PREVISUALIZADO DE IMAGENES EN LA CREACION DE MODEL KITS
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

//CREACION DE MODEL KIT
function createModelKit() {

    //Obtengo los datos e imagenes del nuevo model kit
    var nombre = document.getElementById("inputNombreModelKit").value;
    var grado = document.getElementById("inputCreateGrado").value;
    var escala = document.getElementById("inputCreateEscala").value;
    var descripcion = document.getElementById("descripcionModelKit").value;
    var fechaSalida = document.getElementById("inputCreateReleaseDate").value;
    var linkGunplaWiki = document.getElementById("inputCreateLinkGunplaWiki").value;
    var imgCaja = document.getElementById("inputCreateImgCaja").files[0];
    var imgPoseBaseDelante = document.getElementById("inputCreateImg1").files[0];
    var imgPoseBaseDetras = document.getElementById("inputCreateImg2").files[0];    
    var imgPose1 = document.getElementById("inputCreateImg3").files[0];
    var imgPose2 = document.getElementById("inputCreateImg4").files[0];

    //Meto todos los datos e imagenes en el formdata
    var formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('grado', grado);
    formData.append('escala', escala);
    formData.append('descripcion', descripcion);
    formData.append('fechaSalida', fechaSalida);
    formData.append('linkGunplaWiki', linkGunplaWiki);
    formData.append('imgCaja', imgCaja);
    formData.append('imgPoseBaseDelante', imgPoseBaseDelante);
    formData.append('imgPoseBaseDetras', imgPoseBaseDetras);
    formData.append('imgPose1', imgPose1);
    formData.append('imgPose2', imgPose2);
    
    $.ajax({
        url: 'api/nuevoModelKit',
        type: 'post',
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.status == true) {
                mostrarToast("green", response["mensaje"]);
                limpiarModalCreateModelKit();
            }else{
                mostrarToast("red", response["mensaje"]);
            }
            console.log(response);
        }
    });

}
function limpiarModalCreateModelKit() {
    document.getElementById("inputNombreModelKit").value = "";
    document.getElementById("inputCreateGrado").value = "";
    document.getElementById("inputCreateEscala").value = "";
    document.getElementById("descripcionModelKit").value = "";
    document.getElementById("inputCreateReleaseDate").value = "";
    document.getElementById("inputCreateLinkGunplaWiki").value = "";
    document.getElementById("inputCreateImgCaja").value = "";
    document.getElementById("inputCreateImg1").value = "";
    document.getElementById("inputCreateImg2").value = "";
    document.getElementById("inputCreateImg3").value = "";
    document.getElementById("inputCreateImg4").value = "";
    imgCaja.src = "";
    img1.src = "";
    img2.src = "";
    img3.src = "";
    img4.src = "";
    document.getElementById("btnCerrarModalCreateModelKit").click();   
}