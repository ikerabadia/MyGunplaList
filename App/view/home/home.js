var fotoMostrada = 1;
var imagenesPinchosPreferidos = ["", "", "", "", ""];
var imagenesPinchosMejorValorados = ["", "", "", "", ""];
var movimientoAuto = true;
var sliderMostrado = "preferidos";
var intervalo;

window.onload = function() {
    Console.error = () =>{};
    comprobarUsuarioLogueado();
    establecerImagenes();
    intervalo = setInterval(() => {
        if (movimientoAuto) {
            moverFotoIzquierda();
        }        
    }, 5000);

};

function establecerImagenes() {
    var settings = {
        "url": "api/getImagenesSlider",
        "method": "GET",
        "timeout": 0,
        "headers": {
        },
      };
      
      $.ajax(settings).done(function (response) {
        var json = response;
        var resultados=eval(json);

        //MEJOR VALORADOS
        if (resultados["mejorValorados"][0] != undefined) {
            imagenesPinchosMejorValorados[0] = resultados["mejorValorados"][0]["imagen"];
        }else{
            imagenesPinchosMejorValorados[0] = "../../../logrocho/RecursosGenerales/restauranteDefault.png";
        }

        if (resultados["mejorValorados"][1] != undefined) {
            imagenesPinchosMejorValorados[1] = resultados["mejorValorados"][1]["imagen"];
        }else{
            imagenesPinchosMejorValorados[1] = "../../../logrocho/RecursosGenerales/restauranteDefault.png";
        }

        if (resultados["mejorValorados"][2] != undefined) {
            imagenesPinchosMejorValorados[2] = resultados["mejorValorados"][2]["imagen"];
        }else{
            imagenesPinchosMejorValorados[2] = "../../../logrocho/RecursosGenerales/restauranteDefault.png";
        }

        if (resultados["mejorValorados"][3] != undefined) {
            imagenesPinchosMejorValorados[3] = resultados["mejorValorados"][3]["imagen"];
        }else{
            imagenesPinchosMejorValorados[3] = "../../../logrocho/RecursosGenerales/restauranteDefault.png";
        }

        if (resultados["mejorValorados"][4] != undefined) {
            imagenesPinchosMejorValorados[4] = resultados["mejorValorados"][4]["imagen"];
        }else{
            imagenesPinchosMejorValorados[4] = "../../../logrocho/RecursosGenerales/restauranteDefault.png";
        }

        //PREFERIDOS
        if (resultados["preferidos"][0] != undefined) {
            imagenesPinchosPreferidos[0] = resultados["preferidos"][0]["imagen"];
        }else{
            imagenesPinchosPreferidos[0] = "../../../logrocho/RecursosGenerales/restauranteDefault.png";
        }

        if (resultados["preferidos"][1] != undefined) {
            imagenesPinchosPreferidos[1] = resultados["preferidos"][1]["imagen"];
        }else{
            imagenesPinchosPreferidos[1] = "../../../logrocho/RecursosGenerales/restauranteDefault.png";
        }

        if (resultados["preferidos"][2] != undefined) {
            imagenesPinchosPreferidos[2] = resultados["preferidos"][2]["imagen"];
        }else{
            imagenesPinchosPreferidos[2] = "../../../logrocho/RecursosGenerales/restauranteDefault.png";
        }

        if (resultados["preferidos"][3] != undefined) {
            imagenesPinchosPreferidos[3] = resultados["preferidos"][3]["imagen"];
        }else{
            imagenesPinchosPreferidos[3] = "../../../logrocho/RecursosGenerales/restauranteDefault.png";
        }

        if (resultados["preferidos"][4] != undefined) {
            imagenesPinchosPreferidos[4] = resultados["preferidos"][4]["imagen"];
        }else{
            imagenesPinchosPreferidos[4] = "../../../logrocho/RecursosGenerales/restauranteDefault.png";
        }

        moverFotoIzquierda();

      });
}

function comprobarUsuarioLogueado(){
    var settings = {
        "url": "api/getUsuarioLogueado",
        "method": "GET",
        "timeout": 0,
        "headers": {
        },
      };
      
      $.ajax(settings).done(function (response) {
        var json = response;
        var resultados=eval(json);
  
        if (resultados == false) {
            document.getElementById("contenedorBtnLogin").innerHTML = "<a id=\"btnLogin\" href=\"frontLoginRegister\">👤 Login/Register</a>";
            
            document.getElementById("btnPreferidos").style.display = "none";
            document.getElementById("btnMejorValorados").style.width = "100%";
            document.getElementById("btnMejorValorados").style.borderRadius = "10px 10px 0px 0px";
            mostrarMejorValorados();
        }else{
            document.getElementById("contenedorBtnLogin").innerHTML = "<a id=\"btnLogin\" href=\"infoPersonal\">👤 "+resultados["user"]+"</a>";
            document.getElementById("contenedorBtnLogin").innerHTML += "<a onclick=\"logout()\"  id=\"btnLogout\">Logout</a>";
        }
      });
  }
  
  function logout() {
    var settings = {
      "url": "api/logout",
      "method": "GET",
      "timeout": 0,
      "headers": {
      },
    };
    
    $.ajax(settings).done(function (response) {
      window.location.href = "home";
    });
  }

