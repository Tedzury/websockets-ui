"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants/constants");
const player_1 = __importDefault(require("../../entities/player"));
const messageWrapper_1 = __importDefault(require("../../helpers/messageWrapper"));
const validateJson_1 = __importDefault(require("../../helpers/validateJson"));
const reg = (_data, _socket, _currPlayer, playersList, roomList) => {
    const { name, password } = (0, validateJson_1.default)(_data);
    const isActive = playersList.checkActivePlayer(name);
    if (isActive) {
        _socket.send((0, messageWrapper_1.default)(constants_1.MSG_TYPES.ERR, { message: constants_1.ERROR_MSGS.PLAYER_ALREADY_ACTIVE }));
        return console.log(constants_1.ERROR_MSGS.PLAYER_ALREADY_ACTIVE);
    }
    const newPlayer = new player_1.default(name, password, _socket);
    _currPlayer.setPlayer(newPlayer);
    playersList.addPlayer(newPlayer);
    _socket.send((0, messageWrapper_1.default)(constants_1.MSG_TYPES.REG, newPlayer.getPlayerInfo()));
    _socket.send((0, messageWrapper_1.default)(constants_1.MSG_TYPES.UPDATE_ROOM, roomList.getAvailableRooms()));
    _socket.send((0, messageWrapper_1.default)(constants_1.MSG_TYPES.UPDATE_WINNNERS, playersList.getUpdateWinnersData()));
};
exports.default = reg;
//# sourceMappingURL=reg.js.map