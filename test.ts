import { ShipObjType, CoordTuple } from './src/constants/types';
import getShipCells from './src/helpers/getShipCells';
import { ATTACK_STATUS } from './src/constants/constants';

class ShipsList {
	_shipList: Ship[];
	_lastKilledSurrCells?: CoordTuple[];
	constructor(shipsArr: ShipObjType[]) {
		this._shipList = shipsArr.map((shipObj) => new Ship(shipObj, this));
	}
	checkShipHit(x: number, y: number) {
		return this._shipList.reduce((status, ship) => {
			if (status === ATTACK_STATUS.KILLED || status === ATTACK_STATUS.SHOT) return status;
			return ship.checkHit([x, y]);
		}, '');
	}
}

class Ship {
	_shipCells: CoordTuple[];
	_surroundingCells: CoordTuple[];
	_health_points: number;
	_shipsList?: ShipsList;
	constructor(shipObj: ShipObjType, shipsList: ShipsList) {
		const { direction, position, length } = shipObj;
		const { shipCells, surroundingCells } = getShipCells(direction, position.x, position.y, length);
		this._shipCells = shipCells;
		this._surroundingCells = surroundingCells;
		this._health_points = length;
		this._shipsList = shipsList;
	}
	checkHit(hitCoord: CoordTuple) {
		const isHit = this._shipCells.some((coord) => hitCoord[0] === coord[0] && hitCoord[1] === coord[1]);
		if (isHit) {
			this._health_points -= 1;
			return this.checkAlive();
		}
		return ATTACK_STATUS.MISS;
	}
	checkAlive() {
		if (this._health_points === 0) {
			this.sendSurroundingCells();
			return ATTACK_STATUS.KILLED;
		}
		return ATTACK_STATUS.SHOT;
	}
	sendSurroundingCells() {
		this._shipsList._lastKilledSurrCells = this._surroundingCells;
	}
}

export default Ship;

const shipList = [
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

const myList = new ShipsList(shipList);

console.log(myList._shipList[0]._shipCells);
console.log(myList._shipList[0]._surroundingCells);

console.log(myList.checkShipHit(3, 5));
console.log(myList.checkShipHit(3, 6));
console.log(myList.checkShipHit(3, 7));
console.log(myList.checkShipHit(3, 8));
console.log(myList.checkShipHit(3, 9));
