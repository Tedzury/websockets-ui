import { CellProps, ShipType } from '../constants/types';
import Game from './game';
import ShipsList from './shipsList';
declare class Player {
    _name: string;
    _password: string;
    _error: boolean;
    _errorText: string;
    _socket: WebSocket;
    _id: string;
    _wins: number;
    _room_id: string;
    _shipsSchema?: ShipType[];
    _game?: Game;
    _field?: CellProps[][];
    _shipsList: ShipsList;
    constructor(name: string, password: string, socket: WebSocket);
    getPlayerInfo(): {
        name: string;
        index: string;
        error: boolean;
        errorText: string;
    };
    getPlayerName(): string;
    addRoom(roomId: string): void;
    removeRoom(): void;
    getPlayerRequisites(): {
        name: string;
        index: string;
    };
    getWinsData(): {
        name: string;
        wins: number;
    };
}
export default Player;
