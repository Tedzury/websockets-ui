"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateJson_1 = __importDefault(require("../helpers/validateJson"));
const constants_1 = require("../constants/constants");
const playerList_1 = __importDefault(require("../entities/playerList"));
const roomList_1 = __importDefault(require("../entities/roomList"));
const currentPlayer_1 = __importDefault(require("../entities/currentPlayer"));
const gameDispatcher_1 = __importDefault(require("./gameDispatcher"));
const playersList = new playerList_1.default();
const roomList = new roomList_1.default(playersList);
const socketHandler = (socket) => {
    const currPlayer = new currentPlayer_1.default();
    const dispatcher = (0, gameDispatcher_1.default)(playersList, roomList);
    socket.onmessage = (msg) => {
        const validJson = (0, validateJson_1.default)(msg.data);
        const { type, data } = validJson;
        if (Object.hasOwn(dispatcher, type)) {
            dispatcher[type](data, socket, currPlayer);
        }
        else {
            return console.log(constants_1.ERROR_MSGS.UNEXPENTED_ERR);
        }
    };
    socket.onclose = () => {
        const currentPlayer = currPlayer.getPlayer();
        if (currentPlayer) {
            playersList.removePlayer(currentPlayer._id);
            if (currentPlayer._room_id) {
                roomList.deleteRoom(currentPlayer._room_id);
                currentPlayer.removeRoom();
                roomList.informPlayers();
            }
        }
    };
};
exports.default = socketHandler;
//# sourceMappingURL=socketHandler.js.map