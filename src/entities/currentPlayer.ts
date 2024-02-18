import Player from "./player";

class CurrPlayer {
	_player_entity: unknown | Player;
	constructor () {
		this._player_entity;
	}
	getPlayer () {
		return this._player_entity as Player;
	}
	setPlayer (player: Player) {
		this._player_entity = player;
	}
};

export default CurrPlayer;
