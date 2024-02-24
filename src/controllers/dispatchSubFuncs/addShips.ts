import Player from '../../entities/player';
import RoomList from '../../entities/roomList';
import validateJson from '../../helpers/validateJson';

const addShips = (_data: string, _currPlayer: Player, roomList: RoomList) => {
	const { ships } = validateJson(_data);
	_currPlayer._shipsSchema = ships;
	const playerRoom = roomList.getRoomById(_currPlayer._room_id);
	playerRoom.setShipsSent();
};

export default addShips;
