export const getRirectPath = ({ identity }) =>
	identity === 'hunter' ? '/hunter-profile' : '/seeker-profile';
