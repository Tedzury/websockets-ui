"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ship_1 = __importDefault(require("./ship"));
class ShipsList {
    _shipList;
    _lastKilledSurrCells;
    constructor(shipsArr) {
        this._shipList = shipsArr.map((shipObj) => new ship_1.default(shipObj, this));
    }
    checkShipHit(x, y) {
    }
}
exports.default = ShipsList;
//# sourceMappingURL=shipsList.js.map