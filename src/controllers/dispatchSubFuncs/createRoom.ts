import Player from '../../entities/player';
import { ERROR_MSGS, MSG_TYPES } from '../../constants/constants';
import RoomList from '../../entities/roomList';
import messageWrapper from '../../helpers/messageWrapper';

const createRoom = (_currPlayer: Player, roomList: RoomList) => {
	if (_currPlayer._room_id) {
		_currPlayer._socket.send(messageWrapper(MSG_TYPES.ERR, { message: ERROR_MSGS.ALREADY_IN_ROOM }));
		return console.log(ERROR_MSGS.ALREADY_IN_ROOM);
	}
	const roomId = roomList.createRoom(_currPlayer);
	_currPlayer.addRoom(roomId);
	roomList.informPlayers();
};

export default createRoom;
