import { CoordTuple, ShipObjType } from '../constants/types';
import Ship from './ship';
import { ATTACK_STATUS } from '../constants/constants';

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

export default ShipsList;
