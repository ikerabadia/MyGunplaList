var pestanaActiva = "general";





function tooglePestanaPuntuacion(){
    if(pestanaActiva == "general"){
        pestanaActiva = "personal";
        document.getElementById("pestanaPuntuacionesGeneral").style.backgroundColor = "white";
        document.getElementById("pestanaPuntuacionesGeneral").style.color = "#2A3439";
        document.getElementById("pestanaPuntuacionesPersonal").style.backgroundColor = "#2A3439";
        document.getElementById("pestanaPuntuacionesPersonal").style.color = "white";
        document.getElementById("contenedorPuntuacionesDatosGeneral").style.display = "none";
        document.getElementById("contenedorPuntuacionesDatosPersonal").style.display = "flex";
    }else{
        pestanaActiva = "general";
        document.getElementById("pestanaPuntuacionesGeneral").style.backgroundColor = "#2A3439";
        document.getElementById("pestanaPuntuacionesGeneral").style.color = "white";
        document.getElementById("pestanaPuntuacionesPersonal").style.backgroundColor = "white";
        document.getElementById("pestanaPuntuacionesPersonal").style.color = "#2A3439";
        document.getElementById("contenedorPuntuacionesDatosGeneral").style.display = "flex";
        document.getElementById("contenedorPuntuacionesDatosPersonal").style.display = "none";
    }
}