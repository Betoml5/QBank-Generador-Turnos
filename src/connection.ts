import { HttpTransportType, HubConnectionBuilder } from "@microsoft/signalr";
const url = "https://qbank.websitos256.com/turno";
// const urlLocal = "https://localhost:5002/turno";

const connection = new HubConnectionBuilder()
  .withUrl(url, {
    skipNegotiation: true,
    transport: HttpTransportType.WebSockets,
  })
  .withAutomaticReconnect()
  .build();

// Start the connection.

export default connection;
