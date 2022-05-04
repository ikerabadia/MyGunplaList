window.onload = function() {
};

function verificarLogin() {
    var user = document.getElementById("usuarioLogin").value;
    var password = document.getElementById("passwordLogin").value;

    var settings = {
        "url": "api/loginFront",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        "data": {
          "user": ""+user,
          "password": ""+password
        }
      };
      
      $.ajax(settings).done(function (response) {
        var json = response;
        var resultados=eval(json);

        if (resultados == "true") {
          window.location.href = 'home'; 
        }else{
          mostrarToast("red", "Usuario o contraseña incorrectos");
        }

      });
}

function register(){
  var email = document.getElementById("campoRegisterInputEmail").value;
  var usuario = document.getElementById("campoRegisterInputUsuario").value;
  var contrasena = document.getElementById("campoRegisterInputContraseña").value;

    var settings = {
      "url": "api/nuevoUsuario",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "nombre": "",
        "apellido1": "",
        "apellido2": "",
        "correoElectronico": ""+email,
        "user": ""+usuario,
        "password": ""+contrasena,
        "admin": "0"
      }
    };
    
    $.ajax(settings).done(function (response) {
      var json = response;
      var resultados=eval(json);

      if (resultados == true) {
        window.location.href = "frontLoginRegister";
      }else{
        document.getElementById("errorRegister").innerHTML = "El nombre de usuario ya esta en uso.";
      }
      
    });
  
}

function comprobarUsuarioLogin() {
  
  var textoUsuarioLogin = document.getElementById("usuarioLogin").value;
  if (campoRellenado(textoUsuarioLogin)) {
    document.getElementById("iconoUserLogin").style.color = "green";
    document.getElementById("iconoUserLogin").style.animation = "";
    return true;
  }else{    
    document.getElementById("iconoUserLogin").style.color = "red";  
    document.getElementById("iconoUserLogin").style.animation = "";
    void document.getElementById("iconoUserLogin").offsetWidth;
    document.getElementById("iconoUserLogin").style.animation = "shake 0.5s";  
    return false;
  }
}

function comprobarContrasenaLogin() {
  var textoContrasenaLogin = document.getElementById("passwordLogin").value;
  if (campoRellenado(textoContrasenaLogin)) {
    document.getElementById("iconoPasswordLogin").style.color = "green";
    document.getElementById("iconoPasswordLogin").style.animation = "";
    return true;
  }else{
    document.getElementById("iconoPasswordLogin").style.color = "red";
    document.getElementById("iconoPasswordLogin").style.animation = "";
    void document.getElementById("iconoPasswordLogin").offsetWidth;
    document.getElementById("iconoPasswordLogin").style.animation = "shake 0.5s";
    return false;
  }  
}

function comprobarUsuarioRegister() {
  var textoUsuarioRegister = document.getElementById("usuarioRegister").value;
  if (campoRellenado(textoUsuarioRegister) && !/\'/.test(textoUsuarioRegister) && !/\\/.test(textoUsuarioRegister)) {
    document.getElementById("iconoUsuarioRegister").style.color = "green";
    document.getElementById("iconoUsuarioRegister").style.animation = "";
    return true;
  }else{
    document.getElementById("iconoUsuarioRegister").style.color = "red";
    document.getElementById("iconoUsuarioRegister").style.animation = "";
    void document.getElementById("iconoUsuarioRegister").offsetWidth;
    document.getElementById("iconoUsuarioRegister").style.animation = "shake 0.5s";
    return false;
  }  
}

function comprobarEmailRegister() {
  var textoEmailRegister = document.getElementById("emailRegister").value;
  if (campoRellenado(textoEmailRegister) && !/\'/.test(textoEmailRegister) && !/\\/.test(textoEmailRegister) && /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(textoEmailRegister)) {
    document.getElementById("iconoEmailRegister").style.color = "green";
    document.getElementById("iconoEmailRegister").style.animation = "";
    return true;
  }else{
    document.getElementById("iconoEmailRegister").style.color = "red";
    document.getElementById("iconoEmailRegister").style.animation = "";
    void document.getElementById("iconoEmailRegister").offsetWidth;
    document.getElementById("iconoEmailRegister").style.animation = "shake 0.5s";
    return false;
  }    
}

function comprobarContrasenaRegister() {
  var textoContrasenaRegister = document.getElementById("passwordRegister").value;
  if (campoRellenado(textoContrasenaRegister) && !/\'/.test(textoContrasenaRegister) && !/\\/.test(textoContrasenaRegister)) {
    document.getElementById("iconoContrasenaRegister").style.color = "green";
    document.getElementById("iconoContrasenaRegister").style.animation = "";
    return true;
  }else{
    document.getElementById("iconoContrasenaRegister").style.color = "red";
    document.getElementById("iconoContrasenaRegister").style.animation = "";
    void document.getElementById("iconoContrasenaRegister").offsetWidth;
    document.getElementById("iconoContrasenaRegister").style.animation = "shake 0.5s";
    return false;
  }      
}

function comprobarContrasena2Register() {
  var textoContrasenaRegister2 = document.getElementById("password2Register").value;
  if (campoRellenado(textoContrasenaRegister2) && !/\'/.test(textoContrasenaRegister2) && !/\\/.test(textoContrasenaRegister2) && document.getElementById("passwordRegister").value == textoContrasenaRegister2) {
    document.getElementById("iconoContrasena2Register").style.color = "green";
    document.getElementById("iconoContrasena2Register").style.animation = "";
    return true;
  }else{
    document.getElementById("iconoContrasena2Register").style.color = "red";
    document.getElementById("iconoContrasena2Register").style.animation = "";
    void document.getElementById("iconoContrasena2Register").offsetWidth;
    document.getElementById("iconoContrasena2Register").style.animation = "shake 0.5s";
    return false;
  }        
}

function campoRellenado(texto) {
  if (texto != "") {
    return true;
  }else{
    return false;
  }
}

function mostrarToast(color, texto){
  document.getElementById("toastCuadradoColor").fillStyle = color;
  document.getElementById("toastTexto").innerHTML = texto;
  var toastLiveExample = document.getElementById('toast')
  var toast = new bootstrap.Toast(toastLiveExample);
  toast.show();
}

function comprobarLogin() {
  var correcto = true;

  if (!comprobarUsuarioLogin()) {
    correcto = false;
  }
  if (!comprobarContrasenaLogin()) {
    correcto = false;
  }

  if (correcto) {
    verificarLogin();
  }else{
    mostrarToast("red", "Rellene todos los campos del login");
  }
}

function comprobarRegister(){
  var correcto = true;

  if (!comprobarUsuarioRegister()) {
    correcto = false;
  }
  if (!comprobarEmailRegister()) {
    correcto = false;
  }
  if (!comprobarContrasenaRegister()) {
    correcto = false;
  }
  if (!comprobarContrasena2Register()) {
    correcto = false;
  }

  if (correcto) {
    alert("Registro correcto");
  }else{
    mostrarToast("red", "Los campos del nuevo usuario no son correctos");
  }
}

function oscurecer() {
  document.getElementById("SvgjsG1007").setAttribute("fill", "#990000");
  document.getElementById("SvgjsG1008").setAttribute("fill", "#990000");
}
function desOscurecer() {
  document.getElementById("SvgjsG1007").setAttribute("fill", "#e60b0b");
  document.getElementById("SvgjsG1008").setAttribute("fill", "#e60b0b");
}