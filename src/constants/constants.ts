const MSG_TYPES = {
	REG: 'reg',
	UPDATE_ROOM: 'update_room',
	UPDATE_WINNNERS: 'update_winners',
	CREATE_ROOM: 'create_room',
	ADD_USER_TO_ROOM: 'add_user_to_room',
	CREATE_GAME: 'create_game',
	ADD_SHIPS: 'add_ships',
	START_GAME: 'start_game',
	ERR: 'error',
};

const ERROR_MSGS = {
	UNEXPENTED_ERR: 'Something went wrong!',
	PLAYER_ALREADY_ACTIVE: "Current players is already active! You can't enter twice!",
	ALREADY_IN_ROOM: "Current player is already in room! You can't be in two rooms simultaneously!",
	OWN_ROOM: "It's own player's room. You can't add yourself twice in the room!",
};

export { MSG_TYPES, ERROR_MSGS };
