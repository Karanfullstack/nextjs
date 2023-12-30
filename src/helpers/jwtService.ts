import jwt from "jsonwebtoken";
import {JwtPayload} from "jsonwebtoken";
export const createAccessToken = (payload: object) => {
	return jwt.sign(payload, process.env.TOKEN_SECRET!, {expiresIn: "1d"});
};

export const veryfiyJwtToken = (payload: string) => {
	try {
		const decoded = jwt.verify(
			payload,
			process.env.TOKEN_SECRET!
		) as JwtPayload;
		return decoded;
	} catch (error: any) {
		return error;
	}
};
