import { CoordTuple, ShipObjType } from '../constants/types';
import Ship from './ship';
import { ATTACK_STATUS } from '../constants/constants';

class ShipsList {
	_shipList: Ship[];
	_lastKilledSurrCells?: CoordTuple[];
	_shipsLeft: number;
	constructor(shipsArr: ShipObjType[]) {
		this._shipList = shipsArr.map((shipObj) => new Ship(shipObj, this));
		this._lastKilledSurrCells = [];
		this._shipsLeft = 10;
	}
	checkShipHit(x: number, y: number) {
		return this._shipList.reduce((status, ship) => {
			if (status === ATTACK_STATUS.KILLED || status === ATTACK_STATUS.SHOT) return status;
			return ship.checkHit([x, y]);
		}, '');
	}
	setLastKilledSurrCells(cells: CoordTuple[]) {
		this._lastKilledSurrCells = cells;
	}
	reduceShipsLeft() {
		this._shipsLeft -= 1;
	}
	checkNoShipsLeft() {
		return this._shipsLeft === 0;
	}
}

export default ShipsList;
