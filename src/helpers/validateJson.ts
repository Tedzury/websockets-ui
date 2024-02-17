const validateJson = (_json: string) => {
	try {
		const parsedBody = JSON.parse(_json);
		if (parsedBody && typeof parsedBody === "object") {
				return parsedBody;
		}
	}
	catch (e) {
		return false;
	}
};

export default validateJson;
