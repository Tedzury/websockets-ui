import Player from '../../entities/player';
import { ERROR_MSGS, MSG_TYPES } from '../../constants/constants';
import PlayersList from '../../entities/playerList';
import RoomList from '../../entities/roomList';
import messageWrapper from '../../helpers/messageWrapper';
import validateJson from '../../helpers/validateJson';

const addUserToRoom = (_data: string, _currPlayer: Player, playersList: PlayersList, roomList: RoomList) => {
	const { indexRoom } = validateJson(_data);

	if (_currPlayer._room_id === indexRoom) {
		_currPlayer._socket.send(messageWrapper(MSG_TYPES.ERR, { message: ERROR_MSGS.OWN_ROOM }));
		return console.log(ERROR_MSGS.OWN_ROOM);
	}
	if (_currPlayer._room_id) {
		_currPlayer._socket.send(messageWrapper(MSG_TYPES.ERR, { message: ERROR_MSGS.ALREADY_IN_ROOM }));
		return console.log(ERROR_MSGS.ALREADY_IN_ROOM);
	}

	const desiredRoom = roomList.getRoomById(indexRoom);
	_currPlayer.addRoom(indexRoom);
	desiredRoom.addPlayer(_currPlayer);
	roomList.informPlayers();

	const enemyId = desiredRoom._roomPlayers[0]._id;
	const enemyPlayer = playersList.getPlayerById(enemyId);

	_currPlayer._socket.send(
		messageWrapper(MSG_TYPES.CREATE_GAME, {
			idGame: indexRoom,
			idPlayer: enemyId,
		}),
	);
	enemyPlayer._socket.send(
		messageWrapper(MSG_TYPES.CREATE_GAME, {
			idGame: indexRoom,
			idPlayer: _currPlayer._id,
		}),
	);
};

export default addUserToRoom;
