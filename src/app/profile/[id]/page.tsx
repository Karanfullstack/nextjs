"use client";
import React, {useEffect, useState} from "react";
import axios, {CancelToken} from "axios";

type User = {
	username: string;
	email: string;
};

const UserProfile = ({params}: any) => {
	const username = params.id;
	console.log(username);
	const [user, setUser] = useState<User | null>(null);
	const [errorMessag, setErrorMessage] = useState<string | null>(null);
	const getUser = async (canceltoken: CancelToken) => {
		try {
			const res = await axios.get(`/api/users/profile/${username}`);
			canceltoken = canceltoken;
			if (res.data.success) {
				console.log(res);
				setUser(res.data.user);
			}
		} catch (error: any) {
			console.log(error);
			setErrorMessage(error.response.data.message);
		}
	};

	useEffect(() => {
		const canceltoken = axios.CancelToken.source();
		getUser(canceltoken.token);
	}, []);
	return (
		<div className="flex justify-center items-center h-screen">
			<h1 className="text-3xl">
				User Profile Page{" "}
				<span className="bg-purple-300 rounded-lg text-black p-1">
					{errorMessag ? errorMessag: user && user.email}
				</span>
			</h1>
		</div>
	);
};

export default UserProfile;
