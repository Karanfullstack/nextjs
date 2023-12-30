import {DB_CONNECTION} from "@/db/connection";
import User from "@/models/userModel";
import {NextRequest, NextResponse} from "next/server";
import {hashPasswordUtil} from "@/helpers/hashPasswordUtil";
import {sendMail} from "@/helpers/mailer";
import {serviceType} from "@/constants/sendType";


export async function POST(request: NextRequest) {
	try {
		const {email, password, username} = await request.json();
		if (!username || !email || !password) {
			return NextResponse.json(
				{message: "Please fill all fields"},
				{status: 400}
			);
		}

		// Databse Connection
		await DB_CONNECTION();

		// finding user if exists
		const user = await User.findOne({email});

		if (user) {
			return NextResponse.json({message: "User already exists"}, {status: 400});
		}
		// hashing password;
		const hashedPassword = await hashPasswordUtil(password);

		// creating new user
		const newUser = new User({
			username,
			email,
			password: hashedPassword,
		});
		// saving user
		await newUser.save();

		// sending email to verify user email
		const mailResponse = await sendMail({
			email: newUser.email,
			emailType: serviceType.VERIFY_EMAIL,
			userId: newUser._id,
		});
		// returning user
		return NextResponse.json(
			{
				message: "User Registered Verify Your Email",
				success: true,
				user: newUser,
				mailResponse,
			},
			{status: 201}
		);
	} catch (error: any) {
		console.log(error)
		return NextResponse.json({error: error.message}, {status: 500});
	}
}
