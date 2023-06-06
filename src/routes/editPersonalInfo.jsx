import {Form, redirect, useLoaderData, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {getActiveUserDetails, updateProfileDetails} from "../connection.js";


export async function loader({params}) {
    const LoggedUserData = await getActiveUserDetails();
    const userID = params.uid
    return {LoggedUserData, userID};
}

export async function action({request, params}) {

    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    const res = await updateProfileDetails(updates, params.uid)
    return redirect("/user/edit/")

}

export default function EditPersonalInfo() {

    const {LoggedUserData, userID} = useLoaderData()


    const navigate = useNavigate();

    useEffect(() => {
        if (LoggedUserData.user_id === '')
        {
            navigate("/user/login");
        }
        else if(LoggedUserData.user_id != userID)
        {
            navigate("/user/" + LoggedUserData.user_id + "/edit/details")
        }

    }, [LoggedUserData]);

    const placeHolder = {"Telephone": "Telephone","Mail": "Mail","Pin": "Pin",}

    if(LoggedUserData.profile.length > 0)
    {
        LoggedUserData.profile.map((data) => {
            if(data.type === "Telephone")
            {
                placeHolder.Telephone = data.content
            }
             if(data.type === "Mail")
            {
                placeHolder.Mail = data.content
            }
             if(data.type === "Pin")
            {
                placeHolder.Pin = data.content
            }
        })
    }



    return (<>
        <div className="flex flex-col items-center justify-center box-content h-[90vh]">
            <div id="editProfileText" className="box-content min-h-[3rem] h-[5vh] text-center">
                <span className="text-2xl font-bold text-white">Edit Profile Details</span>
            </div>
            <Form method="post" id="profileEditForm">
                <div className="flex bg-pink-red justify-center items-center rounded-lg mb-3 w-[60vw] lg:w-[50vw]">
                    <div id="editGrid"
                         className="flex flex-col grid grid-cols-8 gap-4 lg:gap-8 items-center justify-center mt-4 w-full lg:w-1/2">
                        <div
                            className="flex items-center col-start-2 col-end-8 box-content bg-transparent  drop-shadow-3xl justify-start">
                            <a className="text-center">
                                <span className="font-bold text-white text-lg">Telephone</span>
                            </a>
                        </div>
                        <div
                            className="flex items-center col-start-2 col-end-8 box-content bg-transparent  drop-shadow-3xl justify-start">
                            <input className="bg-bone opacity-50 rounded-md  w-full lg:h-[3vh] indent-2"
                                   aria-label="Telephone"
                                   type="text"
                                   name="Telephone"
                                   required="required"
                                   placeholder={placeHolder.Telephone}
                                   defaultValue={placeHolder?.Telephone ? placeHolder.Telephone : " "}
                            />
                        </div>
                        <div
                            className="flex items-center col-start-2 col-end-8 box-content bg-transparent  drop-shadow-3xl justify-start">
                            <a className="text-center">
                                <span className="font-bold text-white text-lg">Mail</span>
                            </a>
                        </div>
                        <div
                            className="flex items-center col-start-2 col-end-8 box-content bg-transparent  drop-shadow-3xl justify-start">
                            <input className="bg-bone opacity-50 rounded-md  w-full lg:h-[3vh] indent-2"
                                   aria-label="Mail"
                                   type="text"
                                   name="Mail"
                                   required="required"
                                   placeholder={placeHolder.Mail}
                                   defaultValue={placeHolder?.Mail ? placeHolder.Mail : " "}
                            />
                        </div>
                        <div
                            className="flex items-center col-start-2 col-end-8 box-content bg-transparent  drop-shadow-3xl justify-start">
                            <a className="text-center">
                                <span className="font-bold text-white text-lg">Pin</span>
                            </a>
                        </div>
                        <div
                            className="flex items-center col-start-2 col-end-8 box-content bg-transparent  drop-shadow-3xl justify-start">
                            <input className="bg-bone opacity-50 rounded-md  w-full lg:h-[3vh] indent-2"
                                   aria-label="Pin"
                                   type="text"
                                   name="Pin"
                                   required="required"
                                   placeholder={placeHolder.Pin}
                                   defaultValue={placeHolder?.Pin ? placeHolder.Pin : " "}
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
    </>);

}