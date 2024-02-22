import { CoordTuple, ShipObjType } from '../constants/types';
import Ship from './ship';
declare class ShipsList {
    _shipList: Ship[];
    _lastKilledSurrCells?: CoordTuple[];
    constructor(shipsArr: ShipObjType[]);
    checkShipHit(x: number, y: number): void;
}
export default ShipsList;
