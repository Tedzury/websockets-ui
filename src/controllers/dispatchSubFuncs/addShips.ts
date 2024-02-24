import Player from '../../entities/player';
import validateJson from '../../helpers/validateJson';

const addShips = (_data: string, _currPlayer: Player) => {
	const { ships } = validateJson(_data);
	_currPlayer._shipsSchema = ships;
	_currPlayer._room.setShipsSent();
};

export default addShips;
