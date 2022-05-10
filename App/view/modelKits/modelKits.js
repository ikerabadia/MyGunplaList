
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
            <a href="modelKit/${modelKit["id_model_kit"]}">                      
                <div class="ImgModelKit" >

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
    document.getElementById("modelKits").innerHTML = `
        <div class="noEncuentraModelKit">
            <p>¿No encuentras el model kit que buscas?</p>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            CREALO AQUI
            </button>
        </div>
    `;
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