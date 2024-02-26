import { CellProps } from '../constants/types';

const getRandomCoords = (enemyField: CellProps[][]) => {
	let x: number;
	let y: number;

	rows: for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			if (enemyField[j][i].status === 'unknown') {
				x = j;
				y = i;
				break rows;
			}
		}
	}
	return [x, y];
};

export default getRandomCoords;
