"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_MSGS = exports.MSG_TYPES = exports.ATTACK_STATUS = void 0;
var MSG_TYPES = {
    REG: 'reg',
    UPDATE_ROOM: 'update_room',
    UPDATE_WINNNERS: 'update_winners',
    CREATE_ROOM: 'create_room',
    ADD_USER_TO_ROOM: 'add_user_to_room',
    CREATE_GAME: 'create_game',
    ADD_SHIPS: 'add_ships',
    START_GAME: 'start_game',
    TURN: 'turn',
    ATTACK: 'attack',
    ERR: 'error',
};
exports.MSG_TYPES = MSG_TYPES;
exports.ATTACK_STATUS = {
    MISS: 'miss',
    KILLED: 'killed',
    SHOT: 'shot',
};
var ERROR_MSGS = {
    UNEXPENTED_ERR: 'Something went wrong!',
    PLAYER_ALREADY_ACTIVE: "Current players is already active! You can't enter twice!",
    ALREADY_IN_ROOM: "Current player is already in room! You can't be in two rooms simultaneously!",
    OWN_ROOM: "It's own player's room. You can't add yourself twice in the room!",
    ALREADY_SHOT_CELL: "You've already shoot that cell, it is pretty dumb to shoot it again, right? Try to choose another cell!",
    OPPONENTS_TURN: "It's not your turn now, opponent takes it's shot!",
};
exports.ERROR_MSGS = ERROR_MSGS;
