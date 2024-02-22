import Player from './player';
declare class PlayersList {
    _list: Player[];
    constructor();
    checkActivePlayer(_name: string): undefined | Player;
    addPlayer(_player: Player): void;
    removePlayer(_player_id: string): void;
    getPlayerById(_player_id: string): Player;
    getUpdateWinnersData(): {
        name: string;
        wins: number;
    }[];
}
export default PlayersList;
