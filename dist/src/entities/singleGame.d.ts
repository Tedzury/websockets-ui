import Player from './player';
import Bot from './bot';
declare class SingleGame {
    _players: [Player, Bot];
    _gameId: string;
    _currPlayer: number;
    constructor(player: Player, bot: Bot);
    attack(indexPlayer: string, x: number, y: number): void;
    randomAttack(indexPlayer: string): void;
    sendAlreadyShotFeedback(x: number, y: number, status: string): void;
    sendMissFeedback(x: number, y: number): void;
    sendShotFeedback(x: number, y: number): void;
    sendKillFeedback(x: number, y: number): void;
    declareVictory(lostPlayerId: string): void;
    passTurn(): void;
}
export default SingleGame;
