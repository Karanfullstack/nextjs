import nodemailer from "nodemailer";
import User from "@/models/userModel";
import {createAccessToken} from "./jwtService";
import {mailServiceType} from "@/types/types";

export const sendMail = async ({
	email,
	emailType,
	userId,
}: mailServiceType): Promise<any> => {
	try {
		const hashedToken = createAccessToken({id: userId});
		if (emailType === emailType) {
			await User.findByIdAndUpdate(userId, {
				verifyToken: hashedToken,
				verifyTokenExpiry: Date.now() + 3600000,
			});
		} else if ((emailType = emailType)) {
			await User.findByIdAndUpdate(userId, {
				forgetPasswordToken: hashedToken,
				forgetPasswordExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
			});
		}
		// Transporter service
		const transporter = nodemailer.createTransport({
			host: "sandbox.smtp.mailtrap.io",
			port: 2525,
			auth: {
				user: process.env.TRASNPORT_USER,
				pass: process.env.TRANSPORT_PASSWORD,
			},
		});
		const mailOptions = {
			from: "karan@gmail.com",
			to: email,
			subject: "Verify your email",
			text: `Click on the link to verify your email: ${process.env.DOMAIN}/verify/${hashedToken}`,
			html: `<p>Click on the link to verify your email: <a href="${process.env.DOMAIN}/verify/${hashedToken}">Verify Email</a></p>`,
		};
		const mailResponse = await transporter.sendMail(mailOptions);
		return mailResponse;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
