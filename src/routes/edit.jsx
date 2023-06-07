import {useLoaderData, useNavigate} from "react-router-dom";
import {getActiveUserDetails, getActiveUserId, logout} from "../connection.js";
import {useEffect, useState} from "react";

export async function loader({params}) {
    const LoggedUserData = await getActiveUserDetails();
    return {LoggedUserData};
}

export default function Edit() {

    const {LoggedUserData} = useLoaderData()

    const navigate = useNavigate();

    useEffect(() => {
        if (LoggedUserData.user_id === '') {
            navigate("/user/login");
        }

    }, [LoggedUserData]);

    const logoutHandle = () => {
        const fetch = async () => {
            await logout()
        }

        fetch()
        navigate("/user")
    }

    // TODO If User is not logged in route to the login page

    return (<>
        <div className="flex flex-col items-center justify-center box-content h-[90vh]">
            <div id="editProfileText">
                <span className="text-2xl font-bold text-white">Edit Profile</span>
            </div>
            <div id="editGrid"
                 className="flex flex-col grid grid-cols-8 gap-12 lg:gap-24 items-center justify-center mt-10 lg:mt-20">
                <div
                    className="flex items-center col-start-2 col-end-8 box-content bg-pink-red h-16 md:h-20 lg:h-24 rounded-full drop-shadow-3xl justify-center">
                    <a href={"/user/" + LoggedUserData.user_id + "/edit/profile/"} className="text-center">
                        <span className="font-bold text-white text-xl">Edit Personal</span>
                    </a>
                </div>
                <div
                    className="flex items-center col-start-2 col-end-8 box-content bg-pink-red h-16 md:h-20 lg:h-24 rounded-full drop-shadow-3xl justify-center">
                    <a href={"/user/" + LoggedUserData.user_id + "/edit/details/"} className="text-center">
                        <span className="font-bold text-white text-xl">Edit Personal Info</span>
                    </a>
                </div>
                <div
                    className="flex items-center col-start-2 col-end-8 box-content bg-pink-red h-16 md:h-20 lg:h-24 rounded-full drop-shadow-3xl justify-center">
                    <a href={"/user/" + LoggedUserData.user_id + "/edit/social/"} className="text-center">
                        <span className="font-bold text-white text-xl">Edit Socials</span>
                    </a>
                </div>
                <div
                    className="flex items-center col-start-2 col-end-5 box-content bg-pink-red h-16 md:h-20 lg:h-24 rounded-full drop-shadow-3xl justify-center">
                    <button>
                        <a href={"/user/" + LoggedUserData.user_id +  "/change/password/"} className="text-center">
                            <span className="font-bold text-white text-lg">Change Password</span>
                        </a>
                    </button>
                </div>
                <div
                    className="flex items-center col-start-5 col-end-8 box-content bg-pink-red h-16 md:h-20 lg:h-24 rounded-full drop-shadow-3xl justify-center ">
                    <button onClick={logoutHandle}>
                        <a className="text-center">
                            <span className="font-bold text-white text-xl">Logout</span>
                        </a>
                    </button>
                </div>
                <div
                    className="flex items-center col-start-2 col-end-8 box-content bg-pink-red h-16 md:h-20 lg:h-24 rounded-full drop-shadow-3xl justify-center">
                    <a href={"/user/profile" + LoggedUserData.user_id} className="text-center">
                        <span className="font-bold text-white text-xl">Return to Profile</span>
                    </a>
                </div>
            </div>
        </div>
    </>);

}