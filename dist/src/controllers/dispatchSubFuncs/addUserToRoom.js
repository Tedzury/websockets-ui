"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants/constants");
const messageWrapper_1 = __importDefault(require("../../helpers/messageWrapper"));
const validateJson_1 = __importDefault(require("../../helpers/validateJson"));
const addUserToRoom = (_data, _socket, _currPlayer, playersList, roomList) => {
    const currPlayer = _currPlayer.getPlayer();
    const { indexRoom } = (0, validateJson_1.default)(_data);
    if (currPlayer._room_id === indexRoom) {
        _socket.send((0, messageWrapper_1.default)(constants_1.MSG_TYPES.ERR, { message: constants_1.ERROR_MSGS.OWN_ROOM }));
        return console.log(constants_1.ERROR_MSGS.OWN_ROOM);
    }
    if (currPlayer._room_id) {
        _socket.send((0, messageWrapper_1.default)(constants_1.MSG_TYPES.ERR, { message: constants_1.ERROR_MSGS.ALREADY_IN_ROOM }));
        return console.log(constants_1.ERROR_MSGS.ALREADY_IN_ROOM);
    }
    const desiredRoom = roomList.getRoomById(indexRoom);
    currPlayer.addRoom(indexRoom);
    desiredRoom.addPlayer(currPlayer);
    roomList.informPlayers();
    const enemyId = desiredRoom._roomPlayers[0]._id;
    const enemyPlayer = playersList.getPlayerById(enemyId);
    currPlayer._socket.send((0, messageWrapper_1.default)(constants_1.MSG_TYPES.CREATE_GAME, {
        idGame: indexRoom,
        idPlayer: enemyId,
    }));
    enemyPlayer._socket.send((0, messageWrapper_1.default)(constants_1.MSG_TYPES.CREATE_GAME, {
        idGame: indexRoom,
        idPlayer: currPlayer._id,
    }));
};
exports.default = addUserToRoom;
//# sourceMappingURL=addUserToRoom.js.map