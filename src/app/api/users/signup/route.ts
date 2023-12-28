import {DB_CONNECTION} from "@/db/connection";
import User from "@/models/userModel";
import {NextRequest, NextResponse} from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
	try {
		const {email, password, username} = await request.json();
		if (!username || !email || !password) {
			return NextResponse.json(
				{error: "Please fill all fields"},
				{status: 400}
			);
		}
		console.log(email, password, username);
		await DB_CONNECTION();

		// finding user if exists
		const user = await User.findOne({email});
		if (user) {
			return NextResponse.json({error: "User already exists"}, {status: 400});
		}
		// hashing password;
		const hashedPassword = await bcrypt.hash(password, 10);
		// creating new user
		const newUser = new User({
			username,
			email,
			password: hashedPassword,
		});
		// saving user
		await newUser.save();
		// returning user
		return NextResponse.json(
			{message: "User Registered Done", success: true, user: newUser},
			{status: 201}
		);
	} catch (error: any) {
		return NextResponse.json({error: error.message}, {status: 500});
	}
}
