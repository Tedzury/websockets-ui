import { ShipObjType, CoordTuple } from '../constants/types';
import ShipsList from './shipsList';
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