function moverFotoIzquierda(){

    clearInterval(intervalo);
    intervalo = setInterval(() => {
        if (movimientoAuto) {
            moverFotoIzquierda();
        }        
    }, 5000);

    fotoMostrada++;
    if (fotoMostrada == 6) {
        fotoMostrada = 1;
    }

    if (sliderMostrado == "preferidos") {

        var img1 = document.getElementById("imagen1");
        var img2 = document.getElementById("imagen2");
        
        if (img1.classList.contains("mostrado")) {
            img1.classList.remove("mostrado");
            img1.classList.add("noMostrado");
            img2.classList.remove("noMostrado");
            img2.classList.add("mostrado");

            img2.style.backgroundImage = "url("+imagenesPinchosPreferidos[fotoMostrada-1]+")";

            img1.style.transition = "1s";
            img1.style.left = "-100%"
            img2.style.transition = "0s";
            img2.style.left = "100%"
            setTimeout(() => {
                img2.style.transition = "1s";
                img2.style.left = "0%";
            }, 50);
        }else{
            img2.classList.remove("mostrado");
            img2.classList.add("noMostrado");
            img1.classList.remove("noMostrado");
            img1.classList.add("mostrado")

            img1.style.backgroundImage = "url("+imagenesPinchosPreferidos[fotoMostrada-1]+")";

            img2.style.transition = "1s";
            img2.style.left = "-100%"
            img1.style.transition = "0s";
            img1.style.left = "100%"
            setTimeout(() => {
                img1.style.transition = "1s";
                img1.style.left = "0%";
            }, 50);        
        }
    }else{
        var imagen = document.getElementById("imagen2_1");

        imagen.style.opacity = 0;
        imagen.style.backgroundImage = "url("+imagenesPinchosMejorValorados[fotoMostrada-1]+")";
        imagen.style.opacity = 1;
    }
    
}
function moverFotoDerecha(){

    clearInterval(intervalo);
    intervalo = setInterval(() => {
        if (movimientoAuto) {
            moverFotoIzquierda();
        }        
    }, 5000);

    fotoMostrada--;
    if (fotoMostrada == 0) {
        fotoMostrada = 5;
    }

    if (sliderMostrado == "preferidos") {

        

        var img1 = document.getElementById("imagen1");
        var img2 = document.getElementById("imagen2");   
        
        if (img1.classList.contains("mostrado")) {
            img1.classList.remove("mostrado");
            img1.classList.add("noMostrado");
            img2.classList.remove("noMostrado");
            img2.classList.add("mostrado")

            img2.style.backgroundImage = "url("+imagenesPinchosPreferidos[fotoMostrada-1]+")";

            img1.style.transition = "1s";
            img1.style.left = "100%"
            img2.style.transition = "0s";
            img2.style.left = "-100%"
            setTimeout(() => {
                img2.style.transition = "1s";
                img2.style.left = "0%";
            }, 50);
        }else{
            img2.classList.remove("mostrado");
            img2.classList.add("noMostrado");
            img1.classList.remove("noMostrado");
            img1.classList.add("mostrado");

            img1.style.backgroundImage = "url("+imagenesPinchosPreferidos[fotoMostrada-1]+")";

            img2.style.transition = "1s";
            img2.style.left = "100%"
            img1.style.transition = "0s";
            img1.style.left = "-100%"
            setTimeout(() => {
                img1.style.transition = "1s";
                img1.style.left = "0%";
            }, 50);        
        }
    }else{
        var imagen = document.getElementById("imagen2_1");

        imagen.style.opacity = 0;
        imagen.style.backgroundImage = "url("+imagenesPinchosMejorValorados[fotoMostrada-1]+")";
        imagen.style.opacity = 1;
    }
    
    
}
function pararReanudarAnimacion() {
    var boton = document.getElementById("btnPararAnimacion");
    if (movimientoAuto == true) {
        movimientoAuto = false
        clearInterval(intervalo);
        boton.innerHTML = "Reanudar animacion";
        boton.style.backgroundColor = "rgb(255, 204, 0)";
    }else{
        movimientoAuto = true;
        intervalo = setInterval(() => {
            if (movimientoAuto) {
                moverFotoIzquierda();
            }        
        }, 5000);
        boton.innerHTML = "Parar animacion";
        boton.style.backgroundColor = "transparent";
    }
}

function mostrarMejorValorados() {
    var btnMejorValorados = document.getElementById("btnMejorValorados");
    var btnPreferidos = document.getElementById("btnPreferidos");

    /* btnMejorValorados.style.color = "black"; */
    btnMejorValorados.style.backgroundColor = "rgb(255, 204, 0)";
    /* btnPreferidos.style.color = "white"; */
    btnPreferidos.style.backgroundColor = "transparent"

    document.getElementById("imagenes").style.display = "none";
    document.getElementById("imagenes2").style.display = "block";

    sliderMostrado = "mejorValorados";
    moverFotoIzquierda();
}

function mostrarPreferidos() {
    var btnMejorValorados = document.getElementById("btnMejorValorados");
    var btnPreferidos = document.getElementById("btnPreferidos");

    /* btnPreferidos.style.color = "black"; */
    btnPreferidos.style.backgroundColor = "rgb(255, 204, 0)";
    /* btnMejorValorados.style.color = "white"; */
    btnMejorValorados.style.backgroundColor = "transparent"

    document.getElementById("imagenes").style.display = "block";
    document.getElementById("imagenes2").style.display = "none";

    sliderMostrado = "preferidos";
    moverFotoIzquierda();
}