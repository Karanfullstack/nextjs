import {getDataFromToken} from "@/helpers/getCurrentUser";
import {DB_CONNECTION} from "@/db/connection";
import {NextRequest, NextResponse} from "next/server";
import User from "@/models/userModel";

export async function GET(request: NextRequest) {
	try {
		const userId = getDataFromToken(request);
		const user = await User.findOne({_id: userId}).select(
			"-password -__v -isAdmin"
		);

		return NextResponse.json(
			{
				success: true,
				mesaaage: "User found",
				user,
			},
			{status: 200}
		);
	} catch (error: any) {
		return NextResponse.json({error: error.message}, {status: 400});
	}
}
