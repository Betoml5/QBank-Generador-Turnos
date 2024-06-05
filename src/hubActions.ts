import connection from "./connection";
import { Turno } from "./types";
import { getTimeMessage } from "./utils/time";
const button = document.getElementById("btn");
const $pTurno = document.querySelector("#turno");
const $tiempoEspera = document.querySelector("#tiempo");

button?.addEventListener("click", async () => {
  if ($pTurno) {
    try {
      $pTurno.textContent = "Cargando...";
      await connection.invoke("AddToQueue");
    } catch (err) {
      $pTurno.textContent = "Error al solicitar turno, intente nuevamente.";
    }
  }
});

connection.on("AddToQueue", (turno: Turno) => {
  console.log(turno);
  if ($pTurno && $tiempoEspera) {
    $pTurno.textContent = `Turno: ${turno.codigoTurno}`;
    $tiempoEspera.textContent = `Tiempo de espera: ${getTimeMessage(
      turno.tiempoEspera
    )} `;
  }
});
