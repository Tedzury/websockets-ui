"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getShipCells_1 = __importDefault(require("./src/helpers/getShipCells"));
const constants_1 = require("./src/constants/constants");
class ShipsList {
    _shipList;
    _lastKilledSurrCells;
    constructor(shipsArr) {
        this._shipList = shipsArr.map((shipObj) => new Ship(shipObj, this));
    }
    checkShipHit(x, y) {
        return this._shipList.reduce((status, ship) => {
            if (status === constants_1.ATTACK_STATUS.KILLED || status === constants_1.ATTACK_STATUS.SHOT)
                return status;
            return ship.checkHit([x, y]);
        }, '');
    }
}
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
const shipList = [
    { position: { x: 2, y: 4 }, direction: false, type: 'large', length: 3 },
    { position: { x: 4, y: 2 }, direction: false, type: 'large', length: 3 },
    { position: { x: 3, y: 6 }, direction: false, type: 'huge', length: 4 },
    { position: { x: 1, y: 8 }, direction: false, type: 'medium', length: 2 },
    { position: { x: 6, y: 8 }, direction: false, type: 'medium', length: 2 },
    { position: { x: 8, y: 4 }, direction: false, type: 'medium', length: 2 },
    { position: { x: 0, y: 0 }, direction: false, type: 'small', length: 1 },
    { position: { x: 2, y: 0 }, direction: false, type: 'small', length: 1 },
    { position: { x: 5, y: 0 }, direction: false, type: 'small', length: 1 },
    { position: { x: 9, y: 0 }, direction: false, type: 'small', length: 1 },
];
const myList = new ShipsList(shipList);
console.log(myList._shipList[0]._shipCells);
console.log(myList._shipList[0]._surroundingCells);
//# sourceMappingURL=test.js.map