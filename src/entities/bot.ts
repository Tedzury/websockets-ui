import prepareEnemyField from '../helpers/prepareEnemyField';
import { CellProps } from '../constants/types';
import ShipsList from './shipsList';
import { randomUUID } from 'crypto';
import getShipsSchemaForBot from '../helpers/getShipsSchemaForBot';

class Bot {
	_shipsList: ShipsList;
	_enemyField: CellProps[][];
	_id: string;
	constructor() {
		this._shipsList = new ShipsList(getShipsSchemaForBot());
		this._enemyField = prepareEnemyField();
		this._id = randomUUID();
	}
}

export default Bot;
