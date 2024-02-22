"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants/constants");
const messageWrapper_1 = __importDefault(require("../../helpers/messageWrapper"));
const createRoom = (_socket, _currPlayer, roomList) => {
    const currPlayer = _currPlayer.getPlayer();
    if (currPlayer._room_id) {
        _socket.send((0, messageWrapper_1.default)(constants_1.MSG_TYPES.ERR, { message: constants_1.ERROR_MSGS.ALREADY_IN_ROOM }));
        return console.log(constants_1.ERROR_MSGS.ALREADY_IN_ROOM);
    }
    const roomId = roomList.createRoom(currPlayer);
    currPlayer.addRoom(roomId);
    roomList.informPlayers();
};
exports.default = createRoom;
//# sourceMappingURL=createRoom.js.map