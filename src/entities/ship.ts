import { ShipObjType, CoordTuple } from '../constants/types';
import getShipCells from '../helpers/getShipCells';
import { ATTACK_STATUS } from '../constants/constants';
import ShipsList from './shipsList';

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
			this.removeShip();
			this.sendSurroundingCells();
			return ATTACK_STATUS.KILLED;
		}
		return ATTACK_STATUS.SHOT;
	}
	sendSurroundingCells() {
		this._shipsList.setLastKilledSurrCells(this._surroundingCells);
	}
	removeShip() {
		this._shipsList.reduceShipsLeft();
	}
}

export default Ship;
