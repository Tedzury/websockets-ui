const messageWrapper = (type: string, data: object) => {
	console.log(`Sending message with type: ${type} and following data: ${JSON.stringify(data)}`);
	return JSON.stringify({
		type,
		data: JSON.stringify(data),
		id: 0,
	});
};

export default messageWrapper;
