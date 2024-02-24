import PlayersList from '../entities/playerList';
import Player from '../entities/player';
import RoomList from '../entities/roomList';
import reg from './dispatchSubFuncs/reg';
import createRoom from './dispatchSubFuncs/createRoom';
import addUserToRoom from './dispatchSubFuncs/addUserToRoom';
import addShips from './dispatchSubFuncs/addShips';
import attack from './dispatchSubFuncs/attack';
import randomAttack from './dispatchSubFuncs/randomAttack';
import Bot from '../entities/bot';
import SingleRoom from '../entities/singleRoom';
import messageWrapper from '../helpers/messageWrapper';
import { MSG_TYPES } from '../constants/constants';

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
	create_room() {
		createRoom(this._currPlayer, this._roomList);
	}
	add_user_to_room(_data: string) {
		addUserToRoom(_data, this._currPlayer, this._playersList, this._roomList);
	}
	add_ships(_data: string) {
		addShips(_data, this._currPlayer);
	}
	attack(_data: string) {
		attack(_data, this._currPlayer);
	}
	randomAttack(_data: string) {
		randomAttack(_data, this._currPlayer);
	}
	single_play() {
		const myBot = new Bot();
		const singleRoom = new SingleRoom(this._currPlayer, myBot);
		this._currPlayer._room = singleRoom;
		this._currPlayer._room_id = singleRoom._roomId;
		this._currPlayer._socket.send(
			messageWrapper(MSG_TYPES.CREATE_GAME, {
				idGame: this._currPlayer._room_id,
				idPlayer: myBot._id,
			}),
		);
	}
}

export default GameDispatcher;
