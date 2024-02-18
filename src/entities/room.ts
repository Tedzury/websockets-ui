import { randomUUID } from "crypto";

type RoomPlayer = {name: string, index:string}

class Room {
	_room_id: string;
	_room_users: RoomPlayer[]
	constructor () {
		this._room_id = randomUUID()
		this._room_users = [];
	}
	getRoomId () {
		return this._room_id;
	}
	getRoomInfo () {
		return {
			roomId: this._room_id,
			roomUsers: this._room_users
	}
	}
	addPlayer (_roomPlayer: RoomPlayer) {
		this._room_users.push(_roomPlayer);
	}
	isRoomAvailable() {
		return this._room_users.length < 2;
	}
};

export default Room;
