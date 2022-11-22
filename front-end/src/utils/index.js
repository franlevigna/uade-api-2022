export const displayErrorMessage = (error) => {
	return error.message;
};

export const debounce = (callbackFn, wait = 500) => {
	let timerId;
	return (...args) => {
		clearTimeout(timerId);
		timerId = setTimeout(() => {
			callbackFn(...args);
		}, wait);
	};
};
