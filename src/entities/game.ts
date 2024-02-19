import { MSG_TYPES } from '../constants/constants';
import messageWrapper from '../helpers/messageWrapper';
import Player from './player';
import { randomUUID } from 'crypto';

class Game {
	_players: Player[];
	_gameId: string;
	constructor(players: Player[]) {
		this._players = players;
		this._gameId = randomUUID();
		this._players.forEach((player) => {
			player._game = this;
		});
		this._players.forEach((player) => {
			const data = {
				ships: player._ships,
				currentPlayerIndex: player._id,
			};
			player._socket.send(messageWrapper(MSG_TYPES.START_GAME, data));
		});
	}
}

export default Game;
