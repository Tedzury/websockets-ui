import { CoordTuple } from '../constants/types';
declare const getShipCells: (direction: boolean, x: number, y: number, length: number) => {
    shipCells: CoordTuple[];
    surroundingCells: CoordTuple[];
};
export default getShipCells;
