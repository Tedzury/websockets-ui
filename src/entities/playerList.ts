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
	removePlayer(_player_id: string) {
		this._list = this._list.filter((player) => player._id !== _player_id);
	}
	getUpdateWinnersData () {
		return this._list.map((player) => player.getWinsData()).filter((winner) => winner.wins > 0);
	}
}

export default PlayersList;
