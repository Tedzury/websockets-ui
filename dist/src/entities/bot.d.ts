import { CellProps } from '../constants/types';
import ShipsList from './shipsList';
declare class Bot {
    _shipsList: ShipsList;
    _enemyField: CellProps[][];
    _id: string;
    constructor();
}
export default Bot;
