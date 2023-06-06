import {Form, redirect, useLoaderData, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getActiveUserDetails, updateProfile, changeUserPhoto} from "../connection.js";


export async function loader({params}) {
    const LoggedUserData = await getActiveUserDetails();
    const userID = params.uid
    return {LoggedUserData, userID};
}

export async function action({request, params}) {

    const userData = {};
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateProfile(userData, params.uid)
    return redirect("/user/edit/")

}

export default function EditPersonal() {


    const {LoggedUserData, userID} = useLoaderData()

    const navigate = useNavigate();


    useEffect(() => {
        if (LoggedUserData.user_id === '') {
            navigate("/user/login");
        } else if (LoggedUserData.user_id != userID) {
            navigate("/user/" + LoggedUserData.user_id + "/edit/profile")
        }

    }, [LoggedUserData]);

    const placeHolder = {"Name": "Name", "Surname": "Surname", "Title": "Title"}

    if (LoggedUserData.profile.length > 0) {
        placeHolder.Name = LoggedUserData.name
        placeHolder.Surname = LoggedUserData.surname
        placeHolder.Title = LoggedUserData.title

    }

    const [data, setData] = useState({
        image_url: "",
    });
    const [errors, setErrors] = useState({
        image_url: "",
    });


    const handleImageChange = (e) => {
        let newData = { ...data };

        newData["image_url"] = e.target.files[0];
        setData(newData);
    };

    const doSubmit = async (e) => {
        e.preventDefault();
        const response = await changeUserPhoto(userID, data);
        if (response.status === 400) {
            setErrors(response.data);
        }

    };


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

                            {/*
                            <div
                                className="flex items-center col-start-2 col-end-8 box-content bg-transparent  drop-shadow-3xl justify-start">
                                <a className="text-center">
                                    <span className="font-bold text-white text-lg">Name</span>
                                </a>
                            </div>
                            <div
                                className="flex items-center col-start-2 col-end-8 box-content bg-transparent  drop-shadow-3xl justify-start">
                                <input className="bg-bone opacity-50 rounded-md  w-full lg:h-[3vh] indent-2"
                                       aria-label="Name"
                                       type="text"
                                       name="name"
                                       required="required"
                                       placeholder={placeHolder.Name}
                                />
                            </div>
                            <div
                                className="flex items-center col-start-2 col-end-8 box-content bg-transparent  drop-shadow-3xl justify-start">
                                <a className="text-center">
                                    <span className="font-bold text-white text-lg">Surname</span>
                                </a>
                            </div>
                            <div
                                className="flex items-center col-start-2 col-end-8 box-content bg-transparent  drop-shadow-3xl justify-start">
                                <input className="bg-bone opacity-50 rounded-md  w-full lg:h-[3vh] indent-2"
                                       aria-label="Surname"
                                       type="text"
                                       name="surname"
                                       required="required"
                                       placeholder={placeHolder.Surname}
                                />
                            </div>
                            */}
                            <div
                                className="flex items-center col-start-2 col-end-8 box-content bg-transparent  drop-shadow-3xl justify-start">
                                <a className="text-center">
                                    <span className="font-bold text-white text-lg">Title</span>
                                </a>
                            </div>
                            <div
                                className="flex items-center col-start-2 col-end-8 box-content bg-transparent  drop-shadow-3xl justify-start">
                                <input className="bg-bone opacity-50 rounded-md  w-full lg:h-[3vh] indent-2"
                                       aria-label="Title"
                                       type="text"
                                       name="title"
                                       required="required"
                                       placeholder={placeHolder.Title}
                                />
                            </div>
                            <div
                                className="flex items-center col-start-2 col-end-8 box-content bg-transparent  drop-shadow-3xl justify-start">
                                <input className="bg-bone opacity-50 rounded-md w-full lg:h-[3vh] indent-1 text-sm"
                                       aria-label="image"
                                       type="file"
                                       name="image_url"
                                       accept="image/png, image/jpeg"
                                       onChange={(e) => {
                                           handleImageChange(e);
                                       }}
                                />
                            </div>
                            <div
                                className="flex items-center col-start-2 col-end-8 box-content bg-transparent drop-shadow-3xl justify-center">
                                <div
                                    className="flex box-content bg-back w-2/4 rounded-lg mb-[3vh] h-[4vh] lg:h-[5vh] min-h-[3rem] justify-center items-center">
                                    <button onClick={(e) => doSubmit(e)}>
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