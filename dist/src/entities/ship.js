"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getShipCells_1 = __importDefault(require("../helpers/getShipCells"));
const constants_1 = require("../constants/constants");
class Ship {
    _shipCells;
    _surroundingCells;
    _health_points;
    _shipsList;
    constructor(shipObj, shipsList) {
        const { direction, position, length } = shipObj;
        const { shipCells, surroundingCells } = (0, getShipCells_1.default)(direction, position.x, position.y, length);
        this._shipCells = shipCells;
        this._surroundingCells = surroundingCells;
        this._health_points = length;
        this._shipsList = shipsList;
    }
    checkHit(hitCoord) {
        const isHit = this._shipCells.some((coord) => hitCoord[0] === coord[0] && hitCoord[1] === coord[1]);
        if (isHit) {
            this._health_points -= 1;
            return this.checkAlive();
        }
        return constants_1.ATTACK_STATUS.MISS;
    }
    checkAlive() {
        if (this._health_points === 0) {
            this.sendSurroundingCells();
            return constants_1.ATTACK_STATUS.KILLED;
        }
        return constants_1.ATTACK_STATUS.SHOT;
    }
    sendSurroundingCells() {
        this._shipsList._lastKilledSurrCells = this._surroundingCells;
    }
}
exports.default = Ship;
//# sourceMappingURL=ship.js.map