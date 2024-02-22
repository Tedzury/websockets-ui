import Player from './player';
declare class CurrPlayer {
    _player_entity: unknown | Player;
    constructor();
    getPlayer(): Player;
    setPlayer(player: Player): void;
}
export default CurrPlayer;
