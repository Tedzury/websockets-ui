import Player from '../../entities/player';
import PlayersList from '../../entities/playerList';
import RoomList from '../../entities/roomList';
declare const reg: (data: string, socket: WebSocket, setCurrentPlayer: (currPlayer: Player) => void, playersList: PlayersList, roomList: RoomList) => void;
export default reg;
