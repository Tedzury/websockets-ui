"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getShipCells_1 = require("./src/helpers/getShipCells");
var constants_1 = require("./src/constants/constants");
var ShipsList = /** @class */ (function () {
    function ShipsList(shipsArr) {
        var _this = this;
        this._shipList = shipsArr.map(function (shipObj) { return new Ship(shipObj, _this); });
    }
    ShipsList.prototype.checkShipHit = function (x, y) {
        return this._shipList.reduce(function (status, ship) {
            if (status === constants_1.ATTACK_STATUS.KILLED || status === constants_1.ATTACK_STATUS.SHOT)
                return status;
            return ship.checkHit([x, y]);
        }, '');
    };
    return ShipsList;
}());
var Ship = /** @class */ (function () {
    function Ship(shipObj, shipsList) {
        var direction = shipObj.direction, position = shipObj.position, length = shipObj.length;
        var _a = (0, getShipCells_1.default)(direction, position.x, position.y, length), shipCells = _a.shipCells, surroundingCells = _a.surroundingCells;
        this._shipCells = shipCells;
        this._surroundingCells = surroundingCells;
        this._health_points = length;
        this._shipsList = shipsList;
    }
    Ship.prototype.checkHit = function (hitCoord) {
        var isHit = this._shipCells.some(function (coord) { return hitCoord[0] === coord[0] && hitCoord[1] === coord[1]; });
        if (isHit) {
            this._health_points -= 1;
            return this.checkAlive();
        }
        return constants_1.ATTACK_STATUS.MISS;
    };
    Ship.prototype.checkAlive = function () {
        if (this._health_points === 0) {
            this.sendSurroundingCells();
            return constants_1.ATTACK_STATUS.KILLED;
        }
        return constants_1.ATTACK_STATUS.SHOT;
    };
    Ship.prototype.sendSurroundingCells = function () {
        this._shipsList._lastKilledSurrCells = this._surroundingCells;
    };
    return Ship;
}());
exports.default = Ship;
var shipList = [
    { position: { x: 2, y: 4 }, direction: false, type: 'large', length: 3 },
    { position: { x: 4, y: 2 }, direction: false, type: 'large', length: 3 },
    { position: { x: 3, y: 6 }, direction: true, type: 'huge', length: 4 },
    { position: { x: 1, y: 8 }, direction: false, type: 'medium', length: 2 },
    { position: { x: 6, y: 8 }, direction: false, type: 'medium', length: 2 },
    { position: { x: 8, y: 4 }, direction: false, type: 'medium', length: 2 },
    { position: { x: 0, y: 0 }, direction: false, type: 'small', length: 1 },
    { position: { x: 2, y: 0 }, direction: false, type: 'small', length: 1 },
    { position: { x: 5, y: 0 }, direction: false, type: 'small', length: 1 },
    { position: { x: 9, y: 0 }, direction: false, type: 'small', length: 1 },
];
var myList = new ShipsList(shipList);
console.log(myList._shipList[0]._shipCells);
console.log(myList._shipList[0]._surroundingCells);
console.log(myList.checkShipHit(3, 5));
console.log(myList.checkShipHit(3, 6));
console.log(myList.checkShipHit(3, 7));
console.log(myList.checkShipHit(3, 8));
console.log(myList.checkShipHit(3, 9));
