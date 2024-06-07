import connection from "./connection";

export async function start() {
  try {
    await connection.start();
    await connection.invoke("GetBankStatus");
    console.log("SignalR Connected.");
  } catch (err) {
    console.log(err);
    setTimeout(start, 5000);
  }
}

connection.onclose(async () => {
  await start();
});

// Start the connection.
start();
