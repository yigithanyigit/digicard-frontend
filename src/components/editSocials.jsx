import {getIconpath} from "../utils.js";

export default function EditSocial({social_id, url, type, user, index}) {


    const renderPageContent = () => {
        if ((index + 1) % 2 === 0) {
            return (<div
                className="flex items-center col-start-2 col-end-4 box-content bg-pink-red w-full h-24 lg:h-52 rounded-xl drop-shadow-3xl ">
                <a href={"/user/" + user + "/edit/social/" + social_id} className="flex flex-row w-full justify-center">
                    <img
                        src={getIconpath(type)}
                        alt={type}
                        className={"fill-white w-7 object-contain cursor-pointer"}>
                    </img>
                </a>
            </div>);
        } else {
            return (<div
                className="flex items-center col-start-6 col-end-8 box-content bg-pink-red w-full h-24 lg:h-52 rounded-xl drop-shadow-3xl">
                <a href={"/user/" + user + "/edit/social/" + social_id} className="flex flex-row w-full justify-center">
                    <img
                        src={getIconpath(type)}
                        alt={type}
                        className={"fill-white w-7 object-contain cursor-pointer"}>
                    </img>
                </a>
            </div>);
        }

    }


    return (<>
        {renderPageContent()}
    </>);
}