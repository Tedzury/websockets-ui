"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants/constants");
const messageWrapper_1 = __importDefault(require("../helpers/messageWrapper"));
const shipsList_1 = __importDefault(require("./shipsList"));
const crypto_1 = require("crypto");
const prepareField = () => {
    const field = new Array(10)
        .fill('row')
        .map(() => new Array(10).fill('column').map(() => ({ isShot: false })));
    return field;
};
class Game {
    _players;
    _gameId;
    _currPlayer;
    constructor(players) {
        this._currPlayer = 0;
        this._players = players;
        this._gameId = (0, crypto_1.randomUUID)();
        this._players.forEach((player) => {
            player._game = this;
            player._field = prepareField();
            const data = {
                ships: player._shipsSchema,
                currentPlayerIndex: this._players[0]._id,
            };
            player._shipsList = new shipsList_1.default(player._shipsSchema);
            player._socket.send((0, messageWrapper_1.default)(constants_1.MSG_TYPES.START_GAME, data));
            player._socket.send((0, messageWrapper_1.default)(constants_1.MSG_TYPES.TURN, { currentPlayer: this._players[0]._id }));
        });
    }
    attack(indexPlayer, x, y) {
        const sender = this._players.find((player) => player._id === indexPlayer);
        const opponent = this._players.find((player) => player._id !== indexPlayer);
        if (sender._id !== this._players[this._currPlayer]._id) {
            sender._socket.send((0, messageWrapper_1.default)(constants_1.MSG_TYPES.ERR, { message: constants_1.ERROR_MSGS.OPPONENTS_TURN }));
            return console.log(constants_1.ERROR_MSGS.OPPONENTS_TURN);
        }
        if (opponent._field[x][y].isShot === true) {
            this._players.forEach((player) => player._socket.send((0, messageWrapper_1.default)(constants_1.MSG_TYPES.ATTACK, {
                position: { x, y },
                currentPlayer: sender._id,
                status: constants_1.ATTACK_STATUS.MISS,
            })));
            this.passTurn();
            return;
        }
        opponent._field[x][y].isShot = true;
        const hitStatus = opponent._shipsList.checkShipHit(x, y);
        if (hitStatus === constants_1.ATTACK_STATUS.MISS) {
            this._players.forEach((player) => player._socket.send((0, messageWrapper_1.default)(constants_1.MSG_TYPES.ATTACK, {
                position: { x, y },
                currentPlayer: sender._id,
                status: constants_1.ATTACK_STATUS.MISS,
            })));
            return this.passTurn();
        }
        if (hitStatus === constants_1.ATTACK_STATUS.SHOT) {
            this._players.forEach((player) => player._socket.send((0, messageWrapper_1.default)(constants_1.MSG_TYPES.ATTACK, {
                position: { x, y },
                currentPlayer: sender._id,
                status: constants_1.ATTACK_STATUS.SHOT,
            })));
            return this.passTurn();
        }
    }
    passTurn() {
        if (this._currPlayer === 0) {
            this._currPlayer = 1;
        }
        else {
            this._currPlayer = 0;
        }
        this._players.forEach((player) => {
            player._socket.send((0, messageWrapper_1.default)(constants_1.MSG_TYPES.TURN, { currentPlayer: this._players[this._currPlayer]._id }));
        });
    }
}
exports.default = Game;
//# sourceMappingURL=game.js.map