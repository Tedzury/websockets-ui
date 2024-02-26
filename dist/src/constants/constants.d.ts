declare const MSG_TYPES: {
    REG: string;
    UPDATE_ROOM: string;
    UPDATE_WINNNERS: string;
    CREATE_ROOM: string;
    ADD_USER_TO_ROOM: string;
    CREATE_GAME: string;
    ADD_SHIPS: string;
    START_GAME: string;
    TURN: string;
    ATTACK: string;
    FINISH: string;
    RANDOM_ATTACK: string;
    SINGLE_PLAY: string;
    ERR: string;
};
declare const ATTACK_STATUS: {
    MISS: string;
    KILLED: string;
    SHOT: string;
};
declare const USER_STATUS: {
    ONLINE: string;
    OFFLINE: string;
};
declare const ERROR_MSGS: {
    UNEXPENTED_ERR: string;
    PLAYER_ALREADY_ACTIVE: string;
    ALREADY_IN_ROOM: string;
    OWN_ROOM: string;
    ALREADY_SHOT_CELL: string;
    OPPONENTS_TURN: string;
    WRONG_PASS: string;
};
export { MSG_TYPES, ERROR_MSGS, ATTACK_STATUS, USER_STATUS };
