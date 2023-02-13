const tiempo = document.getElementById("txtTiempo");
const btnIniciar = document.getElementById("btnIniciar");
const btnDetener = document.getElementById("btnDetener");
const btnReiniciar = document.getElementById("btnReiniciar");
const txtEstado = document.getElementById("txtEstado");
const imgCronometro = document.getElementById("imgCronometro");

var contar = false;
var estado = "no contando";
var hr = 0;
var min = 0;
var seg = 0;
var dc = 0;

var intervalo;

var hrTxt = "0" + hr;
var minTxt = "0" + min;
var segTxt = "0" + seg;

btnIniciar.addEventListener("click", () => {
    contar = true;
    if (estado == "no contando") {
        iniciarCuenta();
        txtEstado.innerHTML = "El cronómetro se ha iniciado";
        imgCronometro.src = "./img/iniciado.svg";
    } else {
        txtEstado.innerHTML = "El cronómetro ya se encuentra corriendo"
        imgCronometro.src = "./img/corriendo.svg"
    }
});

btnDetener.addEventListener("click", () => {
    txtEstado.innerHTML = "El cronómetro se ha detenido";
    imgCronometro.src = "./img/detenido.svg";
    contar = false;
    clearInterval(intervalo);
    estado = "no contando";
});

btnReiniciar.addEventListener("click", () => {
    txtEstado.innerHTML = "El cronómetro se ha reiniciado"
    imgCronometro.src = "./img/reinicio.svg"
    contar = false;
    reiniciarCuenta();
    clearInterval(intervalo);
    estado = "no contando";
});

function iniciarCuenta() {
    estado = "contado";
    intervalo = setInterval(() => {
        if (contar) {
            dc++;
            if (dc == 10) {
                dc = 0;
                seg++;
                if (seg == 60) {
                    seg = 0;
                    min++;
                    if (min == 60) {
                        min = 0;
                        hr++;
                        hrTxt = hr;
                        if (hr < 10) {
                            hrTxt = "0" + hrTxt;
                        }
                    }
                    minTxt = min;
                    if (min < 10) {
                        minTxt = "0" + minTxt;
                    }
                }
                segTxt = seg;
                if (seg < 10) {
                    segTxt = "0" + segTxt;
                }
            }
            let txtTiempo = hrTxt + ":" + minTxt + ":" + segTxt + "." + dc;
            tiempo.innerHTML = txtTiempo;
        }
    }, 100);
}

function reiniciarCuenta() {
    hr = 0;
    min = 0;
    seg = 0;
    dc = 0;

    hrTxt = "00";
    minTxt = "00";
    segTxt = "00";
    dcTxt = "0";

    tiempo.innerHTML = "00:00:00.0";
}
