import {icons} from "../assets/icons.js";

export default function PersonalInfoCard({type, content, url}) {

    function getIconpath(icon)
    {
        for (let i = 0; i < icons.length; i++) {
            if(icons[i].id === icon)
            {
                return icons[i].icon
            }

        }
    }

    return (
        <>
            <div className="flex items-center col-start-2 col-end-8 box-content bg-pink-red h-16 md:h-20 lg:h-24 rounded-full drop-shadow-3xl justify-center">
                <div className="flex w-full ">
                    <a href={type !== "Pin" ? type === "Telephone" ? "tel://" + content : "mailto://" + content : " "} className="flex flex-row w-full">
                        <img
                            src={getIconpath(type)}
                            alt={type}
                            className={"fill-white ml-3 lg:ml-8 w-8 object-contain cursor-pointer"}>

                        </img>
                        <div className="flex lg:justify-center lg:w-full">
                            <span className="ml-3 lg:ml-8 text-white text-lg lg:text-3xl md:text-2xl font-medium">{content}</span>
                        </div>
                    </a>
                </div>
            </div>
        </>
    );
}