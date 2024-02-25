import Player from '../../entities/player';
import validateJson from '../../helpers/validateJson';

const addShips = (data: string, currPlayer: Player) => {
	const { ships } = validateJson(data);
	currPlayer._shipsSchema = ships;
	currPlayer._room.setShipsSent();
};

export default addShips;
