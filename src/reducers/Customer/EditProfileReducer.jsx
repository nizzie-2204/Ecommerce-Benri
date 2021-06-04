export const editProfileReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case "Edit_Profile":
			return { state };

		default:
			return state;
	}
};
