import Player from '../../entities/player';
import { ERROR_MSGS, MSG_TYPES } from '../../constants/constants';
import RoomList from '../../entities/roomList';
import messageWrapper from '../../helpers/messageWrapper';

const createRoom = (currPlayer: Player, roomList: RoomList) => {
	if (currPlayer._room_id) {
		currPlayer._socket.send(messageWrapper(MSG_TYPES.ERR, { message: ERROR_MSGS.ALREADY_IN_ROOM }));
		return console.log(ERROR_MSGS.ALREADY_IN_ROOM);
	}
	const room = roomList.createRoom(currPlayer);
	currPlayer.addRoom(room);
	roomList.informPlayers();
};

export default createRoom;
