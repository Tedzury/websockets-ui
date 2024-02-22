"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const room_1 = __importDefault(require("./room"));
const messageWrapper_1 = __importDefault(require("../helpers/messageWrapper"));
const constants_1 = require("../constants/constants");
class RoomList {
    _roomList;
    _playersList;
    constructor(playersList) {
        this._roomList = [];
        this._playersList = playersList;
    }
    informPlayers() {
        this._playersList._list.forEach((player) => {
            player._socket.send((0, messageWrapper_1.default)(constants_1.MSG_TYPES.UPDATE_ROOM, this.getAvailableRooms()));
        });
    }
    getRoomById(roomId) {
        return this._roomList.find((room) => room.getRoomId() === roomId);
    }
    createRoom(roomUser) {
        const newRoom = new room_1.default();
        newRoom.addPlayer(roomUser);
        this._roomList.push(newRoom);
        return newRoom.getRoomId();
    }
    deleteRoom(roomId) {
        this._roomList = this._roomList.filter((room) => room._roomId !== roomId);
    }
    getAvailableRooms() {
        return this._roomList.filter((room) => room.isRoomAvailable()).map((room) => room.getRoomInfo());
    }
}
exports.default = RoomList;
//# sourceMappingURL=roomList.js.map