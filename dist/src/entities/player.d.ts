import { CellProps, ShipType } from '../constants/types';
import Game from './game';
import ShipsList from './shipsList';
import PlayersList from './playerList';
import SingleGame from './singleGame';
import SingleRoom from './singleRoom';
import Room from './room';
declare class Player {
    _name: string;
    _password: string;
    _error: boolean;
    _errorText: string;
    _status: string;
    _socket: WebSocket;
    _id: string;
    _wins: number;
    _playersList: PlayersList;
    _room: Room | SingleRoom;
    _room_id: string;
    _shipsSchema?: ShipType[];
    _game?: Game | SingleGame;
    _enemyField?: CellProps[][];
    _shipsList?: ShipsList;
    constructor(name: string, password: string, socket: WebSocket, playersList: PlayersList);
    getPlayerInfo(): {
        name: string;
        index: string;
        error: boolean;
        errorText: string;
    };
    getPlayerName(): string;
    addRoom(room: Room): void;
    removeRoom(): void;
    getPlayerRequisites(): {
        name: string;
        index: string;
    };
    getWinsData(): {
        name: string;
        wins: number;
    };
    gameCleanup(): void;
}
export default Player;
