import CurrPlayer from '../entities/currentPlayer';
import PlayersList from '../entities/playerList';
import RoomList from '../entities/roomList';
import reg from './dispatchSubFuncs/reg';
import createRoom from './dispatchSubFuncs/createRoom';
import addUserToRoom from './dispatchSubFuncs/addUserToRoom';
import addShips from './dispatchSubFuncs/addShips';
import attack from './dispatchSubFuncs/attack';
import randomAttack from './dispatchSubFuncs/randomAttack';

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
			addShips(_data, _socket, _currPlayer, roomList);
		},
		attack: (_data: string, _socket: WebSocket, _currPlayer: CurrPlayer) => {
			attack(_data, _socket, _currPlayer);
		},
		randomAttack: (_data: string, _socket: WebSocket, _currPlayer: CurrPlayer) => {
			randomAttack(_data, _socket, _currPlayer);
		},
	};
};

export default gameDispatcher;
