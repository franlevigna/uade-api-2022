export const displayErrorMessage = (error) => {
	return error?.response?.data?.message || error.message;
};
