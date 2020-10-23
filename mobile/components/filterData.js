export default (array, params) => {
	const keys = Object.keys(array);
	const value = Object.values(array);
	let zip = [];
	for (var i = 0; i < keys.length; i++) {
		zip.push({ uid: keys[i], value: value[i] });
	}
	const details = zip.filter((data) => data.uid === params);
};
