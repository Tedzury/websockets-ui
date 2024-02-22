"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const game_1 = __importDefault(require("./game"));
class Room {
    _roomId;
    _roomPlayers;
    _playersReady;
    constructor() {
        this._roomId = (0, crypto_1.randomUUID)();
        this._roomPlayers = [];
        this._playersReady = 0;
    }
    getRoomId() {
        return this._roomId;
    }
    getRoomInfo() {
        return {
            roomId: this._roomId,
            roomUsers: this._roomPlayers.map((player) => ({ name: player._name, index: player._id })),
        };
    }
    addPlayer(_player) {
        this._roomPlayers.push(_player);
    }
    isRoomAvailable() {
        return this._roomPlayers.length < 2;
    }
    setShipsSent() {
        this._playersReady += 1;
        if (this._playersReady === 2) {
            this.startGame();
        }
    }
    startGame() {
        new game_1.default(this._roomPlayers);
    }
}
exports.default = Room;
//# sourceMappingURL=room.js.map