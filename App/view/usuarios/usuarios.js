window.onload = function() {
    pintarMenu();
    setModal();
    aplicarFiltros();
    
}



function aplicarFiltros() {
    var textoBuscador = document.getElementById("inputFiltrosTextoBuscador").value;

    if (textoBuscador == "") {
        document.getElementById("usuarios").innerHTML = "";
        document.getElementById("infoUsuarios").style.display = "flex";
    }else{
        document.getElementById("infoUsuarios").style.display = "none";
    

        var settings = {
            "url": "api/usuarios",
            "method": "POST",
            "timeout": 0,
            "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
            },
            "data": {
            "pagina": "1",
            "cantidadRegistros": "20",
            "textoBuscador": ""+textoBuscador
            }
        };
        
        $.ajax(settings).done(function (response) {
            var json = response;
            var usuarios = eval(json);

            document.getElementById("usuarios").innerHTML = "";

            if (usuarios["usuarios"].length == 0) {
                document.getElementById("divUsuariosNoEncontrados").style.opacity = 1;
                document.getElementById("divUsuariosNoEncontrados").style.transition = "0.5s";
            }else{
                document.getElementById("divUsuariosNoEncontrados").style.opacity = 0;
                document.getElementById("divUsuariosNoEncontrados").style.transition = "0s";
            }

            for (let i = 0; i < usuarios["usuarios"].length; i++) {
                pintarModelKit(usuarios["usuarios"][i]);            
            }
        });
    }
}

function pintarModelKit(usuario) {
    var id_usuario = usuario["id_usuario"];
    var nombre = usuario["username"];
    var img_usuario = usuario["img_usuario"];

    document.getElementById("usuarios").innerHTML += `
        <div class="usuario">
            <div class="usuarioLink" >  
                <a href="usuario?id=${id_usuario}">                      
                    <div class="ImgUsuario" id="usuario${id_usuario}">
                        <img src="${img_usuario}" alt="">
                    </div>
                </a>
                <div class="fondoAnimado">
                    <div class="datosUsuario">
                        <a class="nombreUsuario" href="usuario?id=${id_usuario}">
                            ${nombre}
                        </a>
                    </div>
                </div>  
            </div>
        </div>
    `;
}