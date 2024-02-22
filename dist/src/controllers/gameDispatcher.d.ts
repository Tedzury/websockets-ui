import CurrPlayer from '../entities/currentPlayer';
import PlayersList from '../entities/playerList';
import RoomList from '../entities/roomList';
declare const gameDispatcher: (playersList: PlayersList, roomList: RoomList) => {
    reg: (_data: string, _socket: WebSocket, _currPlayer: CurrPlayer) => void;
    create_room: (_: string, _socket: WebSocket, _currPlayer: CurrPlayer) => void;
    add_user_to_room: (_data: string, _socket: WebSocket, _currPlayer: CurrPlayer) => void;
    add_ships: (_data: string, _socket: WebSocket, _currPlayer: CurrPlayer) => void;
    attack: (_data: string, _socket: WebSocket, _currPlayer: CurrPlayer) => void;
};
export default gameDispatcher;
