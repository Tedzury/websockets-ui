const MSG_TYPES = {
	REG: 'reg',
	UPDATE_ROOM: 'update_room',
	UPDATE_WINNNERS: 'update_winners',
	CREATE_ROOM: 'create_room',
	ERR: 'error',
}

const ERROR_MSGS = {
	UNEXPENTED_ERR: 'Something went wrong!',
	PLAYER_ALREADY_ACTIVE: 'Current players is already active! You can\'t enter twice!',
	ALREADY_IN_ROOM: 'Current player is already in room! You can\'t be in two rooms simultaneously!'
};

export { MSG_TYPES, ERROR_MSGS };
