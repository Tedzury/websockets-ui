import CurrPlayer from "../entities/currentPlayer";
import PlayersList from "../entities/playerList";
import RoomList from "../entities/roomList";
import reg from "./dispatchSubFuncs/reg";
import createRoom from "./dispatchSubFuncs/createRoom";
import addUserToRoom from "./dispatchSubFuncs/addUserToRoom";

const gameDispatcher = (playersList: PlayersList, roomList: RoomList) => {
	return {
		reg: (_data: string, _socket: WebSocket, _currPlayer: CurrPlayer) => {
			reg(_data, _socket, _currPlayer, playersList, roomList);
		},
		create_room: (_: string, _socket: WebSocket, _currPlayer: CurrPlayer) => {
			createRoom(_socket, _currPlayer, roomList);
		},
		add_user_to_room: (_data: string, _socket: WebSocket, _currPlayer: CurrPlayer) => {
			addUserToRoom(_data, _socket, _currPlayer, playersList, roomList)
		}
	};
}

export default gameDispatcher;
