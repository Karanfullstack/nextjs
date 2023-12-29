import {DB_CONNECTION} from "@/db/connection";
import User from "@/models/userModel";
import {NextRequest, NextResponse} from "next/server";

type Params = {
	params: {
		id: string;
	};
};
export async function GET(request: NextRequest, {params}: Params) {
	try {
		const username = String(params.id).trim();

		await DB_CONNECTION();
		const user = await User.findOne({username}).select(
			"-password -__v -isAdmin"
		);

		if (!user)
			return NextResponse.json(
				{
					success: false,
					message: "User not found",
				},
				{status: 404}
			);
		return NextResponse.json(
			{success: true, message: "User found", user},
			{status: 200}
		);
	} catch (error: any) {
		return NextResponse.json(
			{success: false, message: "Server error", error: error.message},
			{status: 500}
		);
	}
}
