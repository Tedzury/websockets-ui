export type ShipType = {
	position: {
		x: number;
		y: number;
	};
	direction: boolean;
	length: number;
	type: 'small' | 'medium' | 'large' | 'huge';
};

export type ShipObjType = {
	direction: boolean;
	position: {
		x: number;
		y: number;
	};
	length: number;
};

export type CoordTuple = [number, number];

export type hitStatuses = 'miss' | 'shot' | 'killed';

export type CellProps = { status: hitStatuses | 'unknown' };
