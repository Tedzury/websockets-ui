import PlayersList from '../entities/playerList';
import Player from '../entities/player';
import RoomList from '../entities/roomList';
import reg from './dispatchSubFuncs/reg';
import createRoom from './dispatchSubFuncs/createRoom';
import addUserToRoom from './dispatchSubFuncs/addUserToRoom';
import addShips from './dispatchSubFuncs/addShips';
import attack from './dispatchSubFuncs/attack';
import randomAttack from './dispatchSubFuncs/randomAttack';

class GameDispatcher {
	_roomList: RoomList;
	_playersList: PlayersList;
	_currPlayer?: Player;
	constructor(roomList: RoomList, playersList: PlayersList) {
		this._playersList = playersList;
		this._roomList = roomList;
		this._currPlayer = undefined;
	}
	setCurrentPlayer(currPlayer: Player) {
		this._currPlayer = currPlayer;
	}
	reg(_data: string, _socket: WebSocket) {
		reg(_data, _socket, this.setCurrentPlayer.bind(this), this._playersList, this._roomList);
	}
	create_room(_: string, _socket: WebSocket) {
		createRoom(_socket, this._currPlayer, this._roomList);
	}
	add_user_to_room(_data: string, _socket: WebSocket) {
		addUserToRoom(_data, _socket, this._currPlayer, this._playersList, this._roomList);
	}
	add_ships(_data: string, _socket: WebSocket) {
		addShips(_data, _socket, this._currPlayer, this._roomList);
	}
	attack(_data: string, _socket: WebSocket) {
		attack(_data, _socket, this._currPlayer);
	}
	randomAttack(_data: string, _socket: WebSocket) {
		randomAttack(_data, _socket, this._currPlayer);
	}
}

export default GameDispatcher;
