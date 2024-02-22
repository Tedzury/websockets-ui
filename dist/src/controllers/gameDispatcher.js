"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reg_1 = __importDefault(require("./dispatchSubFuncs/reg"));
const createRoom_1 = __importDefault(require("./dispatchSubFuncs/createRoom"));
const addUserToRoom_1 = __importDefault(require("./dispatchSubFuncs/addUserToRoom"));
const validateJson_1 = __importDefault(require("../helpers/validateJson"));
const gameDispatcher = (playersList, roomList) => {
    return {
        reg: (_data, _socket, _currPlayer) => {
            (0, reg_1.default)(_data, _socket, _currPlayer, playersList, roomList);
        },
        create_room: (_, _socket, _currPlayer) => {
            (0, createRoom_1.default)(_socket, _currPlayer, roomList);
        },
        add_user_to_room: (_data, _socket, _currPlayer) => {
            (0, addUserToRoom_1.default)(_data, _socket, _currPlayer, playersList, roomList);
        },
        add_ships: (_data, _socket, _currPlayer) => {
            const currPlayer = _currPlayer.getPlayer();
            const { ships } = (0, validateJson_1.default)(_data);
            currPlayer._shipsSchema = ships;
            const playerRoom = roomList.getRoomById(currPlayer._room_id);
            playerRoom.setShipsSent();
        },
        attack: (_data, _socket, _currPlayer) => {
            const currPlayer = _currPlayer.getPlayer();
            const { indexPlayer, x, y } = (0, validateJson_1.default)(_data);
            currPlayer._game.attack(indexPlayer, x, y);
        },
    };
};
exports.default = gameDispatcher;
//# sourceMappingURL=gameDispatcher.js.map