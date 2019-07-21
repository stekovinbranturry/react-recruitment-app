export const getRirectPath = ({ identity, avatar }) => {
	let url = identity === 'hunter' ? '/hunter' : '/seeker';

	return !avatar ? (url += '-profile') : url;
};
