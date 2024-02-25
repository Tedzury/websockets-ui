import Player from '../../entities/player';
import { MSG_TYPES } from '../../constants/constants';
import Bot from '../../entities/bot';
import SingleRoom from '../../entities/singleRoom';
import messageWrapper from '../../helpers/messageWrapper';

const singlePlay = (currPlayer: Player) => {
	const myBot = new Bot();
	const singleRoom = new SingleRoom(currPlayer, myBot);
	currPlayer._room = singleRoom;
	currPlayer._room_id = singleRoom._roomId;
	currPlayer._socket.send(
		messageWrapper(MSG_TYPES.CREATE_GAME, {
			idGame: currPlayer._room_id,
			idPlayer: myBot._id,
		}),
	);
};

export default singlePlay;
