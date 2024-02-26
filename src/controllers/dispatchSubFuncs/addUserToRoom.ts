import Player from '../../entities/player';
import { ERROR_MSGS, MSG_TYPES } from '../../constants/constants';
import PlayersList from '../../entities/playerList';
import RoomList from '../../entities/roomList';
import messageWrapper from '../../helpers/messageWrapper';
import validateJson from '../../helpers/validateJson';

const addUserToRoom = (data: string, currPlayer: Player, playersList: PlayersList, roomList: RoomList) => {
	const { indexRoom } = validateJson(data);

	if (currPlayer._room_id === indexRoom) {
		currPlayer._socket.send(messageWrapper(MSG_TYPES.ERR, { message: ERROR_MSGS.OWN_ROOM }));
		return console.log(ERROR_MSGS.OWN_ROOM);
	}
	if (currPlayer._room_id) {
		currPlayer._socket.send(messageWrapper(MSG_TYPES.ERR, { message: ERROR_MSGS.ALREADY_IN_ROOM }));
		return console.log(ERROR_MSGS.ALREADY_IN_ROOM);
	}

	const desiredRoom = roomList.getRoomById(indexRoom);
	currPlayer.addRoom(desiredRoom);
	desiredRoom.addPlayer(currPlayer);
	roomList.informPlayers();

	const enemyId = desiredRoom._roomPlayers[0]._id;
	const enemyPlayer = playersList.getPlayerById(enemyId);

	currPlayer._socket.send(
		messageWrapper(MSG_TYPES.CREATE_GAME, {
			idGame: indexRoom,
			idPlayer: enemyId,
		}),
	);
	enemyPlayer._socket.send(
		messageWrapper(MSG_TYPES.CREATE_GAME, {
			idGame: indexRoom,
			idPlayer: currPlayer._id,
		}),
	);
};

export default addUserToRoom;
