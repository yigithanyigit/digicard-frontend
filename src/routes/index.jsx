import {Outlet} from "react-router-dom";
import Footer from "../components/footer.jsx";


export default function Index() {
    return (
        <>
            <div className="bg-back h-full min-h-screen">
                <div className="flex flex-col justify-center items-center">
                    <div id="Header" className="flex justify-around items-center w-full h-full">
                        <span className="text-bone font-bold text-3xl">SwipeTag</span>
                        <div id={"Login Button"} className={"flex justify-center items-center  h-[4vh] bg-bone  rounded-xl bg-pink-red mt-3"}>
                            <a href={"/user/login/"}>
                                <span className={"text-bone font-bold text-md text-center p-4"}>Login</span>
                            </a>
                        </div>
                    </div>
                    <div id="Hero">
                        <div className={"flex box-content w-full h-[25vh] bg-pink-red mt-8 rounded-xl  items-center justify-center "}>
                            <span className={"text-bone font-bold text-3xl text-center p-4"}>A Next Gen Business Card Created By Business Owners</span>
                        </div>
                        <div className={"flex flex-col mt-8 justify-center "}>
                            <span className={"text-bone font-bold text-3xl text-center p-4"}>Share Anything You Want With One Tap</span>
                        </div>
                        <ul className={"flex flex-col mt-8 justify-center "} type={"disc"}>
                            <li className={"text-bone font-bold text-xl text-center p-1"}>- Social Medias</li>
                            <li className={"text-bone font-bold text-xl text-center p-1"}>- Location</li>
                            <li className={"text-bone font-bold text-xl text-center p-1"}>- Telephone Number</li>
                            <li className={"text-bone font-bold text-xl text-center p-1"}>- Save Contact Feature</li>
                        </ul>
                        <div className={"flex flex-col box-content w-full h-[25vh] bg-pink-red mt-8 rounded-xl  items-center justify-center "}>
                            <span className={"text-bone font-bold text-2xl text-center p-4"}>For More Information Please Mail</span>
                            <div className={"flex flex-col box-content w-3/4 h-[10vh] bg-bone mt-4 mb-4 rounded-3xl  items-center justify-center"}>
                                <span className={"text-pink-red font-bold text-xl text-center p-1"}>yigithanyigit35@gmail.com</span>
                            </div>
                        </div>
                    </div>
                    <footer id="flex footer" className="w-full">
                        <Footer/>
                    </footer>
                </div>
            </div>
        </>

    );

}