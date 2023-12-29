"use client";
import React from "react";
import Link from "next/link";
import axios from "axios";
import {useRouter} from "next/navigation";
const ProfilePage = () => {
	// function for logout
	const router = useRouter();

	const logout = async () => {
		try {
			const res = await axios.get("/api/users/logout");
			console.log(res);
			router.push("/login");
		} catch (error) {}
	};
	return (
		<div className="flex flex-col gap-3 justify-center h-screen items-center">
			<h1 className="text-2xl uppercase font-black">Profile Page</h1>
			<button
				onClick={logout}
				className="p-3  bg-purple-300 rounded-md text-1xl"
			>
				Logout
			</button>
		</div>
	);
};

export default ProfilePage;
