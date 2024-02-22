import Player from './player';
declare class Game {
    _players: Player[];
    _gameId: string;
    _currPlayer: number;
    constructor(players: Player[]);
    attack(indexPlayer: string, x: number, y: number): void;
    passTurn(): void;
}
export default Game;
