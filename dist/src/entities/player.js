"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
class Player {
    _name;
    _password;
    _error;
    _errorText;
    _socket;
    _id;
    _wins;
    _room_id;
    _shipsSchema;
    _game;
    _field;
    _shipsList;
    constructor(name, password, socket) {
        this._name = name;
        this._password = password;
        this._socket = socket;
        this._id = (0, crypto_1.randomUUID)();
        this._error = false;
        this._errorText = '';
        this._wins = 0;
        this._room_id = '';
    }
    getPlayerInfo() {
        return {
            name: this._name,
            index: this._id,
            error: this._error,
            errorText: this._errorText,
        };
    }
    getPlayerName() {
        return this._name;
    }
    addRoom(roomId) {
        this._room_id = roomId;
    }
    removeRoom() {
        this._room_id = '';
    }
    getPlayerRequisites() {
        return { name: this._name, index: this._id };
    }
    getWinsData() {
        return {
            name: this._name,
            wins: this._wins,
        };
    }
}
exports.default = Player;
//# sourceMappingURL=player.js.map