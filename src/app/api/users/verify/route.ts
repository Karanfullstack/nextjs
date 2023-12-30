import {NextRequest, NextResponse} from "next/server";
import {veryfiyJwtToken} from "@/helpers/jwtService";
import User from "@/models/userModel";
import {JwtPayload} from "jsonwebtoken";
import {DB_CONNECTION} from "@/db/connection";
export async function POST(request: NextRequest) {
	try {
		const {token} = await request.json();
		const {error, id} = veryfiyJwtToken(token) as JwtPayload;
		// DB_connection
		await DB_CONNECTION();
		// checking if user is already verified
		const user = await User.findById(id);
		if (!user) {
			return NextResponse.json(
				{success: false, error: "Token Expired"},
				{status: 404}
			);
		} else if (user && user.isveryfied) {
			return NextResponse.json(
				{
					success: true,
					verified: true,
					message: "User is already verified",
				},
				{status: 200}
			);
		}
		user.isveryfied = true;
		user.verifyToken = "";
		user.verifyTokenExpiry = "";
		await user.save();
		return NextResponse.json(
			{success: true, message: "User Verified Success", verified: true},
			{status: 200}
		);
	} catch (error) {
		return NextResponse.json({success: false, error}, {status: 500});
	}
}
