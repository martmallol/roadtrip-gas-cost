// 1st, 2nd, 3rd, 4th, 5th, 6th, 7th, 8th, 9th, 10th, etc.
export const numberSyntax = (number) => {
	let answer = '';
	let mod = number % 10;

	if(mod === 0 || (mod > 3 && mod < 10) || (number > 10 && number < 14)) {
		answer = `${number}th`;
	} else if (mod === 1) {
		answer = `${number}st`;
	} else if (mod === 2) {
		answer = `${number}nd`;
	} else {
		answer = `${number}rd`;
	}
	return answer;
};

export const getFuelType = (obj) => {
	if(obj.fuelType === "Regular Gas") {
		return "Conventional Regular Gasoline";
	} else if (obj.fuelType === "Medium Gas") {
		return "Gasoline Conventional Midgrade";
	} else if (obj.fuelType === "Premium Gas") {
		return "Conventional Premium Gasoline";
	} else {
		return "No 2 Diesel";
	}
}