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
                errorElement: <ErrorPage/>,
            },
            {
                path: "login",
                element: <Login/>,
                action: loginAction,
                errorElement: <ErrorPage/>,
            },
            {
                path: "register",
                element: <Register/>,
                errorElement: <ErrorPage/>,
            },
            {
                path: "edit",
                element: <Edit/>,
                loader: editLoader,
                errorElement: <ErrorPage/>,
            },
            {

                path: ":uid/edit/profile",
                element: <EditPersonal/>,
                loader: editPersonalLoader,
                action: editPersonalAction,
                errorElement: <ErrorPage/>,

            },
            {

                path: ":uid/edit/details",
                element: <EditPersonalInfo/>,
                loader: editPersonalInfoLoader,
                action: addPersonalInfoAction,
                errorElement: <ErrorPage/>,

            },
            {

                path: ":uid/edit/social",
                element: <EditSocials/>,
                loader: editSocialLoader,
                errorElement: <ErrorPage/>,



            },
            {
                path: ":uid/edit/social/:contentid",
                element: <AddSocial/>,
                loader: addSocialLoader,
                action: addSocialAction,
                errorElement: <ErrorPage/>,
            },
            {
                path: ":uid/add/social",
                element: <AddSocial/>,
                loader: addSocialLoader,
                action: addSocialAction,
                errorElement: <ErrorPage/>,

            },
            {
                path: ":uid/change/password",
                element: <ChangePassword/>,
                loader: changePasswordLoader,
                action: changePasswordAction,
                errorElement: <ErrorPage/>,
            }
        ]

    },


]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);