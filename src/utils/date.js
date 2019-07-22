export const dateFormat = () => {
	const date = new Date();
	const [y, m, d, h, mi] = [
		date.getFullYear(),
		date.getMonth(),
		date.getDate(),
		date.getHours(),
		date.getMinutes()
	];
	return `${y}年${m}月${d}日 ${h}: ${mi}`;
};
