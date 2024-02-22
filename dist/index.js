"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./src/http_server/index");
const ws_1 = require("ws");
const socketHandler_1 = __importDefault(require("./src/controllers/socketHandler"));
const HTTP_PORT = 8181;
const WSS_Port = 3000;
index_1.httpServer.listen(HTTP_PORT);
const socketServer = new ws_1.WebSocketServer({ port: WSS_Port, clientTracking: true });
console.log(`Start static http server on the ${HTTP_PORT} port!`);
console.log(`Web socket server was started at ${WSS_Port} port!`);
socketServer.on('connection', socketHandler_1.default);
process.on('SIGINT', () => {
    index_1.httpServer.close(() => {
        console.log(`Static server at ${HTTP_PORT} port have ended its work!`);
    });
    socketServer.close(() => {
        console.log(`Web socket server at ${WSS_Port} port have ended its work!`);
    });
});
//# sourceMappingURL=index.js.map