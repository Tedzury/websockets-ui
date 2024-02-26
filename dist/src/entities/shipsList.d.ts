import { CoordTuple, ShipObjType } from '../constants/types';
import Ship from './ship';
declare class ShipsList {
    _shipList: Ship[];
    _lastKilledSurrCells?: CoordTuple[];
    _shipsLeft: number;
    constructor(shipsArr: ShipObjType[]);
    checkShipHit(x: number, y: number): string;
    setLastKilledSurrCells(cells: CoordTuple[]): void;
    reduceShipsLeft(): void;
    checkNoShipsLeft(): boolean;
}
export default ShipsList;
