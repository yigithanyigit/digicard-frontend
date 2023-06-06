import {useRouteError} from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <>
            <div className="bg-back h-full min-h-screen">
                <div className="flex flex-col justify-center items-center">
                    <div id="Error">
                        <div className="justify-center items-center w-full h-full">
                            <span className="text-white font-bold text-3xl"> Oops Something Went Wrong.</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}