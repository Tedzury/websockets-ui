import validateJson from '../../helpers/validateJson';
import Player from '../../entities/player';

const attack = (_data: string, _currPlayer: Player) => {
	const { indexPlayer, x, y } = validateJson(_data);
	_currPlayer._game.attack(indexPlayer, x, y);
};

export default attack;
