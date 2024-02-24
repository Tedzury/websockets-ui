import Player from '../../entities/player';
import validateJson from '../../helpers/validateJson';

const randomAttack = (_data: string, _currPlayer: Player) => {
	const { indexPlayer } = validateJson(_data);
	_currPlayer._game.randomAttack(indexPlayer);
};

export default randomAttack;
