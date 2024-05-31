import connection from "./connection";
import { Turno } from "./types";
const button = document.getElementById("btn");
const $pTurno = document.querySelector("#turno");
const $pCaja = document.querySelector("#caja");
const $tiempoEspera = document.querySelector("#tiempo");

button?.addEventListener("click", async () => {
  if ($pTurno && $pCaja) {
    try {
      $pTurno.textContent = "Cargando...";
      await connection.invoke("AddToQueue");
    } catch (err) {
      $pTurno.textContent = "Error al solicitar turno, intente nuevamente.";
    }
  }
});

connection.on("AddToQueue", (turno: Turno) => {
  if ($pTurno && $pCaja && $tiempoEspera) {
    $pTurno.textContent = `Turno: ${turno.codigoTurno}`;
    $pCaja.textContent = `Caja: ${turno.caja}`;
    $tiempoEspera.textContent = `Tiempo de espera: ${turno.tiempoEspera} minutos`;
  }
});
