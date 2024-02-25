import Player from './player';
import Bot from './bot';
declare class SingleRoom {
    _roomId: string;
    _roomPlayer: Player;
    _roomBot: Bot;
    constructor(player: Player, bot: Bot);
    setShipsSent(): void;
}
export default SingleRoom;
