import validateJson from '../helpers/validateJson';
import { ERROR_MSGS } from '../constants/constants';
import PlayersList from '../entities/playerList';
import RoomList from '../entities/roomList';
import CurrPlayer from '../entities/currentPlayer';
import gameDispatcher from './gameDispatcher';

const playersList = new PlayersList();
const roomList = new RoomList(playersList);

const socketHandler = (socket: WebSocket) => {
	const currPlayer = new CurrPlayer();
	const dispatcher = gameDispatcher(playersList, roomList);

	try {
		socket.onmessage = (msg: { data: string }) => {
			const validJson = validateJson(msg.data);
			const { type, data } = validJson;
			if (Object.hasOwn(dispatcher, type)) {
				dispatcher[type](data, socket, currPlayer);
			} else {
				return console.log(ERROR_MSGS.UNEXPENTED_ERR);
			}
		};

		socket.onclose = () => {
			const currentPlayer = currPlayer.getPlayer();
			if (currentPlayer) {
				currentPlayer._status = 'offline';
				if (currentPlayer._room_id) {
					roomList.deleteRoom(currentPlayer._room_id);
					currentPlayer.removeRoom();
					roomList.informPlayers();
				}
				if (currentPlayer._game) {
					currentPlayer._game.declareVictory(currentPlayer._id);
				}
			}
		};
	} catch (error) {
		console.log(
			`Unexpected error have happened. We are trying to figure out what have caused it. Error message: ${error}`,
		);
	}
};

export default socketHandler;
