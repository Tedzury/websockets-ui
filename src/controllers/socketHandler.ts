import validateJson from '../helpers/validateJson';
import Player from '../entities/player';
import messageWrapper from '../helpers/messageWrapper';
import { MSG_TYPES, ERROR_MSGS } from '../constants/constants';
import PlayersList from '../entities/playerList';

const playersList = new PlayersList();

const dispatcher = {
	reg: (_data: string, _socket: WebSocket) => {
		const { name, password } = validateJson(_data);
		const isActive = playersList.checkActivePlayer(name);
		if (isActive) {
			_socket.send(messageWrapper(MSG_TYPES.ERR, { message: ERROR_MSGS.PLAYER_ALREADY_ACTIVE }))
			return console.log(ERROR_MSGS.PLAYER_ALREADY_ACTIVE)
		};
		const newPlayer = new Player(name, password, _socket);
		playersList.addPlayer(newPlayer);
		_socket.send(messageWrapper(MSG_TYPES.REG, newPlayer.getPlayerInfo()));
	},
};

const socketHandler = (socket: WebSocket) => {
	socket.onmessage = (msg: { data: string }) => {
		const validJson = validateJson(msg.data);
		const { type, data } = validJson;
		if (Object.hasOwn(dispatcher, type)) {
			dispatcher[type](data, socket);
		} else {
			return console.log(ERROR_MSGS.UNEXPENTED_ERR);
		}
	}
}

export default socketHandler;
