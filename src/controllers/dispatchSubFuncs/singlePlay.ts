import Player from '../../entities/player';
import { MSG_TYPES } from '../../constants/constants';
import Bot from '../../entities/bot';
import SingleRoom from '../../entities/singleRoom';
import messageWrapper from '../../helpers/messageWrapper';

const singlePlay = (_currPlayer: Player) => {
	const myBot = new Bot();
	const singleRoom = new SingleRoom(_currPlayer, myBot);
	_currPlayer._room = singleRoom;
	_currPlayer._room_id = singleRoom._roomId;
	_currPlayer._socket.send(
		messageWrapper(MSG_TYPES.CREATE_GAME, {
			idGame: _currPlayer._room_id,
			idPlayer: myBot._id,
		}),
	);
};

export default singlePlay;
