import CurrPlayer from '../../entities/currentPlayer';
import PlayersList from '../../entities/playerList';
import RoomList from '../../entities/roomList';
declare const addUserToRoom: (_data: string, _socket: WebSocket, _currPlayer: CurrPlayer, playersList: PlayersList, roomList: RoomList) => void;
export default addUserToRoom;
