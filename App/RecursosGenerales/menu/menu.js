
var usuarioLogueado;

window.onload = function () {
  pintarMenu();
  setModal();
};
function setModal() {
    var myModal = document.getElementById('logoutModal')
    var myInput = document.getElementById('logoutBtn')

    myModal.addEventListener('shown.bs.modal', function () {
        myInput.click()
    })
}
function oscurecer() {
  document.getElementById("SvgjsG1007").setAttribute("fill", "#990000");
  document.getElementById("SvgjsG1008").setAttribute("fill", "#990000");
}
function desOscurecer() {
  document.getElementById("SvgjsG1007").setAttribute("fill", "#e60b0b");
  document.getElementById("SvgjsG1008").setAttribute("fill", "#e60b0b");
}
function pintarMenu() {
  document.getElementById("menu").innerHTML = `<div class="wrapper"> </div>
    <div class="container-fluid all-show"> 
        <a class="navbar-brand" href="home" onmouseover="oscurecer()" onmouseleave="desOscurecer()">
            <svg width="77.133" height="60" viewBox="0 0 77.133 81" class="css-1j8o68f">
                <defs id="SvgjsDefs1001"></defs>
                <g id="SvgjsG1007" featurekey="0LeO0L-0" transform="matrix(5.784067153930664,0,0,5.784067153930664,0,-34.68088326508331)" fill="#E60B0B">
                <path d="M0.21484 5.996 l3.125 -0.0000095367 c0.34505 1.2565 1.0547 3.7728 2.1289 7.5488 l1.2305 0 c0.032549 0 0.16602 -0.45247 0.40039 -1.3574 c0.52083 -1.7773 1.1035 -3.8411 1.748 -6.1914 l2.8906 0 l0 9.082 l0.16602 0 l0 1.6602 l-0.87891 0 l0 0.30273 l0.87891 0 l0 2.959 l-2.4609 0 l0 -1.084 l0.30273 0 l0 -3.3594 l-0.51758 0 l0 -1.6797 l-0.3125 0 l-0.019531 0.087891 l-0.26367 0 l0 2.3926 l-0.84961 0 l0 1.1133 l-0.73242 0 l0 1.8945 l-1.7285 0 l0 -1.2109 l-1.0645 0 l0 -1.6602 l-0.63477 0 l0 -1.7188 l-0.36133 0 c-0.013018 -0.097656 -0.091143 -0.39714 -0.23438 -0.89844 l2.4805 0 l-0.068359 -0.33203 l-2.4805 0 l0.068359 0.33203 l-0.33203 0 l0 2.168 l0.16602 0 l0 2.3926 l-0.61523 0 l0 0.42969 l0.61523 0 l0 0.63477 l-2.2266 0 l0 -2.8809 l-0.41992 0 l0 -10.625 z M2.6758 12.5488 l0 0.16602 c0 0.14323 0.0065136 0.41992 0.019531 0.83008 l0.23438 0 c-0.15625 -0.63151 -0.23438 -0.96354 -0.23438 -0.99609 l-0.019531 0 z M9.2285 12.5684 l-0.21484 0.97656 l0.21484 0 c0.013018 -0.40364 0.019531 -0.69661 0.019531 -0.87891 l0 -0.097656 l-0.019531 0 z M1.8945 13.5449 l0 0.33203 l0.78125 0 l0 -0.33203 l-0.78125 0 z M6.7383 13.5449 l-0.068359 0.33203 l2.2266 0 c0.065107 -0.17578 0.097656 -0.28646 0.097656 -0.33203 l-2.2559 0 z M9.248 13.5449 l0 0.33203 l1.709 0 l0 -0.33203 l-1.709 0 z M5.5566 13.876999999999999 c0.11067 0.5013 0.18229 0.75195 0.21484 0.75195 l0.2832 0 l0 1.25 l0.44922 0 l0 -1.9336 l0.11719 0 l0 -0.068359 l-1.0645 0 z M11.904 16.7383 l1.416 0 l0 0.30273 l-1.416 0 l0 -0.30273 z M12.041 17.1582 l0.11719 -0.0000095367 l0 0.21484 l0.19531 0 l0 -0.16602 c0 -0.032549 0.016279 -0.048828 0.048828 -0.048828 l0.039063 0 c0.032549 0.0065136 0.048828 0.022793 0.048828 0.048838 l0 0.44922 c0 0.032549 -0.016279 0.048828 -0.048828 0.048828 l-0.087891 0 l0 -0.21484 l-0.19531 0 l0 0.21484 l-0.11719 0 l0 -0.54688 z M12.041 17.8711 l0.33203 -0.0000095367 c0.032549 0.0065136 0.048828 0.022793 0.048828 0.048838 l0 0.068359 l-0.26367 0 l0 0.097656 l0.21484 0 l0 0.11719 l-0.21484 0 l0 0.21484 l-0.11719 0 l0 -0.54688 z M12.07 18.584 l0.33202 0 c0.026045 0 0.039063 0.013018 0.039063 0.039063 l0 0.048828 l-0.25391 0.33203 l0.25391 0 l0 0.11719 l-0.40039 0 c-0.032549 0 -0.048828 -0.022783 -0.048828 -0.068359 c0.05208 -0.078125 0.13997 -0.19531 0.26367 -0.35156 l-0.23438 0 l0 -0.078125 c0.0065136 -0.026045 0.022793 -0.039063 0.048838 -0.039063 z M12.041 19.28708 l0.11719 -0.0000095367 l0 0.3125 l0.029297 0.11719 l0.11719 0 c0.032549 0 0.048828 -0.016279 0.048828 -0.048828 l0 -0.33203 c0 -0.032549 0.016279 -0.048828 0.048828 -0.048828 l0.039063 0 c0.032549 0.0065136 0.048828 0.022793 0.048828 0.048838 l0 0.2832 c0 0.14323 -0.071611 0.21484 -0.21484 0.21484 l-0.039063 0 c-0.091143 0 -0.15625 -0.039063 -0.19531 -0.11719 l0 -0.42969 z M0 19.6191 l2.5098 0 l0 0.21484 l-2.5098 0 l0 -0.21484 z"></path>
                </g>
            </svg>
            <svg width="130" height="50" viewBox="0 0 100 24" class="css-1j8o68f">
                <defs id="SvgjsDefs1001"></defs>
                <g id="SvgjsG1008" featurekey="pulpyG-0" fill="#E60B0B">
                <path d="M3.42 13.16 l0 6.84 l-2.82 0 l0 -14.5 l3.06 0 l1.58 6.12 l1.58 -6.12 l3.08 0 l0 14.5 l-2.82 0 l0 -6.84 l-1.84 5.8 z M16.54 20 l-3.06 0 l0 -3.68 l-2.78 -10.82 l3 0 l1.3 6.84 l1.32 -6.84 l3 0 l-2.78 10.82 l0 3.68 z M20.02 7.26 c0 -0.53334 0.14334 -0.96 0.43 -1.28 s0.71666 -0.48 1.29 -0.48 l4.14 0 l0.5 2.7 l-3.18 0 c-0.17334 0 -0.26 0.09334 -0.26 0.28 l0 8.6 c0 0.18666 0.08666 0.28 0.26 0.28 l1.32 0 l0 -5.72 l2.82 0 l0 8.36 l-5.06 0 c-0.84 0 -1.4267 -0.17334 -1.76 -0.52 s-0.5 -0.92 -0.5 -1.72 l0 -10.5 z M30.74 20 c-0.84 0 -1.4267 -0.17334 -1.76 -0.52 s-0.5 -0.92 -0.5 -1.72 l0 -12.26 l2.96 0 l0 11.64 c0 0.10666 0.01666 0.18666 0.05 0.24 s0.11 0.08 0.23 0.08 l1.02 0 c0.12 0 0.19666 -0.02666 0.23 -0.08 s0.05 -0.13334 0.05 -0.24 l0 -11.64 l2.96 0 l0 12.26 c0 0.8 -0.16666 1.3733 -0.5 1.72 s-0.92 0.52 -1.76 0.52 l-2.98 0 z M37.18 5.5 l2.76 0 l1.48 5.82 l0 -5.82 l2.98 0 l0 14.5 l-2.98 0 l-1.56 -6.06 l0 6.06 l-2.68 0 l0 -14.5 z M48.48 8.04 l0 5.7 l1.44 0 c0.12 0 0.19666 -0.02334 0.23 -0.07 s0.05 -0.12332 0.05 -0.22998 l0 -5.12 c0 -0.18666 -0.08666 -0.28 -0.26 -0.28 l-1.46 0 z M51.3 5.5 c0.57334 0 1.0033 0.15998 1.29 0.47998 s0.43 0.74666 0.43 1.28 l0 6.94 c0 0.28 -0.03 0.53666 -0.09 0.77 s-0.17 0.43668 -0.33 0.61002 s-0.37334 0.31 -0.64 0.41 s-0.6 0.15 -1 0.15 l-2.48 0 l0 3.86 l-2.88 0 l0 -14.5 l5.7 0 z M54.160000000000004 5.5 l2.98 0 l0 11.8 l2.92 0 l-0.5 2.7 l-5.4 0 l0 -14.5 z M63.84 18.2 l-0.26 1.8 l-2.92 0 l2.62 -14.5 l3.1 0 l2.62 14.5 l-2.92 0 l-0.26 -1.8 l-1.98 0 z M64.16 15.9 l1.34 0 l-0.66 -5.14 z M69.8 5.5 l2.98 0 l0 11.8 l2.92 0 l-0.5 2.7 l-5.4 0 l0 -14.5 z M76.6 5.5 l2.9 0 l0 14.5 l-2.9 0 l0 -14.5 z M81.41999999999999 20 l-0.51996 -2.7 l3.12 0 c0.22666 0 0.34 -0.1 0.34 -0.3 l0 -2.64 c0 -0.2 -0.04 -0.32 -0.12 -0.36 s-0.22 -0.06 -0.42 -0.06 l-1.5 0 c-0.21334 0 -0.41668 -0.01666 -0.61002 -0.05 s-0.36668 -0.11 -0.52002 -0.23 s-0.27334 -0.28666 -0.36 -0.5 s-0.13 -0.5 -0.13 -0.86 l0 -4.92 c0 -0.57334 0.15666 -1.03 0.47 -1.37 s0.81 -0.51 1.49 -0.51 l4 0 l0.5 2.7 l-3.28 0 c-0.24 0 -0.36 0.10666 -0.36 0.32 l0 2.64 c0 0.14666 0.03666 0.24666 0.11 0.3 s0.18334 0.08 0.33 0.08 l1.82 0 c0.46666 0 0.82332 0.11 1.07 0.33 s0.37 0.60334 0.37 1.15 l0 4.78 c0 0.8 -0.16334 1.3667 -0.49 1.7 s-0.90332 0.5 -1.73 0.5 l-3.58 0 z M93.94 5.5 l0.72 2.7 l-1.94 0 l0 11.8 l-2.96 0 l0 -11.8 l-1.94 0 l0.76 -2.7 l5.36 0 z"></path>
                </g>
            </svg>
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"> 
            <span class="navbar-toggler-icon"></span> 
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto mb-2 mb-lg-0">
                <li class="nav-item"> <a class="nav-link active" aria-current="page" href="top">TOP</a> </li>
                <li class="nav-item"> <a class="nav-link" href="modelKits">MODEL KITS</a> </li>
                <li class="nav-item"> <a class="nav-link" href="usuarios">USUARIOS</a> </li>
            </ul>
        </div>
        <div class="container h-100 searcher-container">
            <div class="d-flex justify-content-center h-100">
              <div class="searchbar">
                <input class="search_input" type="text" name="" placeholder="Search...">
                <a href="#" class="search_icon"><i class="fa fa-search"></i></a>
              </div>
            </div>
        </div>
        
        <div id="loginRegisterUserContainer">

        </div>

        <div class="modal" tabindex="-1" id="logoutModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Cerrar sesion</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick="hideLogoutModal()"></button>
                    </div>
                    <div class="modal-body">
                        <p>Esta seguro de que quiere cerrar sesion?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="hideLogoutModal()">Cancelar</button>
                        <button type="button" class="btn btn-danger" onclick="logout()">Cerrar sesion</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    getUsuarioLogueado()
}

function showLogoutModal() {
    document.getElementById("logoutModal").style.display = "block";
}
function hideLogoutModal() {
    document.getElementById("logoutModal").style.display = "none";
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
        usuarioLogueado = null;
        window.location.href = "home";
      });
}

function getUsuarioLogueado() {
    var settings = {
        "url": "api/getUsuarioLogueado",
        "method": "GET",
        "timeout": 0,
        "headers": {
        },
      };
      
      $.ajax(settings).done(function (response) {
        
        if (response == "false") {
            usuarioLogueado = null;
            document.getElementById("loginRegisterUserContainer").innerHTML = `<a id="loginRegisterButton" href="login" class="loginRegisterButton">LOGIN / REGISTER</a>`;
        }else{
            usuarioLogueado = response;
            var imgUsuario = "../../../mygunplalist/RecursosGenerales/img/genericProfile.webp";
            if(response["img_usuario"] != ""){
                imgUsuario = response["img_usuario"];
            }
            document.getElementById("loginRegisterUserContainer").innerHTML = `
            <a id="userPageButton" class="userPageButton"  onmouseover="userPageButtonHover()" onmouseleave="userPageButtonMouseLeave()">
                <img id="userPageButtonImg" class="img-thumbnail" src="${imgUsuario}" alt="" onclick="verPaginaUsuario()">
                <div class="divUsuarioLogout">
                    <p id="username" onclick="verPaginaUsuario()">${response["username"]}</p>
                    <i id="logoutBtn" onclick="showLogoutModal(event)" title="Cerrar Sesion" class="fa fa-sign-out tooltip-test" aria-hidden="true"></i>
                </div>
            </a>`;
        }
    });
}

function verPaginaUsuario(){
    window.location.href = "usuario?id=" + usuarioLogueado["id_usuario"];
}


function userPageButtonHover() {
    document.getElementById("userPageButtonImg").style.borderRadius = "100%";
    document.getElementById("userPageButtonImg").style.transform = "rotate(360deg)";
    document.getElementById("username").style.marginLeft = "5%";
}
function userPageButtonMouseLeave() {
    document.getElementById("userPageButtonImg").style.borderRadius = "";
    document.getElementById("userPageButtonImg").style.transform = "rotate(0deg)";
    document.getElementById("username").style.marginLeft = "10%";
}

function mostrarToast(color, texto){
    document.getElementById("toastCuadradoColor").style.fill = color;
    document.getElementById("toastTexto").innerHTML = texto;
    var toastLiveExample = document.getElementById('toast')
    var toast = new bootstrap.Toast(toastLiveExample);
    toast.show();
}

