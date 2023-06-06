import {addSocial, changePassword, getActiveUserDetails} from "../connection.js";
import {Form, redirect, useLoaderData, useNavigate} from "react-router-dom";
import {useEffect} from "react";


export async function loader() {
    const LoggedUserData = await getActiveUserDetails();
    return {LoggedUserData};
}


export async function action({request, params}) {

    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    updates["user"] = params.uid
    const res = await changePassword(updates)
    console.log(res)
    return redirect("/user/edit")

}


export default function ChangePassword() {

    const {LoggedUserData} = useLoaderData()

    const navigate = useNavigate();

    useEffect(() => {
        if (LoggedUserData.user_id === '') {
            navigate("/user/login");
        }

    }, [LoggedUserData]);


    return (
        <>
            <div className="flex flex-col items-center justify-center box-content h-[90vh]">
                <div id="editProfileText" className="box-content min-h-[3rem] h-[5vh]">
                    <span className="text-2xl font-bold text-white">Edit Profile</span>
                </div>
                <Form method="post" id="profileEditForm">
                    <div className="flex  bg-pink-red justify-center items-center rounded-lg mb-3">
                        <div id="editGrid"
                             className="flex flex-col grid grid-cols-8 gap-6 lg:gap-8 items-center justify-center mt-4">
                            <div
                                className="flex items-center col-start-2 col-end-8 box-content bg-transparent  drop-shadow-3xl justify-start">
                                <a className="text-center">
                                    <span className="font-bold text-white text-lg">Old Password</span>
                                </a>
                            </div>
                            <div
                                className="flex items-center col-start-2 col-end-8 box-content bg-transparent  drop-shadow-3xl justify-start">
                                <input className="bg-bone opacity-50 rounded-md  w-full lg:h-[3vh] indent-2"
                                       aria-label="old_password"
                                       type="password"
                                       name="old_password"
                                       required="required"
                                       placeholder="Old Password"
                                />
                            </div>
                            <div
                                className="flex items-center col-start-2 col-end-8 box-content bg-transparent  drop-shadow-3xl justify-start">
                                <a className="text-center">
                                    <span className="font-bold text-white text-lg">New Password</span>
                                </a>
                            </div>
                            <div
                                className="flex items-center col-start-2 col-end-8 box-content bg-transparent  drop-shadow-3xl justify-start">
                                <input className="bg-bone opacity-50 rounded-md  w-full lg:h-[3vh] indent-2"
                                       aria-label="new_password"
                                       type="password"
                                       name="new_password"
                                       required="required"
                                       placeholder="New Password"
                                />
                            </div>
                            <div
                                className="flex items-center col-start-2 col-end-8 box-content bg-transparent  drop-shadow-3xl justify-start">
                                <a className="text-center">
                                    <span className="font-bold text-white text-lg">Confirm Password</span>
                                </a>
                            </div>
                            <div
                                className="flex items-center col-start-2 col-end-8 box-content bg-transparent  drop-shadow-3xl justify-start">
                                <input className="bg-bone opacity-50 rounded-md  w-full lg:h-[3vh] indent-2"
                                       aria-label="new_password_confirm"
                                       type="password"
                                       name="new_password_confirmation"
                                       required="required"
                                       placeholder="Confirm Password"
                                />
                            </div>
                            <div
                                className="flex items-center col-start-2 col-end-8 box-content bg-transparent drop-shadow-3xl justify-center">
                                <div
                                    className="flex box-content bg-back w-2/4 rounded-lg mb-[3vh] h-[4vh] lg:h-[5vh] min-h-[3rem] justify-center items-center">
                                    <button>
                                        <span className="text-white text-xl font-bold">Save</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
                <div id={"menuButton"} className={"flex justify-center items-center w-full h-[4vh] bg-bone mt-6 rounded-xl bg-pink-red items-center"}>
                    <a href={"/user/edit/"}>
                        <span className={"text-white font-bold text-xl text-center"}>Return To Menu</span>
                    </a>
                </div>
            </div>
        </>
    );

}