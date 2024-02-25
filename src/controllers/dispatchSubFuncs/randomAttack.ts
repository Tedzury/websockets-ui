import Player from '../../entities/player';
import validateJson from '../../helpers/validateJson';

const randomAttack = (data: string, currPlayer: Player) => {
	const { indexPlayer } = validateJson(data);
	currPlayer?._game?.randomAttack(indexPlayer);
};

export default randomAttack;
