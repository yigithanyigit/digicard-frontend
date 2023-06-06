import {Outlet, Link, useLoaderData} from "react-router-dom";
import Footer from "../components/footer.jsx";
import {useEffect, useState} from "react";
import {client, getActiveUserDetails, getUser, getUserProfile, getUserSocials} from "../connection.js";

import axios from "axios";
import LoadingSpinner from "../components/loadingSpinner.jsx";
import {act} from "react-dom/test-utils";


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;



export default function Root() {


    // context param pass: https://stackoverflow.com/questions/63765196/pass-props-to-outlet-in-react-router-v6



    return (
        <>
            <div className="bg-back h-full min-h-screen">
                <div className="flex flex-col justify-center items-center">
                    <div id="Hero">
                        <Outlet/>
                    </div>
                    <footer id="flex footer" >
                        <Footer/>
                    </footer>
                </div>
            </div>
        </>

    );



}