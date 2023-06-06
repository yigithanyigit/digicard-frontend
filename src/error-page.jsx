import {useRouteError} from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <>
            <div className="flex bg-back h-full min-h-screen items-center justify-center">
                <div className="flex justify-center items-center">
                    <div id="Error" className="flex justify-center items-center w-full h-full">
                        <div className="flex justify-center items-center w-full h-full">
                            <span className="text-white font-bold text-3xl text-center"> Oops Something Went Wrong.</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}