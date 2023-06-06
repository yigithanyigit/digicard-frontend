import {Form, redirect, useLoaderData, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {getActiveUserDetails, addSocial, getSocialTypes, getSocial, deleteSocial, updateSocial} from "../connection.js";


export async function action({request, params}) {

    const formData = await request.formData();
    const updates = Object.fromEntries(formData);

    console.log(updates)
    switch (request.method) {
        case "DELETE":
            await deleteSocial(params.contentid)
            console.log("Delete")
            break;
        case "PUT":
            await updateSocial(updates, params.uid, params.contentid)
            console.log("Update")
            break;
        case "POST":
            await addSocial(updates, params.uid);
            console.log("Post")

    }

    return redirect("/user/" + updates.user_id + "/edit/social")

}



export async function loader({params}) {
    const LoggedUserData = await getActiveUserDetails();
    const userID = params.uid
    const choices = await getSocialTypes()
    const SocialData = {}
    if(params.contentid){
        SocialData.data = await getSocial(params.contentid)
    }
    return {LoggedUserData, userID, choices, SocialData};
}

export default function AddSocial() {

    const {LoggedUserData, userID, choices, SocialData} = useLoaderData()

    const navigate = useNavigate();

    useEffect(() => {
        if (LoggedUserData.user_id === '')
        {
            navigate("/user/login");
        }
        else if(LoggedUserData.user_id != userID)
        {
            navigate("/user/" + LoggedUserData.user_id + "/add/social")
        }



    }, [LoggedUserData]);


    return (<>
        <div className="flex flex-col items-center justify-center box-content h-[90vh]">
            <div id="editProfileText" className="box-content min-h-[3rem] h-[5vh]">
                <span className="text-2xl font-bold text-white">Add Social</span>
            </div>
            <Form className="flex" method="post" id="socialEditForm">
                <div className="flex bg-pink-red justify-center items-center rounded-lg mb-3 w-[80vw] lg:w-[30vw]">

                    <div id="editGrid"
                         className="flex flex-col grid grid-cols-8 gap-4 lg:gap-8 items-center justify-center mt-4 w-full lg:w-3/4">
                        <div
                            className="flex items-center col-start-2 col-end-8 box-content bg-transparent  drop-shadow-3xl justify-start">
                            <a className="text-center">
                                <span className="font-bold text-white text-lg">Type</span>
                            </a>
                        </div>

                        <div
                            className="flex items-center col-start-2 col-end-8 box-content bg-transparent  drop-shadow-3xl justify-start">
                            <select id="type" name="type" defaultValue={SocialData?.data?.type} className={"bg-bone opacity-50 rounded-md  w-full lg:h-[3vh] indent-2 "}  disabled={!!SocialData?.data?.type}>
                                {choices.choices.map((data, index) => <option  key={index + 1} value={data}>{data}</option>)}
                            </select>
                        </div>
                        <div
                            className="flex items-center col-start-2 col-end-8 box-content bg-transparent  drop-shadow-3xl justify-start">
                            <a className="text-center">
                                <span className="font-bold text-white text-lg">URL/Number</span>
                            </a>
                        </div>
                        <div
                            className="flex items-center col-start-2 col-end-8 box-content bg-transparent  drop-shadow-3xl justify-start">
                            <input className="bg-bone opacity-50 rounded-md  w-full lg:h-[3vh] indent-2"
                                   aria-label="Url"
                                   type="text"
                                   name="url"
                                   required="required"
                                   placeholder={SocialData?.data?.url ? SocialData?.data.url : "Url"}
                                   defaultValue={SocialData?.data?.url ? SocialData?.data.url : ""}
                            />
                        </div>

                        <div
                            className={"flex items-center col-start-1 col-end-5 box-content bg-transparent drop-shadow-3xl justify-center " + (SocialData?.data?.type ? "" : "hidden") }>
                            <div
                                className="flex box-content bg-back w-2/4 rounded-xl mb-[3vh] h-[4vh] lg:h-[5vh] min-h-[3rem] justify-center items-center">
                                <button formMethod={"delete"}>
                                    <span className="text-white text-md font-bold">Delete</span>
                                </button>
                            </div>
                        </div>
                        <div
                            className={"flex items-center box-content bg-transparent drop-shadow-3xl justify-center " + (SocialData?.data?.type ? "col-start-5 col-end-9" : "col-start-2 col-end-8") }>
                            <div
                                className="flex box-content bg-back w-2/4 rounded-xl mb-[3vh] h-[4vh] lg:h-[5vh] min-h-[3rem] justify-center items-center">
                                <button formMethod={(SocialData?.data?.type ? "put" : "post")}>
                                    <span className="text-white text-md font-bold">Save</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </div>

    </>);

}