"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlayersList {
    _list;
    constructor() {
        this._list = [];
    }
    checkActivePlayer(_name) {
        return this._list.find((player) => player.getPlayerName() === _name);
    }
    addPlayer(_player) {
        this._list.push(_player);
    }
    removePlayer(_player_id) {
        this._list = this._list.filter((player) => player._id !== _player_id);
    }
    getPlayerById(_player_id) {
        return this._list.find((player) => player._id === _player_id);
    }
    getUpdateWinnersData() {
        return this._list.map((player) => player.getWinsData()).filter((winner) => winner.wins > 0);
    }
}
exports.default = PlayersList;
//# sourceMappingURL=playerList.js.map