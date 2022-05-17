var rankingActual = "nota";

function toogleRanking() {
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
}