import Player from './player';
import Bot from './bot';
import { randomUUID } from 'crypto';
import prepareEnemyField from '../helpers/prepareEnemyField';
import ShipsList from './shipsList';
import messageWrapper from '../helpers/messageWrapper';
import { ATTACK_STATUS, ERROR_MSGS, MSG_TYPES } from '../constants/constants';
import { hitStatuses } from '../constants/types';
import getRandomCoords from '../helpers/getRandomCoords';
import getRandomTimeout from '../helpers/getRandomTimeout';

class SingleGame {
	_players: [Player, Bot];
	_gameId: string;
	_currPlayer: number;
	constructor(player: Player, bot: Bot) {
		this._currPlayer = 1;
		this._players = [player, bot];
		this._gameId = randomUUID();
		this._players[0]._game = this;
		this._players[0]._enemyField = prepareEnemyField();
		const data = {
			ships: player._shipsSchema,
			currentPlayerIndex: player._id,
		};
		this._players[0]._shipsList = new ShipsList(player._shipsSchema);
		this._players[0]._socket.send(messageWrapper(MSG_TYPES.START_GAME, data));
		this._players[0]._socket.send(
			messageWrapper(MSG_TYPES.TURN, { currentPlayer: this._players[this._currPlayer]._id }),
		);
	}

	attack(indexPlayer: string, x: number, y: number) {
		const defender = this._players.find((player) => player._id === indexPlayer);
		const attacker = this._players.find((player) => player._id !== indexPlayer);

		if (defender._id !== this._players[this._currPlayer]._id) {
			this._players[0]._socket.send(messageWrapper(MSG_TYPES.ERR, { message: ERROR_MSGS.OPPONENTS_TURN }));
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
		this._players[0]._socket.send(
			messageWrapper(MSG_TYPES.ATTACK, {
				position: { x, y },
				currentPlayer: this._players[this._currPlayer]._id,
				status: status,
			}),
		);
		this.passTurn();
	}

	sendMissFeedback(x: number, y: number) {
		this._players[0]._socket.send(
			messageWrapper(MSG_TYPES.ATTACK, {
				position: { x, y },
				currentPlayer: this._players[this._currPlayer]._id,
				status: ATTACK_STATUS.MISS,
			}),
		);
		this.passTurn();
	}

	sendShotFeedback(x: number, y: number) {
		this._players[0]._socket.send(
			messageWrapper(MSG_TYPES.ATTACK, {
				position: { x, y },
				currentPlayer: this._players[this._currPlayer]._id,
				status: ATTACK_STATUS.SHOT,
			}),
		);
		this._players[0]._socket.send(
			messageWrapper(MSG_TYPES.TURN, { currentPlayer: this._players[this._currPlayer]._id }),
		);
		if (this._currPlayer === 0) {
			setTimeout(() => {
				this?.randomAttack(this._players[this._currPlayer]._id);
			}, getRandomTimeout());
		}
	}

	sendKillFeedback(x: number, y: number) {
		const defender = this._players[this._currPlayer];
		const attacker = this._players.find((player) => player._id !== defender._id);
		const surrCells = defender._shipsList._lastKilledSurrCells;
		const noShipsLeft = defender._shipsList.checkNoShipsLeft();

		this._players[0]._socket.send(
			messageWrapper(MSG_TYPES.ATTACK, {
				position: { x, y },
				currentPlayer: defender._id,
				status: ATTACK_STATUS.KILLED,
			}),
		);
		surrCells.forEach((cell) => {
			attacker._enemyField[cell[0]][cell[1]].status = ATTACK_STATUS.MISS as hitStatuses;
			this._players[0]._socket.send(
				messageWrapper(MSG_TYPES.ATTACK, {
					position: { x: cell[0], y: cell[1] },
					currentPlayer: defender._id,
					status: ATTACK_STATUS.MISS,
				}),
			);
		});
		this._players[0]._socket.send(messageWrapper(MSG_TYPES.TURN, { currentPlayer: defender._id }));
		if (noShipsLeft) {
			this.declareVictory(defender._id);
			return;
		}
		if (this._currPlayer === 0) {
			setTimeout(() => {
				this?.randomAttack(this._players[this._currPlayer]._id);
			}, getRandomTimeout());
		}
	}

	declareVictory(lostPlayerId: string) {
		const attacker = this._players.find((player) => player._id !== lostPlayerId);
		if (attacker instanceof Player) {
			attacker._wins += 1;
			this._players[0]._socket.send(
				messageWrapper(MSG_TYPES.UPDATE_WINNNERS, attacker._playersList.getUpdateWinnersData()),
			);
		}
		this._players[0]._socket.send(messageWrapper(MSG_TYPES.FINISH, { winPlayer: lostPlayerId }));
		this._players[0].gameCleanup();
	}

	passTurn() {
		if (this._currPlayer === 0) {
			this._currPlayer = 1;
		} else {
			this._currPlayer = 0;
		}
		this._players[0]._socket.send(
			messageWrapper(MSG_TYPES.TURN, { currentPlayer: this._players[this._currPlayer]._id }),
		);
		if (this._currPlayer === 0) {
			setTimeout(() => {
				this?.randomAttack(this._players[this._currPlayer]._id);
			}, getRandomTimeout());
		}
	}
}

export default SingleGame;
