"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getCells = (direction, x, y, length) => {
    const cells = [];
    const isVertical = direction;
    if (isVertical) {
        for (let i = 0; i < length; i++) {
            cells.push([x, y + i]);
        }
    }
    else {
        for (let i = 0; i < length; i++) {
            cells.push([x + i, y]);
        }
    }
    return cells;
};
const getShipCells = (direction, x, y, length) => {
    const surroundingCells = [];
    const shipCells = getCells(direction, x, y, length);
    const isVertical = direction;
    let lines;
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
    lines.forEach((line) => surroundingCells.push(...getCells(direction, line.x, line.y, line.length)));
    const filtered = surroundingCells
        .filter((coord) => coord[0] >= 0 && coord[0] <= 9 && coord[1] >= 0 && coord[1] <= 9)
        .filter((cell) => !shipCells.some((shipCell) => cell[0] === shipCell[0] && cell[1] === shipCell[1]));
    return { shipCells, surroundingCells: filtered };
};
exports.default = getShipCells;
//# sourceMappingURL=getShipCells.js.map