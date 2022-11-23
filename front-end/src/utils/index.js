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

export function getCookie(cName) {
	const name = cName + '=';
	const cDecoded = decodeURIComponent(document.cookie);
	const cArr = cDecoded.split('; ');
	let res;
	cArr.forEach((val) => {
		if (val.indexOf(name) === 0) res = val.substring(name.length);
	});
	return res;
}
