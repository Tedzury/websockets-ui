import { httpServer } from "./src/http_server/index";
import { WebSocketServer } from "ws";
import socketHandler from "./src/controllers/socketHandler";

const HTTP_PORT = 8181;
const WSS_Port = 3000;

httpServer.listen(HTTP_PORT);
const socketServer = new WebSocketServer({port: WSS_Port, clientTracking: true});
console.log(`Start static http server on the ${HTTP_PORT} port!`);
console.log(`Web socket server was started at ${WSS_Port} port!`)

socketServer.on('connection', socketHandler);

process.on('SIGINT', () => {
	httpServer.close(() => {
		console.log(`Static server at ${HTTP_PORT} port have ended its work!`);
	});
	socketServer.close(() => {
		console.log(`Web socket server at ${WSS_Port} port have ended its work!`)
	});
});
