import { CellProps } from '../constants/types';

const prepareEnemyField = () => {
	const field: CellProps[][] = new Array(10)
		.fill('row')
		.map(() => new Array(10).fill('column').map(() => ({ status: 'unknown' })));
	return field;
};

export default prepareEnemyField;
