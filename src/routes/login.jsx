import {Form, redirect, useActionData} from "react-router-dom";
import {login} from "../connection.js";
import {useState} from "react";


export async function action({request}) {

    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    const {user, status, message} = await login(updates);
    console.log(user, status, message)
    if (status === 200) {
        return redirect("/user" + "/profile/" + user)
    } else {
        const errors = {};
        if (status === 401)
        {
            errors.message = message
        }

        return errors
    }
}

export default function Login() {

    const errors = useActionData()

    return (<>
            <div className="flex flex-col items-center justify-center box-content h-[90vh]">
                <div
                    className="flex flex-col box-content w-[50vw] lg:w-[25vw] h-[35vh] rounded-lg bg-pink-red justify-center items-center">
                    <Form method="post" id="loginForm">
                        <div className="flex flex-col justify-center items-center">
                            <span className="text-bone font-bold mt-4">Username</span>
                            <input className="bg-bone opacity-50 rounded-md mt-2 lg:w-full w-5/6 indent-2"
                                   aria-label="Username"
                                   type="text"
                                   name="username"
                                   required="required"
                            />
                            <span className="text-bone font-bold mt-4">Password</span>
                            <input className="bg-bone opacity-50 rounded-md mt-2 lg:w-full w-5/6 indent-2"
                                   aria-label="Password"
                                   type="password"
                                   name="password"
                                   required="required"
                            />
                        </div>
                        <div className=" mt-7 flex flex-col items-center justify-center inset-x-0 inset-y-3/5 ">
                            <button type="submit"
                                    className="text-bone font-bold text-xl box-content bg-back rounded-md p-2 px-5">Login
                            </button>
                        </div>
                        {errors?.message &&
                            <div className='flex items-center justify-center text-center p-2'>
                                <span>{errors.message}</span>
                            </div>
                        }
                    </Form>
                </div>
            </div>

        </>);
}