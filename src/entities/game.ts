import { ERROR_MSGS, MSG_TYPES, ATTACK_STATUS } from '../constants/constants';
import messageWrapper from '../helpers/messageWrapper';
import Player from './player';
import ShipsList from './shipsList';
import { randomUUID } from 'crypto';
import { hitStatuses } from '../constants/types';
import getRandomCoords from '../helpers/getRandomCoords';
import prepareEnemyField from '../helpers/prepareEnemyField';

class Game {
	_players: Player[];
	_gameId: string;
	_currPlayer: number;
	constructor(players: Player[]) {
		this._currPlayer = 1;
		this._players = players;
		this._gameId = randomUUID();
		this._players.forEach((player) => {
			player._game = this;
			player._enemyField = prepareEnemyField();
			const data = {
				ships: player._shipsSchema,
				currentPlayerIndex: player._id,
			};
			player._shipsList = new ShipsList(player._shipsSchema);
			player._socket.send(messageWrapper(MSG_TYPES.START_GAME, data));
			player._socket.send(messageWrapper(MSG_TYPES.TURN, { currentPlayer: this._players[this._currPlayer]._id }));
		});
	}

	attack(indexPlayer: string, x: number, y: number) {
		const defender = this._players.find((player) => player._id === indexPlayer);
		const attacker = this._players.find((player) => player._id !== indexPlayer);

		if (defender._id !== this._players[this._currPlayer]._id) {
			attacker._socket.send(messageWrapper(MSG_TYPES.ERR, { message: ERROR_MSGS.OPPONENTS_TURN }));
			return console.log(ERROR_MSGS.OPPONENTS_TURN);
		}
		if (attacker._enemyField[x][y].status !== 'unknown') {
			return this.sendAlreadyShotFeedback(x, y, attacker._enemyField[x][y].status);
		}

		const hitStatus = defender._shipsList.checkShipHit(x, y);
		attacker._enemyField[x][y].status = hitStatus as hitStatuses;

		if (hitStatus === ATTACK_STATUS.MISS) {
			this.sendMissFeedback(x, y);
		} else if (hitStatus === ATTACK_STATUS.SHOT) {
			return this.sendShotFeedback(x, y);
		} else {
			this.sendKillFeedback(x, y);
		}
	}

	randomAttack(indexPlayer: string) {
		const attacker = this._players.find((player) => player._id !== indexPlayer);

		const [x, y] = getRandomCoords(attacker._enemyField);
		this.attack(indexPlayer, x, y);
	}

	sendAlreadyShotFeedback(x: number, y: number, status: string) {
		this._players.forEach((player) =>
			player._socket.send(
				messageWrapper(MSG_TYPES.ATTACK, {
					position: { x, y },
					currentPlayer: this._players[this._currPlayer]._id,
					status: status,
				}),
			),
		);
		this.passTurn();
	}

	sendMissFeedback(x: number, y: number) {
		this._players.forEach((player) =>
			player._socket.send(
				messageWrapper(MSG_TYPES.ATTACK, {
					position: { x, y },
					currentPlayer: this._players[this._currPlayer]._id,
					status: ATTACK_STATUS.MISS,
				}),
			),
		);
		this.passTurn();
	}

	sendShotFeedback(x: number, y: number) {
		this._players.forEach((player) => {
			player._socket.send(
				messageWrapper(MSG_TYPES.ATTACK, {
					position: { x, y },
					currentPlayer: this._players[this._currPlayer]._id,
					status: ATTACK_STATUS.SHOT,
				}),
			);
			player._socket.send(messageWrapper(MSG_TYPES.TURN, { currentPlayer: this._players[this._currPlayer]._id }));
		});
	}

	sendKillFeedback(x: number, y: number) {
		const defender = this._players[this._currPlayer];
		const attacker = this._players.find((player) => player._id !== defender._id);
		const surrCells = defender._shipsList._lastKilledSurrCells;
		const noShipsLeft = defender._shipsList.checkNoShipsLeft();

		this._players.forEach((player) => {
			player._socket.send(
				messageWrapper(MSG_TYPES.ATTACK, {
					position: { x, y },
					currentPlayer: defender._id,
					status: ATTACK_STATUS.KILLED,
				}),
			);
			surrCells.forEach((cell) => {
				attacker._enemyField[cell[0]][cell[1]].status = ATTACK_STATUS.MISS as hitStatuses;
				player._socket.send(
					messageWrapper(MSG_TYPES.ATTACK, {
						position: { x: cell[0], y: cell[1] },
						currentPlayer: defender._id,
						status: ATTACK_STATUS.MISS,
					}),
				);
			});
			player._socket.send(messageWrapper(MSG_TYPES.TURN, { currentPlayer: defender._id }));
		});
		if (noShipsLeft) {
			this.declareVictory();
		}
	}

	declareVictory() {
		const attacker = this._players.find((player) => player._id !== this._players[this._currPlayer]._id);
		attacker._wins += 1;
		this._players.forEach((player) => {
			player._socket.send(messageWrapper(MSG_TYPES.FINISH, { winPlayer: this._players[this._currPlayer]._id }));
			player._socket.send(
				messageWrapper(MSG_TYPES.UPDATE_WINNNERS, this._players[this._currPlayer]._playersList.getUpdateWinnersData()),
			);
			player.gameCleanup();
		});
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
