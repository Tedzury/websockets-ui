import CurrPlayer from '../../entities/currentPlayer';
import RoomList from '../../entities/roomList';
declare const createRoom: (_socket: WebSocket, _currPlayer: CurrPlayer, roomList: RoomList) => void;
export default createRoom;
