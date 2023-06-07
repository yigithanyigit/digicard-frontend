import {useState, useEffect} from "react";
import {useLoaderData, useOutletContext} from "react-router-dom";

import PersonalInfoCard from "../components/personalInfoCard.jsx";
import example from "../constants/example.json";
import Socials from "../components/socials.jsx";

import {placeholders} from "../assets/photos.js";
import {getActiveUserDetails, getUser, getUserPhoto, getUserProfile, getUserSocials} from "../connection.js"


export async function loader({params}) {
    const user = await getUser(params.id);
    const userProfile = await getUserProfile(params.id);
    const userSocials = await getUserSocials(params.id);
    const LoggedUserData = await getActiveUserDetails();
    const userPhoto = await getUserPhoto(params.id)
    return {user, userProfile, userSocials, LoggedUserData, userPhoto};
}

export default function Hero() {

    const {user, userProfile, userSocials, LoggedUserData, userPhoto} = useLoaderData();
    const [selectedButton, setSelectedButton] = useState("PersonalInfo");


    const handleButtonClick = (button) => {
        if (button !== selectedButton) {
            setSelectedButton(button);
        }
    };

    const renderPageContent = () => {
        if (selectedButton === 'PersonalInfo') {
            return (<div id="personalInfo"
                         className="flex flex-col grid grid-cols-8 gap-12 lg:gap-24 items-center justify-center mt-10 lg:mt-20">
                {userProfile.map((card) => (<PersonalInfoCard key={card.content_id} {...card}/>))}
            </div>)
        } else if (selectedButton === 'SocialMedia') {
            return (
                <div
                    className="flex flex-col grid grid-cols-8 gap-y-5 lg:gap-y-12 items-center justify-center mt-6 lg:mt-12">
                    {userSocials.map((card, index) => (<Socials key={card.social_id} {...card} index={index}/>))}
                </div>);
        } else {
            return null;
        }
    }


    const editButton = () => {
        if(LoggedUserData.user_id === user.user_id)
        {
        return (
            <div className="flex box content h-[5vh] w-32 md:w-40 lg:w-48 bg-bone rounded-xl mt-5 items-center justify-center text-center">
                <a href={"/user/edit"}>
                    <span className="text-pink-red font-bold text-sm lg:text-lg">Edit Your Profile</span>
                </a>
            </div>)
        }

    }
    const generateVCF = (data, profile) => {
        let mail = null
        let tel = null
        if(profile.length > 0)
        {
            for (const cell of profile) {
                if(cell.type === "Mail")
                {
                    mail = cell.content
                }
                else if(cell.type === "Telephone")
                {
                    tel = cell.content
                }

            }
        }

        const contactData = `BEGIN:VCARD
VERSION:3.0
FN:${data.name} ${data.surname}
TEL;TYPE=CELL:${tel !== null ? tel : ''}
EMAIL:${mail !== null ? mail : ''}
END:VCARD`;

        const vcfBlob = new Blob([contactData], {type: "text/vcard"});
        const vcfURL = URL.createObjectURL(vcfBlob);

        const link = document.createElement("a");
        link.href = vcfURL;
        link.setAttribute("download", "contact.vcf");
        link.click();
    };


    return (<div>
            <div className="flex flex-col items-center box-content w-full h-full">
                {editButton()}
                <div className="flex flex-col relative justify-center items-center">
                    <div id="heroBox"
                         className="flex flex-col box-content h-full w-64 md:w-80 lg:w-96 my-5 bg-pink-red rounded-md items-center drop-shadow-3xl">
                        <div id="profilePic"
                             className="flex flex-col box-content h-28 w-28 lg:h-36 lg:w-36 md:h-28 md:w-28 my-5 bg-transparent items-center">
                            <img id="profileImg"
                                 className="rounded-full h-auto w-auto bg-transparent object-cover overflow-hidden"
                                 src={userPhoto.image == null ? placeholders[0].icon : userPhoto.image}
                            />
                        </div>
                        <div key={user.id}>
                            <div id="name" className="flex justify-around">
                                <span
                                    className="text-white text-2xl lg:text-5xl md:text-4xl font-bold py-2">{user.name} {user.surname}</span>
                            </div>
                            <div id="job" className="flex justify-center">
                                <span
                                    className="text-white text-lg lg:text-3xl md:text-2xl font-medium py-2 mb-8 text-center">{user.title}</span>
                            </div>
                        </div>
                    </div>
                    <div id="saveContactsBox"
                         className="flex absolute box-content w-36 md:w-44 lg:w-56 h-8 md:h-10 rounded-full bg-bone justify-center items-center drop-shadow-3xl bottom-0 left-15 lg:left-20 ">
                        <button id="saveContactButton" onClick={() => generateVCF(user, userProfile)}
                                className="text-pink-red text-lg lg:text-3xl md:text-2xl font-medium"> Save Contacts
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col grid grid-cols-8 justify-center pt-7">
                <button id="personalInfoButton"
                        className={`col-start-2 col-end-4 cursor-pointer button ${selectedButton === "PersonalInfo" ? `selected` : ``}`}
                        onClick={() => handleButtonClick("PersonalInfo")}>
                    <span className="text-bone text-lg lg:text-3xl md:text-2xl font-medium">Info</span>
                </button>
                <button id="socialMediaButton"
                        className={`col-start-6 col-end-8 cursor-pointer button  ${selectedButton === "SocialMedia" ? `selected` : ``}`}
                        onClick={() => handleButtonClick("SocialMedia")}>
                    <span className={`text-bone text-lg lg:text-3xl md:text-2xl font-medium`}>Socials</span>
                </button>
                <div
                    className={`flex justify-center h-2 rounded-full transition-transform duration-300 ${selectedButton === "PersonalInfo" ? "translate-x-0 col-start-2 col-end-4" : "translate-x-full col-start-4 col-end-6"}`}>
                    <div className="bg-pink-red box-content w-full h-full rounded-full"></div>
                </div>

            </div>
            <div className="overflow-y-scroll w-screen min-w-full lg:w-[76rem] box-content h-[26rem] lg:h-[56rem] ">
                {renderPageContent()}
            </div>
        </div>);
}