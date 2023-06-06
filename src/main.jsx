import React from "react";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./error-page.jsx";
import Hero, {loader as userLoader} from "./routes/hero.jsx";
import Login from "./routes/login.jsx";
import Register from "./routes/register.jsx";
import Edit, {loader as editLoader} from "./routes/edit.jsx";


import {action as loginAction} from "./routes/login.jsx";
import EditPersonal, {loader as editPersonalLoader, action as editPersonalAction} from "./routes/editPersonal.jsx";
import EditPersonalInfo, {loader as editPersonalInfoLoader, action as addPersonalInfoAction} from "./routes/editPersonalInfo.jsx";
import EditSocials, {loader as editSocialLoader} from "./routes/editSocials.jsx";
import AddSocial, {loader as addSocialLoader, action as addSocialAction} from "./routes/addSocial.jsx";
import ChangePassword, {loader as changePasswordLoader, action as changePasswordAction} from "./routes/changePassword.jsx";





const router = createBrowserRouter([
    {
        path: "user",
        element: <Root/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "profile/:id",
                element: <Hero/>,
                loader: userLoader,
            },
            {
                path: "login",
                element: <Login/>,
                action: loginAction
            },
            {
                path: "register",
                element: <Register/>,
            },
            {
                path: "edit",
                element: <Edit/>,
                loader: editLoader,
            },
            {

                path: ":uid/edit/profile",
                element: <EditPersonal/>,
                loader: editPersonalLoader,
                action: editPersonalAction,

            },
            {

                path: ":uid/edit/details",
                element: <EditPersonalInfo/>,
                loader: editPersonalInfoLoader,
                action: addPersonalInfoAction,

            },
            {

                path: ":uid/edit/social",
                element: <EditSocials/>,
                loader: editSocialLoader,



            },
            {
                path: ":uid/edit/social/:contentid",
                element: <AddSocial/>,
                loader: addSocialLoader,
                action: addSocialAction,
            },
            {
                path: ":uid/add/social",
                element: <AddSocial/>,
                loader: addSocialLoader,
                action: addSocialAction,

            },
            {
                path: ":uid/change/password",
                element: <ChangePassword/>,
                loader: changePasswordLoader,
                action: changePasswordAction,
            }
        ]

    },


]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);