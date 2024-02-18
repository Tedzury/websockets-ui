import CurrPlayer from "../entities/currentPlayer";
import { ERROR_MSGS, MSG_TYPES } from "../constants/constants";
import PlayersList from "../entities/playerList";
import RoomList from "../entities/roomList";
import messageWrapper from "../helpers/messageWrapper";
import Player from "../entities/player";
import validateJson from "../helpers/validateJson";

const gameDispatcher = (playersList: PlayersList, roomList: RoomList) => {
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
		add_user_to_room: (_data: string, _socket: WebSocket, _currPlayer: CurrPlayer) => {
			const currPlayer = _currPlayer.getPlayer();
			const { indexRoom } = validateJson(_data);

			if (currPlayer._room_id === indexRoom) {
				_socket.send(messageWrapper(MSG_TYPES.ERR, { message: ERROR_MSGS.OWN_ROOM}));
				return console.log(ERROR_MSGS.OWN_ROOM);
			}
			if (currPlayer._room_id) {
				_socket.send(messageWrapper(MSG_TYPES.ERR, { message: ERROR_MSGS.ALREADY_IN_ROOM}));
				return console.log(ERROR_MSGS.ALREADY_IN_ROOM);
			}

			const desiredRoom = roomList.getRoomById(indexRoom);
			currPlayer.addRoom(indexRoom);
			desiredRoom.addPlayer(currPlayer.getPlayerRequisites());
			roomList.informPlayers()

			const enemyId = desiredRoom._room_users[0].index;
			const enemyPlayer = playersList.getPlayerById(enemyId);

			currPlayer._socket.send(messageWrapper(MSG_TYPES.CREATE_GAME, {
				idGame: indexRoom,
				idPlayer: enemyId,
			}))
			enemyPlayer._socket.send(messageWrapper(MSG_TYPES.CREATE_GAME, {
				idGame: indexRoom,
				idPlayer: currPlayer._id,
			}))
		}
	};
}

export default gameDispatcher;
