import { ERROR_MSGS, MSG_TYPES } from '../../constants/constants';
import Player from '../../entities/player';
import PlayersList from '../../entities/playerList';
import RoomList from '../../entities/roomList';
import messageWrapper from '../../helpers/messageWrapper';
import validateJson from '../../helpers/validateJson';

const reg = (
	_data: string,
	_socket: WebSocket,
	setCurrentPlayer: (currPlayer: Player) => void,
	playersList: PlayersList,
	roomList: RoomList,
) => {
	const { name, password } = validateJson(_data);
	const user = playersList.checkUser(name);
	if (!user) {
		const newPlayer = new Player(name, password, _socket, playersList);
		setCurrentPlayer(newPlayer);
		playersList.addPlayer(newPlayer);
		_socket.send(messageWrapper(MSG_TYPES.REG, newPlayer.getPlayerInfo()));
		_socket.send(messageWrapper(MSG_TYPES.UPDATE_ROOM, roomList.getAvailableRooms()));
		_socket.send(messageWrapper(MSG_TYPES.UPDATE_WINNNERS, playersList.getUpdateWinnersData()));
		return;
	}
	const isActive = user._status === 'online';
	if (isActive) {
		_socket.send(messageWrapper(MSG_TYPES.ERR, { message: ERROR_MSGS.PLAYER_ALREADY_ACTIVE }));
		return console.log(ERROR_MSGS.PLAYER_ALREADY_ACTIVE);
	}
	if (user._password === password) {
		user._socket = _socket;
		user._status = 'online';
		setCurrentPlayer(user);
		_socket.send(messageWrapper(MSG_TYPES.REG, user.getPlayerInfo()));
		_socket.send(messageWrapper(MSG_TYPES.UPDATE_ROOM, roomList.getAvailableRooms()));
		_socket.send(messageWrapper(MSG_TYPES.UPDATE_WINNNERS, playersList.getUpdateWinnersData()));
		return;
	}
	_socket.send(messageWrapper(MSG_TYPES.ERR, { message: ERROR_MSGS.WRONG_PASS }));
	return console.log(ERROR_MSGS.WRONG_PASS);
};

export default reg;
