import { httpServer } from "./src/http_server/index";
import { WebSocketServer } from "ws";

const HTTP_PORT = 8181;

const clients = [];

const ws = new WebSocketServer({
  server: httpServer
});

ws.on("request", (request) => {
  const connection = request.accept('', request.origin);
  clients.push(connection);
  console.log(`Connected: ${connection.remoteAddress}`);
});


console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
