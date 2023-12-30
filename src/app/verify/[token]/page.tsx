"use client";

import {useParams} from "next/navigation";
import React, {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";

const VerifyUser = () => {
	const router = useRouter();
	const [verified, setVerified] = useState(false);
	const {token} = useParams();
	// function to verify user
	const verifyUser = async () => {
		try {
			const response = await axios.post("/api/users/verify", {token});
			if (response.data.success && response.data.verified) {
				setVerified(true);
				setTimeout(() => {
					router.push("/login");
				}, 2000);
			}
		} catch (error: any) {
			if (!error.response.data.succcess) {
				router.push("/login");
			}
			console.log(error);
		}
	};
	useEffect(() => {
		verifyUser();
	}, []);
	return (
		<div className="flex justify-center overflow-scroll h-screen items-center">
			<div className="flex flex-col justify-center items-center">
				<h1 className="text-3xl font-bold mb-2 text-center">
					Verify your account
				</h1>
				{verified && (
					<span className="text-2xl bg-green-500 text-black rounded-lg mt-2 p-2">
						Your account has been verified
					</span>
				)}
				{!verified && (
					<p className="text-center">
						Please wait while we verify your account...
					</p>
				)}
			</div>
		</div>
	);
};

export default VerifyUser;
