var rankingActual = "nota";
var usuarioLogueado = null;
var paginaActual = 0;
var elementosPorPagina = 20;

window.onload = function() {
    pintarMenu();
    getUsuarioLogueado();
    pintarDatos()
}

function pintarDatos(){

    var settings = {
        "url": "api/getAllModelKits",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "pagina": ""+paginaActual,
          "orden": ""+rankingActual,
          "notaMinima": "0",
          "notaMaxima": "10",
          "textoBuscador": "",
          "grado": "todos"
        }
      };
      
      $.ajax(settings).done(function (response) {
        var json = response;
        var resultados=eval(json);
        var modelKits = resultados["modelKits"];

        var settings2 = {
            "url": "api/getUsuarioLogueado",
            "method": "GET",
            "timeout": 0,
            "headers": {
            },
          };
          
          $.ajax(settings2).done(function (response2) {
            var json2 = response2;
            var resultados2=eval(json2);
            if (resultados2==false) {
                usuarioLogueado = null;                
            }else{
                usuarioLogueado = resultados2;
            }
            
            var par = "";
            
            var modelKit;
            var estado;

            document.getElementById("modelKitBody").innerHTML = "";
            for (let i = 0; i < modelKits.length; i++) {
                modelKit = modelKits[i];   
                estado = getEstado(modelKit);                
                var notaUsuario = "-";
                var notaModelKit = "-";
                var lastModelKit = "";
                var classPuesto ="";
                var classNota = "";
                if (usuarioLogueado != null && modelKit["modelKitUserData"].length != 0 && modelKit["modelKitUserData"]["nota_media_usuario"] != null) {
                    notaUsuario = modelKit["modelKitUserData"]["nota_media_usuario"];
                }
                if (modelKit["nota"] != 0) {
                    notaModelKit = modelKit["nota"];
                }
                if (i == modelKits.length-1) {
                    lastModelKit = "lastModelKit";
                }
                

                if (rankingActual == "nota") {

                    classPuesto = "puesto"+modelKit["puesto_nota"];  
                    classNota = "nota"+modelKit["puesto_nota"];

                    

                    document.getElementById("modelKitBody").innerHTML += `
                        <div class="modelKit ${par}" id="${lastModelKit}">
                            <div class="contenedorPuesto w125">
                                <p class="datoNota ${classPuesto}">${modelKit["puesto_nota"]}</p>
                            </div>
                            <div class="contenedorPuesto w50 borderRL divImgDatos">
                                <a class="img" href="modelKit?id=${modelKit["id_model_kit"]}" id="img${modelKit["id_model_kit"]}">
                                    
                                </a>
                                <div class="datosModelKit">
                                    <h3 class="nombre nombreNota"><a href="modelKit?id=${modelKit["id_model_kit"]}">${modelKit["nombre"]}</a></h3>
                                    <p>${modelKit["grado"]}</p>
                                    <p>${modelKit["escala"]}</p>
                                    <p>${modelKit["fecha_salida"]}</p>                                
                                </div>

                            </div>
                            <div class="contenedorPuesto w125">
                                <p class="datoNota nota${modelKit["puesto_nota"]}">${notaModelKit}</p>
                            </div>
                            <div class="contenedorPuesto w125 borderRL">
                                <p class="datoNota nota${modelKit["puesto_nota"]}">${notaUsuario}</p>
                            </div>
                            <div class="contenedorPuesto w125 contenedorPuestoEstado">
                                ${estado}
                            </div>
                        </div>
                    `
                }else{
                    classPuesto = "puesto"+modelKit["puesto_popularidad"];     
                    classNota = "nota"+modelKit["puesto_popularidad"];   
                    

                    document.getElementById("modelKitBody").innerHTML += `
                        <div class="modelKit ${par}" id="${lastModelKit}">
                            <div class="contenedorPuesto w125">
                                <p class="datoPopularidad ${classPuesto}">${modelKit["puesto_popularidad"]}</p>
                            </div>
                            <div class="contenedorPuesto w50 borderRL divImgDatos">
                                <a class="img" href="modelKit?id=${modelKit["id_model_kit"]}" id="img${modelKit["id_model_kit"]}">
                                    
                                </a>
                                <div class="datosModelKit">
                                    <h3 class="nombre nombreNota"><a href="modelKit?id=${modelKit["id_model_kit"]}">${modelKit["nombre"]}</a></h3>
                                    <p>${modelKit["grado"]}</p>
                                    <p>${modelKit["escala"]}</p>
                                    <p>${modelKit["fecha_salida"]}</p>                                
                                </div>

                            </div>
                            <div class="contenedorPuesto w125">
                                <p class="datoPopularidad ${classNota}">${notaModelKit}</p>
                            </div>
                            <div class="contenedorPuesto w125 borderRL">
                                <p class="datoPopularidad  ${classNota}">${notaUsuario}</p>
                            </div>
                            <div class="contenedorPuesto w125 contenedorPuestoEstado">
                                ${estado}
                            </div>
                        </div>
                    `
                }

                

                if (modelKit["img_caja"] != "") {
                    document.getElementById("img"+modelKit["id_model_kit"]).style.backgroundImage = "url('"+modelKit["img_caja"]+"')";
                }else{
                    document.getElementById("img"+modelKit["id_model_kit"]).style.background = "#2A3439";
                    document.getElementById("img"+modelKit["id_model_kit"]).innerHTML = `
                        <div class="noImagen" id="imgModelKit23"><p>SIN IMAGEN <br> :C</p></div>
                    `
                }
                

                if (par == "") {
                    par = "par";
                }else{
                    par = "";
                }
            }
            pintarPaginado(resultados);
          });
      });

}

