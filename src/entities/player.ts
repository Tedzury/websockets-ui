import { randomUUID } from 'crypto';
import { ShipType } from '../constants/types';

class Player {
	_name: string;
	_password: string;
	_error: boolean;
	_errorText: string;
	_socket: WebSocket;
	_id: string;
	_wins: number;
	_room_id: string;
	_ships?: ShipType[];
	constructor(name: string, password: string, socket: WebSocket) {
		this._name = name;
		this._password = password;
		this._socket = socket;
		this._id = randomUUID();
		this._error = false;
		this._errorText = '';
		this._wins = 0;
		this._room_id = '';
	}
	getPlayerInfo() {
		return {
			name: this._name,
			index: this._id,
			error: this._error,
			errorText: this._errorText,
		};
	}
	getPlayerName() {
		return this._name;
	}
	addRoom(roomId: string) {
		this._room_id = roomId;
	}
	removeRoom() {
		this._room_id = '';
	}
	getPlayerRequisites() {
		return { name: this._name, index: this._id };
	}
	getWinsData() {
		return {
			name: this._name,
			wins: this._wins,
		};
	}
}

export default Player;
