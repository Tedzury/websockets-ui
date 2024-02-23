import CurrPlayer from '../../entities/currentPlayer';
import RoomList from '../../entities/roomList';
import validateJson from '../../helpers/validateJson';

const addShips = (_data: string, _socket: WebSocket, _currPlayer: CurrPlayer, roomList: RoomList) => {
	const currPlayer = _currPlayer.getPlayer();
	const { ships } = validateJson(_data);
	currPlayer._shipsSchema = ships;
	const playerRoom = roomList.getRoomById(currPlayer._room_id);
	playerRoom.setShipsSent();
};

export default addShips;
