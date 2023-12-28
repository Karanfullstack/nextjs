"use client";
import Link from "next/link";
import React, {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";

const LoginPage = () => {
	const router = useRouter();
	const [user, setUser] = useState({
		email: "",
		password: "",
	});

	// onSubmit function
	const onSubmit = async () => {
		try {
			const response = await axios.post("/api/users/login", user);
			console.log(response);
			if (response.data.success) {
				console.log(response.data);
				router.push("/");
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<h1 className="text-2xl tracking-wider rounded-lg mb-10 text-center text-black py-3 px-4 bg-purple-300">
				Login
			</h1>

			<label className="text-1xl mb-2 mt-2" htmlFor="email">
				Email
			</label>
			<input
				className="text-black p-2 min-w-[300px] rounded-md outline-none"
				type="email"
				placeholder="email"
				value={user.email || ""}
				onChange={(e) => setUser({...user, email: e.target.value})}
			/>

			<label className="text-1xl mb-2 mt-2" htmlFor="email">
				Password
			</label>
			<input
				className="text-black p-2 min-w-[300px] rounded-md outline-none"
				type="password"
				placeholder="password"
				value={user.password || ""}
				onChange={(e) => setUser({...user, password: e.target.value})}
			/>
			<button
				onClick={onSubmit}
				className="p-2 bg-purple-300 text-black rounded-md mt-5 hover:bg-purple-400 duration-150"
			>
				Submit
			</button>
			<Link className="mt-3 text-gray-400" href="/signup">
				Not Registered Signup Here{">>"}{" "}
			</Link>
		</div>
	);
};

export default LoginPage;
