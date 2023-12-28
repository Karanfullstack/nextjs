import React from "react";

const UserProfile = ({params}: any) => {
	return (
		<div className="flex justify-center items-center h-screen">
			<h1 className="text-3xl">
				User Profile Page <span className="bg-purple-300 rounded-lg text-black p-1">{params.id}</span>
			</h1>
		</div>
	);
};

export default UserProfile;
