import { randomUUID } from 'crypto';
import Player from './player';
import Bot from './bot';
import SingleGame from './singleGame';

class SingleRoom {
	_roomId: string;
	_roomPlayer: Player;
	_roomBot: Bot;
	constructor(player: Player, bot: Bot) {
		this._roomId = randomUUID();
		this._roomPlayer = player;
		this._roomBot = bot;
	}
	setShipsSent() {
		new SingleGame(this._roomPlayer, this._roomBot);
	}
}

export default SingleRoom;
