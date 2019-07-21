export const [REGISTER, LOGIN, JOBS_HUNTING] = [
	'REGISTER_SUCCESS',
	'LOGIN_SUCCESS',
	'JOBS_HUNTING'
];

export const createRegisterAction = payload => ({
	type: REGISTER,
	payload
});

export const createLoginAction = payload => ({
	type: LOGIN,
	payload
});

export const createJobsHuntingAction = payload => ({
	type: JOBS_HUNTING,
	payload
});

const initState = {
	user: {
		phone: '',
		identity: '',
		avatar: '',
		jobsHunting: [],
		jobsSeeking: []
	}
};

export default (state = initState, { type, payload }) => {
	switch (type) {
		case REGISTER:
			return {
				...state,
				user: payload
			};
		case LOGIN:
			return {
				...state,
				user: payload
			};
		case JOBS_HUNTING:
			return (state, payload) => {
				const newState = { ...state };
				newState.user.jobsHunting.push(payload);
				return newState;
			};
		default:
			return state;
	}
};
