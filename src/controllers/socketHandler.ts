import validateJson from '../helpers/validateJson';
import { ERROR_MSGS } from '../constants/constants';
import PlayersList from '../entities/playerList';
import RoomList from '../entities/roomList';

import GameDispatcher from './gameDispatcher';
import Game from '../entities/game';

const playersList = new PlayersList();
const roomList = new RoomList(playersList);

const socketHandler = (socket: WebSocket) => {
	const dispatcher = new GameDispatcher(roomList, playersList);
	try {
		socket.onmessage = (msg: { data: string }) => {
			const validJson = validateJson(msg.data);
			const { type, data } = validJson;
			if (dispatcher[type]) {
				dispatcher[type](data, socket);
			} else {
				return console.log(ERROR_MSGS.UNEXPENTED_ERR);
			}
		};

		socket.onclose = () => {
			const currentPlayer = dispatcher._currPlayer;
			if (currentPlayer) {
				currentPlayer._status = 'offline';
				if (currentPlayer._room_id) {
					roomList.deleteRoom(currentPlayer._room_id);
					currentPlayer.removeRoom();
					roomList.informPlayers();
				}
				if (currentPlayer._game instanceof Game) {
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
