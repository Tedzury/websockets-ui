const messageWrapper = (type: string, data: object) => {
	return JSON.stringify({
		type,
		data: JSON.stringify(data),
		id: 0,
	});
};

export default messageWrapper;
