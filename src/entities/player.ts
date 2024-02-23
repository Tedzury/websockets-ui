import { randomUUID } from 'crypto';
import { CellProps, ShipType } from '../constants/types';
import Game from './game';
import ShipsList from './shipsList';
import PlayersList from './playerList';

class Player {
	_name: string;
	_password: string;
	_error: boolean;
	_errorText: string;
	_status: 'online' | 'offline';
	_socket: WebSocket;
	_id: string;
	_wins: number;
	_playersList: PlayersList;
	_room_id: string;
	_shipsSchema?: ShipType[];
	_game?: Game;
	_enemyField?: CellProps[][];
	_shipsList?: ShipsList;
	constructor(name: string, password: string, socket: WebSocket, playersList: PlayersList) {
		this._name = name;
		this._password = password;
		this._socket = socket;
		this._status = 'online';
		this._id = randomUUID();
		this._error = false;
		this._errorText = '';
		this._wins = 0;
		this._room_id = '';
		this._playersList = playersList;
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
	gameCleanup() {
		this._room_id = '';
		this._shipsSchema = [];
		this._game = undefined;
		this._enemyField = [];
		this._shipsList = undefined;
	}
}

export default Player;
