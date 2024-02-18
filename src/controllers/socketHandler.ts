import validateJson from '../helpers/validateJson';
import Player from '../entities/player';
import messageWrapper from '../helpers/messageWrapper';
import { MSG_TYPES, ERROR_MSGS } from '../constants/constants';
import PlayersList from '../entities/playerList';
import RoomList from '../entities/roomList';
import CurrPlayer from '../entities/currentPlayer';

const playersList = new PlayersList();
const roomList = new RoomList(playersList);

const gameDispatcher = () => {
	return {
		reg: (_data: string, _socket: WebSocket, _currPlayer: CurrPlayer) => {
			const { name, password } = validateJson(_data);
			const isActive = playersList.checkActivePlayer(name);
			if (isActive) {
				_socket.send(messageWrapper(MSG_TYPES.ERR, { message: ERROR_MSGS.PLAYER_ALREADY_ACTIVE }))
				return console.log(ERROR_MSGS.PLAYER_ALREADY_ACTIVE)
			};
			const newPlayer = new Player(name, password, _socket);
			_currPlayer.setPlayer(newPlayer);
			playersList.addPlayer(newPlayer);
			_socket.send(messageWrapper(MSG_TYPES.REG, newPlayer.getPlayerInfo()));
			_socket.send(messageWrapper(MSG_TYPES.UPDATE_ROOM, roomList.getAvailableRooms()));
			_socket.send(messageWrapper(MSG_TYPES.UPDATE_WINNNERS, playersList.getUpdateWinnersData()))
		},
		create_room: (_: string, _socket: WebSocket, _currPlayer: CurrPlayer) => {
			const currPlayer = _currPlayer.getPlayer();
			if (currPlayer._room_id) {
				 _socket.send(messageWrapper(MSG_TYPES.ERR, { message: ERROR_MSGS.ALREADY_IN_ROOM}));
				 return console.log(ERROR_MSGS.ALREADY_IN_ROOM);
			}
			const roomId = roomList.createRoom(currPlayer.getPlayerRequisites());
			currPlayer.addRoom(roomId);
			roomList.informPlayers();
		},
	};
}

const socketHandler = (socket: WebSocket) => {
	const currPlayer = new CurrPlayer;
	socket.onmessage = (msg: { data: string }) => {
		const dispatcher = gameDispatcher();
		const validJson = validateJson(msg.data);
		const { type, data } = validJson;
		if (Object.hasOwn(dispatcher, type)) {
			dispatcher[type](data, socket, currPlayer);
		} else {
			return console.log(ERROR_MSGS.UNEXPENTED_ERR);
		}
	}
	socket.onclose = () => {
		const currentPlayer = currPlayer.getPlayer();
		if (currentPlayer) {
			playersList.removePlayer(currentPlayer._id)
			if (currentPlayer._room_id) {
				roomList.deleteRoom(currentPlayer._room_id);
				currentPlayer.removeRoom()
				roomList.informPlayers();
			}
		}
	}
}

export default socketHandler;
