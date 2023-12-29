"use client";
import React, {useEffect, useState} from "react";

import axios, {CancelToken} from "axios";
import {useRouter} from "next/navigation";

const ProfilePage = () => {
	// function for logout
	const router = useRouter();
	const [user, setUser] = useState<any>(null);
	const logout = async () => {
		try {
			const res = await axios.get("/api/users/logout");
			console.log(res);
			router.push("/login");
		} catch (error) {}
	};
	// function to get current user
	const getUser = async (canceltoken: CancelToken) => {
		try {
			const res = await axios.get("/api/users/me");
			canceltoken = canceltoken;
			if (res.data.success) {
				console.log(res);
				setUser(res.data.user);
			}
		} catch (error: any) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		const canceltoken = axios.CancelToken;
		const source = canceltoken.source();
		getUser(source.token);
		return () => {
			source.cancel("axios return manullay request cancelled");
		};
	}, []);
	console.log(user);
	return (
		<div className="flex flex-col gap-3 justify-center h-screen items-center">
			<h1 className="text-2xl uppercase font-black">
				Profile Page{" "}
				<span className="bg-purple-400 px-3 py-2">{user && user.email}</span>
			</h1>
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
