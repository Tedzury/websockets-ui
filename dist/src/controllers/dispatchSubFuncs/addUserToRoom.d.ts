import Player from '../../entities/player';
import PlayersList from '../../entities/playerList';
import RoomList from '../../entities/roomList';
declare const addUserToRoom: (data: string, currPlayer: Player, playersList: PlayersList, roomList: RoomList) => void;
export default addUserToRoom;
