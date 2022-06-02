



function ampliarTarjetaSlider(tarjetaClicada) {
    var tarjetas = document.querySelectorAll(".itemSlider");
    tarjetas.forEach(tarjeta => {
        tarjeta.classList.remove("selected");
    });

    tarjetaClicada.classList.add("selected");
}