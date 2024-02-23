import validateJson from '../../helpers/validateJson';
import CurrPlayer from '../../entities/currentPlayer';

const attack = (_data: string, _socket: WebSocket, _currPlayer: CurrPlayer) => {
	const currPlayer = _currPlayer.getPlayer();
	const { indexPlayer, x, y } = validateJson(_data);
	currPlayer._game.attack(indexPlayer, x, y);
};

export default attack;
