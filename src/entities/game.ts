import { ERROR_MSGS, MSG_TYPES, ATTACK_STATUS } from '../constants/constants';
import messageWrapper from '../helpers/messageWrapper';
import Player from './player';
import ShipsList from './shipsList';
import { randomUUID } from 'crypto';
import { CellProps } from '../constants/types';

const prepareField = () => {
	const field: CellProps[][] = new Array(10)
		.fill('row')
		.map(() => new Array(10).fill('column').map(() => ({ isShot: false })));
	return field;
};

class Game {
	_players: Player[];
	_gameId: string;
	_currPlayer: number;
	constructor(players: Player[]) {
		this._currPlayer = 0;
		this._players = players;
		this._gameId = randomUUID();
		this._players.forEach((player) => {
			player._game = this;
			player._field = prepareField();
			const data = {
				ships: player._shipsSchema,
				currentPlayerIndex: player._id,
			};
			player._shipsList = new ShipsList(player._shipsSchema);
			player._socket.send(messageWrapper(MSG_TYPES.START_GAME, data));
			player._socket.send(messageWrapper(MSG_TYPES.TURN, { currentPlayer: this._players[1]._id }));
		});
	}
	attack(indexPlayer: string, x: number, y: number) {
		const defender = this._players.find((player) => player._id === indexPlayer);
		const attacker = this._players.find((player) => player._id !== indexPlayer);

		if (defender._id !== this._players[this._currPlayer]._id) {
			attacker._socket.send(messageWrapper(MSG_TYPES.ERR, { message: ERROR_MSGS.OPPONENTS_TURN }));
			return console.log(ERROR_MSGS.OPPONENTS_TURN);
		}
		if (defender._field[x][y].isShot === true) {
			this._players.forEach((player) =>
				player._socket.send(
					messageWrapper(MSG_TYPES.ATTACK, {
						position: { x, y },
						currentPlayer: defender._id,
						status: ATTACK_STATUS.MISS,
					}),
				),
			);
			this.passTurn();
			return;
		}

		defender._field[x][y].isShot = true;
		const hitStatus = defender._shipsList.checkShipHit(x, y);
		console.log(`Status: ${hitStatus}`);

		if (hitStatus === ATTACK_STATUS.MISS) {
			this._players.forEach((player) =>
				player._socket.send(
					messageWrapper(MSG_TYPES.ATTACK, {
						position: { x, y },
						currentPlayer: defender._id,
						status: ATTACK_STATUS.MISS,
					}),
				),
			);
			return this.passTurn();
		}
		if (hitStatus === ATTACK_STATUS.SHOT) {
			this._players.forEach((player) =>
				player._socket.send(
					messageWrapper(MSG_TYPES.ATTACK, {
						position: { x, y },
						currentPlayer: defender._id,
						status: ATTACK_STATUS.SHOT,
					}),
				),
			);
			return this.passTurn();
		}
		if (hitStatus === ATTACK_STATUS.KILLED) {
			this._players.forEach((player) =>
				player._socket.send(
					messageWrapper(MSG_TYPES.ATTACK, {
						position: { x, y },
						currentPlayer: defender._id,
						status: ATTACK_STATUS.KILLED,
					}),
				),
			);
			return this.passTurn();
		}
	}

	passTurn() {
		if (this._currPlayer === 0) {
			this._currPlayer = 1;
		} else {
			this._currPlayer = 0;
		}
		this._players.forEach((player) => {
			player._socket.send(messageWrapper(MSG_TYPES.TURN, { currentPlayer: this._players[this._currPlayer]._id }));
		});
	}
}

export default Game;
