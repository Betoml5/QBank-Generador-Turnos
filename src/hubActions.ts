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

connection.on("GetBankStatus", (status: number) => {
  if (status === 0) {
    if ($pTurno && $tiempoEspera) {
      $pTurno.textContent = "El banco está cerrado. Te esperamos mañana :)";
      $tiempoEspera.textContent = "";
    }
    if (button) {
      button.textContent = "El banco está cerrado";
      button?.setAttribute("disabled", "true");
    }
  }
});
connection.on("SetBankStatus", (status: number) => {
  console.log("El nuevo estatus del banco es: ", status);
  if (status === 0) {
    if ($pTurno && $tiempoEspera) {
      $pTurno.textContent = "El banco está cerrado. Te esperamos mañana :)";
      $tiempoEspera.textContent = "";
    }
    if (button) {
      button.textContent = "El banco está cerrado";
      button?.setAttribute("disabled", "true");
    }
  } else {
    if (button && $pTurno) {
      $pTurno.textContent = "";
      button.textContent = "Generar turno virutal";
      button?.removeAttribute("disabled");
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
