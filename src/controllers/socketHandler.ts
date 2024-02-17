import validateJson from '../helpers/validateJson';
import Player from '../entities/player';
import messageWrapper from '../helpers/messageWrapper';
import { MSG_TYPES, ERROR_MSGS } from '../constants/constants';

const players = [];

const dispatcher = {
	reg: (_data: string, _socket: WebSocket) => {
		const { name, password } = validateJson(_data);
		const newPlayer = new Player(name, password, _socket);
		players.push(newPlayer);
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
