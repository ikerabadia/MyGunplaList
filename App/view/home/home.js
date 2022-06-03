



function ampliarTarjetaSlider(tarjetaClicada) {
    var tarjetas = document.querySelectorAll(".itemSlider");
    tarjetas.forEach(tarjeta => {
        tarjeta.classList.remove("selected");
    });

    tarjetaClicada.classList.add("selected");
    tarjetaClicada.getElementById("contenedorNotaModelKitSlider").style.opacity = 1;
    tarjetaClicada.getElementById("contenedorNotaModelKitSlider").style.transform = "rotateX(360deg)";
    tarjetaClicada.getElementById("contenedorPuestoModelKit").style.opacity = 1;
    tarjetaClicada.getElementById("contenedorPuestoModelKit").style.transform = "rotateX(360deg)";
}