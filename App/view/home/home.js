
window.onload = function() {
    pintarMenu();
    getUsuarioLogueado();
    pintarDatos();
}

function pintarDatos(){
    pintarSlider();
    pintarTopNota();
}

function pintarSlider() {
    var settings = {
        "url": "api/getTopModelKitsOrdered",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "numeroRegistros": "5",
          "orden": "fecha_salida",
          "dias": "4000"
        }
      };
      
      $.ajax(settings).done(function (response) {
        var json = response;
        resultados=eval(json);

        for (let i = 0; i < 5; i++) {
            document.getElementById("imgSlider"+(i+1)).src = resultados["modelKits"][i]["img_caja"];
            document.getElementById("nombreModelKit"+(i+1)).innerHTML = resultados["modelKits"][i]["nombre"];
            document.getElementById("nombreModelKit"+(i+1)).href = "modelKit?id=" + resultados["modelKits"][i]["id_model_kit"];
            document.getElementById("notaModelKit"+(i+1)).innerHTML = resultados["modelKits"][i]["nota"];
        }
      });
}
function pintarTopNota() {
    var settings = {
        "url": "api/getTopModelKitsOrdered",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "numeroRegistros": "5",
          "orden": "nota",
          "dias": "4000"
        }
      };
      
      $.ajax(settings).done(function (response) {
        var json = response;
        resultados=eval(json);

        for (let i = 0; i < 5; i++) {
            document.getElementById("topModelKitEnlace"+(i+1)).href = "modelKit?id=" + resultados["modelKits"][i]["id_model_kit"];
            document.getElementById("topModelKitNota"+(i+1)).innerHTML = `<i class="fa fa-star" aria-hidden="true"></i><span>${resultados["modelKits"][i]["nota"]}</span>`;
            document.getElementById("topModelKitImagen"+(i+1)).src = resultados["modelKits"][i]["img_caja"];
            document.getElementById("topModelKitNombre"+(i+1)).innerHTML = resultados["modelKits"][i]["nombre"];
            document.getElementById("topModelKitFecha"+(i+1)).innerHTML = resultados["modelKits"][i]["fecha_salida"];
            document.getElementById("topModelKitGrado"+(i+1)).innerHTML = resultados["modelKits"][i]["grado"];
            document.getElementById("topModelKitEscala"+(i+1)).innerHTML = resultados["modelKits"][i]["escala"];
        }
      });
}

function ampliarTarjetaSlider(tarjetaClicada) {
    var tarjetas = document.querySelectorAll(".itemSlider");
    tarjetas.forEach(tarjeta => {
        tarjeta.classList.remove("selected");
    });

    tarjetaClicada.classList.add("selected");
    
}