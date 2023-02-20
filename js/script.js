const tiempo = document.getElementById("txtTiempo");
const btnIniciar = document.getElementById("btnIniciar");
const btnDetener = document.getElementById("btnDetener");
const btnReiniciar = document.getElementById("btnReiniciar");
const txtEstado = document.getElementById("txtEstado");
const imgCronometro = document.getElementById("imgCronometro");
const icono = document.getElementById("icono");
const btnIntervalo = document.getElementById("btnIntervalo");
const btnLimpiarInter = document.getElementById("btnLimpiar");
const tabla = document.getElementById("tablaIntervalos");

var contar = false;
var estado = "no contando";
var hr = 0;
var min = 0;
var seg = 0;
var dc = 0;

var txtTiempo = "00:00:00.0";
var intervalo;

var hrTxt = "0" + hr;
var minTxt = "0" + min;
var segTxt = "0" + seg;

var numeroIntervalos = 0;
var ultimoIntervalo = 0;

btnIniciar.addEventListener("click", () => {
    iniciar();
});

btnDetener.addEventListener("click", () => {
    detener();
});

btnReiniciar.addEventListener("click", () => {
    reiniciar();
});

btnIntervalo.addEventListener("click", () => {
    hacerIntervalo();
});

btnLimpiarInter.addEventListener("click", () => {
    limpiarIntervalos();
})

function iniciar() {
    contar = true;
    if (estado == "no contando") {
        iniciarCuenta();
        if (tiempo.innerHTML != "00:00:00.0") {
            txtEstado.innerHTML = "El cronómetro se ha reanudado.";
        } else {
            txtEstado.innerHTML = "El cronómetro se ha iniciado.";
        }
        icono.href = "./img/corriendo.png";
        imgCronometro.src = "./img/iniciado.svg";
    } else {
        txtEstado.innerHTML = "El cronómetro ya se encuentra corriendo.";
        imgCronometro.src = "./img/corriendo.svg";
    }
}

function detener() {
    if (tiempo.innerHTML != "00:00:00.0") {
        btnIniciar.innerHTML = "Reanudar";
        txtEstado.innerHTML = "El cronómetro se ha detenido.";
        imgCronometro.src = "./img/detenido.svg";
        icono.href = "./img/detenido.png";
        contar = false;
        clearInterval(intervalo);
        estado = "no contando";
    } else {
        txtEstado.innerHTML = "El cronómetro no se ha iniciado.";
        imgCronometro.src = "./img/sin iniciar.svg";
        icono.href = "./img/sin iniciar.png";
    }
}

function reiniciar() {
    if (tiempo.innerHTML != "00:00:00.0") {
        txtEstado.innerHTML = "El cronómetro se ha reiniciado.";
        imgCronometro.src = "./img/reinicio.svg";
        icono.href = "./img/reinicio.png";
        contar = false;
        reiniciarCuenta();
        clearInterval(intervalo);
        estado = "no contando";
    } else {
        txtEstado.innerHTML = "El cronómetro no se ha iniciado.";
        imgCronometro.src = "./img/sin iniciar.svg";
        icono.href = "./img/sin iniciar.png";
    }
}

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
            txtTiempo = hrTxt + ":" + minTxt + ":" + segTxt + "." + dc;
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

    btnIniciar.innerHTML = "Iniciar";
}

function hacerIntervalo() {
    if (tiempo.innerHTML == "00:00:00.0"){
        txtEstado.innerHTML = "Intervalo no creado. Cronómetro sin iniciar.";
        imgCronometro.src = "./img/intervalo no creado.svg";
    } else {
        numeroIntervalos++;
        let horaActual = (hr * 36000) + (min * 600) + (seg * 10) + dc;
        let cambio = horaActual - ultimoIntervalo;

        if (cambio == 0) {
            txtEstado.innerHTML = "Intervalo no creado. El intervalo es igual al anterior.";
            imgCronometro.src = "./img/intervalo igual.svg";
        } else {
            let cambioHr = Math.trunc(cambio/36000);
            if (cambioHr < 10) {
                cambioHr = "0" + cambioHr;
            }

            let cambioMin = Math.trunc((cambio/600) - (cambioHr*60));
            if (cambioMin < 10) {
                cambioMin = "0" + cambioMin;
            }

            let cambioSeg = Math.trunc((cambio/10) - (cambioHr*3600) - (cambioMin*60));
            if (cambioSeg < 10) {
                cambioSeg = "0" + cambioSeg;
                }

            let cambioDc = Math.trunc(cambio - (cambioHr*3600) - (cambioMin*600) - (cambioSeg*10));

            let txtCambio = "+" + cambioHr + ":" + cambioMin + ":" + cambioSeg + "." +cambioDc;

            let inter =
                "<tr><td>" + numeroIntervalos + "</td><td>" +
                txtCambio + "</td><td>" + txtTiempo + "</td></tr>";
            ultimoIntervalo = horaActual;

            let fila = document.createElement("TR");
            fila.innerHTML = inter;
            tabla.appendChild(fila);

            imgCronometro.src = "./img/intervalo creado.svg";
            txtEstado.innerHTML = "Intervalo creado.";
        }   
    }  
}

function limpiarIntervalos() {
    let intervalos = document.querySelectorAll("table > tr");

    if (intervalos.length == 0){
        txtEstado.innerHTML = "Intervalos no eliminados. No hay intervalos.";
        imgCronometro.src = "./img/intervalo no creado.svg";
    } else {
        for (i = 0; i < intervalos.length; i++) {           
            intervalos[i].parentNode.removeChild(intervalos[i]);
        }

        numeroIntervalos = 0;
        ultimoIntervalo = 0;

        imgCronometro.src = "./img/intervalos eliminados.svg";
        txtEstado.innerHTML = "Intervalos eliminados.";
    }
}
