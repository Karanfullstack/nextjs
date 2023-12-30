import bcyrptjs from "bcryptjs";

export const hashPasswordUtil = async (password: string) => {
	try {
		const salt = await bcyrptjs.genSalt(10);
		const hashedPassword = await bcyrptjs.hash(password, salt);
		return hashedPassword;
	} catch (error) {
		throw error;
	}
};

export const comparePasswordUtil = async (
	password: string,
	hashedPassword: string
) => {
	try {
		const salt = await bcyrptjs.genSalt(10);
		const isMatch = await bcyrptjs.compare(password, hashedPassword);
		return isMatch;
	} catch (error) {
		throw error;
	}
};
