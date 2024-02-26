import validateJson from '../../helpers/validateJson';
import Player from '../../entities/player';

const attack = (data: string, currPlayer: Player) => {
	const { indexPlayer, x, y } = validateJson(data);
	currPlayer?._game?.attack(indexPlayer, x, y);
};

export default attack;
