import { ShipObjType, CoordTuple } from './src/constants/types';
declare class ShipsList {
    _shipList: Ship[];
    _lastKilledSurrCells?: CoordTuple[];
    constructor(shipsArr: ShipObjType[]);
    checkShipHit(x: number, y: number): string;
}
declare class Ship {
    _shipCells: CoordTuple[];
    _surroundingCells: CoordTuple[];
    _health_points: number;
    _shipsList?: ShipsList;
    constructor(shipObj: ShipObjType, shipsList: ShipsList);
    checkHit(hitCoord: CoordTuple): string;
    checkAlive(): string;
    sendSurroundingCells(): void;
}
export default Ship;
