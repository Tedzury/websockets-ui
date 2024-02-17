import Player from "./player";

class PlayersList {
	_list: Player[];
	constructor() {
		this._list = [];
	}
	checkActivePlayer(_name: string): undefined | Player {
		return this._list.find((player) => player.getPlayerName() === _name);
	}
	addPlayer (_player: Player) {
		this._list.push(_player);
	}
}

export default PlayersList;
