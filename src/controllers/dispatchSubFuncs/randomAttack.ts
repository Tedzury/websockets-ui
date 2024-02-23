import CurrPlayer from '../../entities/currentPlayer';
import validateJson from '../../helpers/validateJson';

const randomAttack = (_data: string, _socket: WebSocket, _currPlayer: CurrPlayer) => {
	const currPlayer = _currPlayer.getPlayer();
	const { indexPlayer } = validateJson(_data);
	currPlayer._game.randomAttack(indexPlayer);
};

export default randomAttack;
