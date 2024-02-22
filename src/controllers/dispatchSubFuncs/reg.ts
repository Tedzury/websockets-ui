import { ERROR_MSGS, MSG_TYPES } from '../../constants/constants';
import CurrPlayer from '../../entities/currentPlayer';
import Player from '../../entities/player';
import PlayersList from '../../entities/playerList';
import RoomList from '../../entities/roomList';
import messageWrapper from '../../helpers/messageWrapper';
import validateJson from '../../helpers/validateJson';

const reg = (
	_data: string,
	_socket: WebSocket,
	_currPlayer: CurrPlayer,
	playersList: PlayersList,
	roomList: RoomList,
) => {
	const { name, password } = validateJson(_data);
	const isActive = playersList.checkActivePlayer(name);
	if (isActive) {
		_socket.send(messageWrapper(MSG_TYPES.ERR, { message: ERROR_MSGS.PLAYER_ALREADY_ACTIVE }));
		return console.log(ERROR_MSGS.PLAYER_ALREADY_ACTIVE);
	}
	const newPlayer = new Player(name, password, _socket, playersList);
	_currPlayer.setPlayer(newPlayer);
	playersList.addPlayer(newPlayer);
	_socket.send(messageWrapper(MSG_TYPES.REG, newPlayer.getPlayerInfo()));
	_socket.send(messageWrapper(MSG_TYPES.UPDATE_ROOM, roomList.getAvailableRooms()));
	_socket.send(messageWrapper(MSG_TYPES.UPDATE_WINNNERS, playersList.getUpdateWinnersData()));
};

export default reg;
