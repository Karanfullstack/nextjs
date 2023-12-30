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
