import Player from './player';
declare class Room {
    _roomId: string;
    _roomPlayers: Player[];
    _playersReady: number;
    constructor();
    getRoomId(): string;
    getRoomInfo(): {
        roomId: string;
        roomUsers: {
            name: string;
            index: string;
        }[];
    };
    addPlayer(_player: Player): void;
    isRoomAvailable(): boolean;
    setShipsSent(): void;
    startGame(): void;
}
export default Room;
