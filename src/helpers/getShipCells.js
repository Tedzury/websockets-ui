"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getCells = function (direction, x, y, length) {
    var cells = [];
    var isVertical = direction;
    if (isVertical) {
        for (var i = 0; i < length; i++) {
            cells.push([x, y + i]);
        }
    }
    else {
        for (var i = 0; i < length; i++) {
            cells.push([x + i, y]);
        }
    }
    return cells;
};
var getShipCells = function (direction, x, y, length) {
    var surroundingCells = [];
    var shipCells = getCells(direction, x, y, length);
    var isVertical = direction;
    var lines;
    if (isVertical) {
        lines = [
            { x: x - 1, y: y - 1, length: length + 2 },
            { x: x, y: y - 1, length: length + 2 },
            { x: x + 1, y: y - 1, length: length + 2 },
        ];
    }
    else {
        lines = [
            { x: x - 1, y: y - 1, length: length + 2 },
            { x: x - 1, y: y, length: length + 2 },
            { x: x - 1, y: y + 1, length: length + 2 },
        ];
    }
    lines.forEach(function (line) { return surroundingCells.push.apply(surroundingCells, getCells(direction, line.x, line.y, line.length)); });
    var filtered = surroundingCells
        .filter(function (coord) { return coord[0] >= 0 && coord[0] <= 9 && coord[1] >= 0 && coord[1] <= 9; })
        .filter(function (cell) { return !shipCells.some(function (shipCell) { return cell[0] === shipCell[0] && cell[1] === shipCell[1]; }); });
    return { shipCells: shipCells, surroundingCells: filtered };
};
exports.default = getShipCells;
