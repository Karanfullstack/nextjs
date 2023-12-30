import User from "@/models/userModel";
import {DB_CONNECTION} from "@/db/connection";
import {NextRequest, NextResponse} from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
 
export async function POST(req: NextRequest, res: NextResponse) {
	try {
		const {email, password} = await req.json();
		if (!email || !password) {
			return NextResponse.json(
				{message: "Please fill all fields"},
				{status: 400}
			);
		}

		// Database Connection
		await DB_CONNECTION();

		// check if user exists
		const user = await User.findOne({email});
		if (!user) {
			return NextResponse.json(
				{
					success: false,
					message: "User or Password Incorrect!",
				},
				{status: 400}
			);
		}
		// check Hashed Password;
		const matchPassword = await bcrypt.compare(password, user.password);
		if (!matchPassword) {
			return NextResponse.json(
				{
					success: false,
					message: "email or password incorrect",
				},
				{status: 400}
			);
		}

		const token = jwt.sign({id: user._id}, process.env.TOKEN_SECRET!, {
			expiresIn: "1d",
		});

		const response = NextResponse.json({
			message: "Login successful",
			success: true,
		});
		response.cookies.set("token", token, {
			httpOnly: true,
		});
		return response;
	} catch (error: any) {
		return NextResponse.json({success: false, message: error}, {status: 500});
	}
}
