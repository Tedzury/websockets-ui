import { randomUUID } from 'crypto';
import Player from './player';
import Game from './game';

class Room {
	_roomId: string;
	_roomPlayers: Player[];
	_playersReady: number;
	constructor() {
		this._roomId = randomUUID();
		this._roomPlayers = [];
		this._playersReady = 0;
	}
	getRoomId() {
		return this._roomId;
	}
	getRoomInfo() {
		return {
			roomId: this._roomId,
			roomUsers: this._roomPlayers.map((player) => ({ name: player._name, index: player._id })),
		};
	}
	addPlayer(_player: Player) {
		this._roomPlayers.push(_player);
	}
	isRoomAvailable() {
		return this._roomPlayers.length < 2;
	}
	setShipsSent() {
		this._playersReady += 1;
		if (this._playersReady === 2) {
			this.startGame();
		}
	}
	startGame() {
		new Game(this._roomPlayers);
	}
}

export default Room;
