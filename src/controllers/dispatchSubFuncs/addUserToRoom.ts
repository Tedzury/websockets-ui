import { ERROR_MSGS, MSG_TYPES } from "../../constants/constants";
import CurrPlayer from "../../entities/currentPlayer";
import PlayersList from "../../entities/playerList";
import RoomList from "../../entities/roomList";
import messageWrapper from "../../helpers/messageWrapper";
import validateJson from "../../helpers/validateJson";

const addUserToRoom = (_data: string, _socket: WebSocket, _currPlayer: CurrPlayer, playersList: PlayersList, roomList: RoomList) => {
	const currPlayer = _currPlayer.getPlayer();
	const { indexRoom } = validateJson(_data);

	if (currPlayer._room_id === indexRoom) {
		_socket.send(messageWrapper(MSG_TYPES.ERR, { message: ERROR_MSGS.OWN_ROOM}));
		return console.log(ERROR_MSGS.OWN_ROOM);
	}
	if (currPlayer._room_id) {
		_socket.send(messageWrapper(MSG_TYPES.ERR, { message: ERROR_MSGS.ALREADY_IN_ROOM}));
		return console.log(ERROR_MSGS.ALREADY_IN_ROOM);
	}

	const desiredRoom = roomList.getRoomById(indexRoom);
	currPlayer.addRoom(indexRoom);
	desiredRoom.addPlayer(currPlayer.getPlayerRequisites());
	roomList.informPlayers()

	const enemyId = desiredRoom._room_users[0].index;
	const enemyPlayer = playersList.getPlayerById(enemyId);

	currPlayer._socket.send(messageWrapper(MSG_TYPES.CREATE_GAME, {
		idGame: indexRoom,
		idPlayer: enemyId,
	}))
	enemyPlayer._socket.send(messageWrapper(MSG_TYPES.CREATE_GAME, {
		idGame: indexRoom,
		idPlayer: currPlayer._id,
	}))
}

export default addUserToRoom;
