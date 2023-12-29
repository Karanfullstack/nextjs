import {NextRequest} from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
	try {
		const secret = process.env.TOKEN_SECRET!;

		const token = request.cookies.get("token")?.value || "";
		console.log(token);
		const decodedToken: any = jwt.verify(token, secret);
		return decodedToken.id;
	} catch (error: any) {
		throw new Error(error.message);
	}
};
