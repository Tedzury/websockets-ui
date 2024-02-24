const getRandomTimeout = () => {
	return Math.floor(Math.random() * (1500 - 500 + 1) + 500);
};

export default getRandomTimeout;
