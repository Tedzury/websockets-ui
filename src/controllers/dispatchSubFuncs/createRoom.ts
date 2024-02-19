import { ERROR_MSGS, MSG_TYPES } from '../../constants/constants';
import CurrPlayer from '../../entities/currentPlayer';
import RoomList from '../../entities/roomList';
import messageWrapper from '../../helpers/messageWrapper';

const createRoom = (_socket: WebSocket, _currPlayer: CurrPlayer, roomList: RoomList) => {
	const currPlayer = _currPlayer.getPlayer();
	if (currPlayer._room_id) {
		_socket.send(messageWrapper(MSG_TYPES.ERR, { message: ERROR_MSGS.ALREADY_IN_ROOM }));
		return console.log(ERROR_MSGS.ALREADY_IN_ROOM);
	}
	const roomId = roomList.createRoom(currPlayer);
	currPlayer.addRoom(roomId);
	roomList.informPlayers();
};

export default createRoom;
