import { randomUUID } from "crypto";

class Player {
	_name: string;
	_password: string;
	_error: boolean;
	_errorText: string;
	_socket: WebSocket;
	_id: string;
	constructor (name: string, password: string, socket: WebSocket) {
		this._name = name;
		this._password = password;
		this._socket = socket;
		this._id = randomUUID();
		this._error = false;
		this._errorText = '';
	}
	getPlayerInfo() {
		return {
				name: this._name,
				index: this._id,
				error: this._error,
				errorText: this._errorText,
		}
	}
	getPlayerName() {
		return this._name;
	}
}

export default Player;
