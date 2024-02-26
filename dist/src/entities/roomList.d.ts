import Room from './room';
import PlayersList from './playerList';
import Player from './player';
declare class RoomList {
    _roomList: Room[];
    _playersList: PlayersList;
    constructor(playersList: PlayersList);
    informPlayers(): void;
    getRoomById(roomId: string): Room;
    createRoom(roomUser: Player): Room;
    deleteRoom(roomId: string): void;
    getAvailableRooms(): {
        roomId: string;
        roomUsers: {
            name: string;
            index: string;
        }[];
    }[];
}
export default RoomList;
