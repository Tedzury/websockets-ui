import { randomUUID } from 'crypto';
import Player from './player';


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
			roomUsers: this._roomPlayers,
		};
	}
	addPlayer(_player: Player) {
		this._roomPlayers.push(_player);
	}
	isRoomAvailable() {
		return this._roomPlayers.length < 2;
	}
	setShipsSent() {
		this._playersReady = this._playersReady + 1;
		if (this._playersReady === 2) {
			console.log('Game has started!');
		}
	}
}

export default Room;
