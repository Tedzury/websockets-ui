import Player from './player';
declare class Game {
    _players: Player[];
    _gameId: string;
    _currPlayer: number;
    constructor(players: Player[]);
    attack(indexPlayer: string, x: number, y: number): void;
    randomAttack(indexPlayer: string): void;
    sendAlreadyShotFeedback(x: number, y: number, status: string): void;
    sendMissFeedback(x: number, y: number): void;
    sendShotFeedback(x: number, y: number): void;
    sendKillFeedback(x: number, y: number): void;
    declareVictory(lostPlayerId: string): void;
    passTurn(): void;
}
export default Game;
