import {useLoaderData, useNavigate} from "react-router-dom";
import EditSocial from "../components/editSocials";
import {useEffect} from "react";
import {getActiveUserDetails} from "../connection.js";

export async function loader({params}) {
    const LoggedUserData = await getActiveUserDetails();
    const userID = params.uid
    return {LoggedUserData, userID};
}

export default function EditSocials() {

    const {LoggedUserData, userID} = useLoaderData()
    const navigate = useNavigate();

    useEffect(() => {
        if (LoggedUserData.user_id === '')
        {
            navigate("/user/login");
        }
        else if(LoggedUserData.user_id != userID)
        {
            navigate("/user/" + LoggedUserData.user_id + "/edit/social")
        }

    }, [LoggedUserData]);


    return <>
        <div className="flex flex-col items-center justify-evenly box-content h-[90vh]">
            <div id="editProfileText" className="box-content min-h-[3rem] h-[5vh]">
                <span className="text-2xl font-bold text-white">Edit Socials</span>
            </div>
            <div className="overflow-y-scroll w-screen min-w-full lg:w-[76rem] box-content h-1/2">
                <div
                    className="flex flex-col grid grid-cols-8 gap-y-4 lg:gap-y-8 items-center justify-center mt-6 lg:mt-12">
                    <div
                        className="flex items-center col-start-2 col-end-4 box-content bg-bone w-full h-24 lg:h-48 rounded-xl drop-shadow-3xl">
                        <a href={"/user/" + LoggedUserData.user_id + "/add/social/"} className="flex  w-full justify-center items-center">
                            <span className="text-pink-red font-bold text-2xl text-center">Add new</span>
                        </a>
                    </div>
                    {LoggedUserData.social.map((card, index) => (<EditSocial key={card.social_id} {...card} index={index}/>))}
                </div>
            </div>
            <div id={"menuButton"} className={"flex justify-center items-center w-2/4 h-[4vh] bg-bone mt-6 rounded-xl bg-pink-red items-center"}>
                <a href={"/user/edit/"}>
                    <span className={"text-white font-bold text-xl text-center"}>Return To Menu</span>
                </a>
            </div>
        </div>

    </>;

}