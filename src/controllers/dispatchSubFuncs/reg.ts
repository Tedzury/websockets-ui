import { ERROR_MSGS, MSG_TYPES, USER_STATUS } from '../../constants/constants';
import Player from '../../entities/player';
import PlayersList from '../../entities/playerList';
import RoomList from '../../entities/roomList';
import messageWrapper from '../../helpers/messageWrapper';
import validateJson from '../../helpers/validateJson';

const reg = (
	data: string,
	socket: WebSocket,
	setCurrentPlayer: (currPlayer: Player) => void,
	playersList: PlayersList,
	roomList: RoomList,
) => {
	const { name, password } = validateJson(data);
	const user = playersList.checkUser(name);
	if (!user) {
		const newPlayer = new Player(name, password, socket, playersList);
		setCurrentPlayer(newPlayer);
		playersList.addPlayer(newPlayer);
		socket.send(messageWrapper(MSG_TYPES.REG, newPlayer.getPlayerInfo()));
		socket.send(messageWrapper(MSG_TYPES.UPDATE_ROOM, roomList.getAvailableRooms()));
		socket.send(messageWrapper(MSG_TYPES.UPDATE_WINNNERS, playersList.getUpdateWinnersData()));
		return;
	}
	const isActive = user._status === USER_STATUS.ONLINE;
	if (isActive) {
		socket.send(messageWrapper(MSG_TYPES.ERR, { message: ERROR_MSGS.PLAYER_ALREADY_ACTIVE }));
		return console.log(ERROR_MSGS.PLAYER_ALREADY_ACTIVE);
	}
	if (user._password === password) {
		user._socket = socket;
		user._status = USER_STATUS.ONLINE;
		setCurrentPlayer(user);
		socket.send(messageWrapper(MSG_TYPES.REG, user.getPlayerInfo()));
		socket.send(messageWrapper(MSG_TYPES.UPDATE_ROOM, roomList.getAvailableRooms()));
		socket.send(messageWrapper(MSG_TYPES.UPDATE_WINNNERS, playersList.getUpdateWinnersData()));
		return;
	}
	socket.send(messageWrapper(MSG_TYPES.ERR, { message: ERROR_MSGS.WRONG_PASS }));
	return console.log(ERROR_MSGS.WRONG_PASS);
};

export default reg;