function getEstado(modelKit){
    if (usuarioLogueado == null) {
        return `
            <div class="contenedorEstado addMisGunplas" id="contenedorEstado" onclick='mostrarToast("red", "Debes iniciar sesión para añadir este model kit a tus gunplas")'>
                <i class="fa fa-plus" aria-hidden="true"></i>
                <P>Seguir</P>
            </div>
        `;
    }else{

        if (modelKit["modelKitUserData"].length == 0) {
            return `
                <div class="contenedorEstado addMisGunplas" id="contenedorEstado" onclick='addToMisGunplas(${modelKit["id_model_kit"]}, this)'>
                    <i class="fa fa-plus" aria-hidden="true"></i>
                    <P>Seguir</P>
                </div>
            `;
        }else{

            if (modelKit["modelKitUserData"]["estado"] == 0 || modelKit["modelKitUserData"]["estado"] == "0") {
                return `
                        <div class="contenedorEstado enLista" id="contenedorEstado">
                            <i class="fa fa-list" aria-hidden="true"></i>
                            <P>Mis gunplas</P>
                        </div>
                    `;
            }else if(modelKit["modelKitUserData"]["estado"] == 1 || modelKit["modelKitUserData"]["estado"] == "1"){
                return `
                        <div class="contenedorEstado enBacklog" id="contenedorEstado">
                            <i class="fa fa-archive" aria-hidden="true"></i>
                            <P>Backlog</P>
                        </div>
                    `;
            }else if(modelKit["modelKitUserData"]["estado"] == 2 || modelKit["modelKitUserData"]["estado"] == "2"){
                return `
                        <div class="contenedorEstado enConstruccion" id="contenedorEstado">
                            <i class="fa fa-wrench" aria-hidden="true"></i>
                            <P>En construccion</P>
                        </div>
                    `
            }else if(modelKit["modelKitUserData"]["estado"] == 3 || modelKit["modelKitUserData"]["estado"] == "3"){
                return `
                        <div class="contenedorEstado terminado" id="contenedorEstado">
                            <i class="fa fa-check" aria-hidden="true"></i>
                            <P>Completado</P>
                        </div>
                    `
            }
        }
    }
}


function addToMisGunplas(idModelKit, elemento){
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
            elemento.innerHTML = `
                <i class="fa fa-list" aria-hidden="true"></i>
                <P>Mis gunplas</P>
            `
            elemento.classList.remove("addMisGunplas");
            elemento.classList.add("enLista");
        }else{
            mostrarToast("red", "Error al añadir el model kit a tus gunplas");
        }
      });
}

function toogleRanking() {
    paginaActual = 0;
    if (rankingActual == "nota") {
        rankingActual = "popularidad";
        document.getElementById("btnToogleRanking").style.animation = "tooglePopularidad 0.5s ease forwards";
        setTimeout(() => {
            document.getElementById("txtBtnToogleRanking").innerHTML = "POPULARIDAD";
        }, 250);        
    }else{
        rankingActual = "nota";
        document.getElementById("btnToogleRanking").style.animation = "toogleNota 0.5s ease forwards";
        setTimeout(() => {
            document.getElementById("txtBtnToogleRanking").innerHTML = "NOTA";
        }, 250);        
    }
    pintarDatos();
}

function pintarPaginado(listaModelKits) {
    if (paginaActual == 0) { //si es la primera pagina, no se pinta el boton de retroceder
        document.getElementById("btnPaginaAnterior").style.display = "none";
    }else{
        document.getElementById("btnPaginaAnterior").style.display = "flex";
    }
    if (listaModelKits["modelKits"].length < elementosPorPagina || elementosPorPagina*(paginaActual+1) == listaModelKits["totalElements"]) { //si es la ultima pagina, no se pinta el boton de avanzar
        document.getElementById("btnPaginaSiguiente").style.display = "none";
    }else{
        document.getElementById("btnPaginaSiguiente").style.display = "flex";
    }
    
    if (listaModelKits["totalElements"] == 0) { 
        document.getElementById("elements").innerHTML = "0 - 0";
    }else{
        document.getElementById("elements").innerHTML = `${paginaActual*elementosPorPagina+1} - ${(paginaActual*elementosPorPagina) + listaModelKits["modelKits"].length}`;
    }
    
    document.getElementById("totalElements").innerHTML = `${listaModelKits["totalElements"]}`;
}

function paginaAnterior() {
    if (paginaActual > 0) {
        paginaActual--;
    }
    pintarDatos();
}
function paginaSiguiente() {
    paginaActual++;
    pintarDatos();
}