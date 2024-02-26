import Room from './room';
import PlayersList from './playerList';
import Player from './player';
import messageWrapper from '../helpers/messageWrapper';
import { MSG_TYPES } from '../constants/constants';

class RoomList {
	_roomList: Room[];
	_playersList: PlayersList;
	constructor(playersList: PlayersList) {
		this._roomList = [];
		this._playersList = playersList;
	}
	informPlayers() {
		this._playersList._list.forEach((player) => {
			player._socket.send(messageWrapper(MSG_TYPES.UPDATE_ROOM, this.getAvailableRooms()));
		});
	}
	getRoomById(roomId: string) {
		return this._roomList.find((room) => room.getRoomId() === roomId);
	}
	createRoom(roomUser: Player) {
		const newRoom = new Room();
		newRoom.addPlayer(roomUser);
		this._roomList.push(newRoom);
		return newRoom;
	}
	deleteRoom(roomId: string) {
		this._roomList = this._roomList.filter((room) => room._roomId !== roomId);
	}
	getAvailableRooms() {
		return this._roomList.filter((room) => room.isRoomAvailable()).map((room) => room.getRoomInfo());
	}
}

export default RoomList;
