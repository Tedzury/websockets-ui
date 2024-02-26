import PlayersList from '../entities/playerList';
import Player from '../entities/player';
import RoomList from '../entities/roomList';
declare class GameDispatcher {
    _roomList: RoomList;
    _playersList: PlayersList;
    _currPlayer?: Player;
    constructor(roomList: RoomList, playersList: PlayersList);
    setCurrentPlayer(currPlayer: Player): void;
    reg(data: string, socket: WebSocket): void;
    create_room(): void;
    add_user_to_room(data: string): void;
    add_ships(data: string): void;
    attack(data: string): void;
    randomAttack(data: string): void;
    single_play(): void;
}
export default GameDispatcher;
