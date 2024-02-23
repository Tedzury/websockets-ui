import CurrPlayer from '../entities/currentPlayer';
import PlayersList from '../entities/playerList';
import RoomList from '../entities/roomList';
import reg from './dispatchSubFuncs/reg';
import createRoom from './dispatchSubFuncs/createRoom';
import addUserToRoom from './dispatchSubFuncs/addUserToRoom';
import validateJson from '../helpers/validateJson';

const gameDispatcher = (playersList: PlayersList, roomList: RoomList) => {
	return {
		reg: (_data: string, _socket: WebSocket, _currPlayer: CurrPlayer) => {
			reg(_data, _socket, _currPlayer, playersList, roomList);
		},
		create_room: (_: string, _socket: WebSocket, _currPlayer: CurrPlayer) => {
			createRoom(_socket, _currPlayer, roomList);
		},
		add_user_to_room: (_data: string, _socket: WebSocket, _currPlayer: CurrPlayer) => {
			addUserToRoom(_data, _socket, _currPlayer, playersList, roomList);
		},
		add_ships: (_data: string, _socket: WebSocket, _currPlayer: CurrPlayer) => {
			const currPlayer = _currPlayer.getPlayer();
			const { ships } = validateJson(_data);
			currPlayer._shipsSchema = ships;
			const playerRoom = roomList.getRoomById(currPlayer._room_id);
			playerRoom.setShipsSent();
		},
		attack: (_data: string, _socket: WebSocket, _currPlayer: CurrPlayer) => {
			const currPlayer = _currPlayer.getPlayer();
			const { indexPlayer, x, y } = validateJson(_data);
			currPlayer._game.attack(indexPlayer, x, y);
		},
		randomAttack: (_data: string, _socket: WebSocket, _currPlayer: CurrPlayer) => {
			const currPlayer = _currPlayer.getPlayer();
			const { indexPlayer } = validateJson(_data);
			currPlayer._game.randomAttack(indexPlayer);
		},
	};
};

export default gameDispatcher;
