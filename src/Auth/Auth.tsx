import { FcGoogle } from "react-icons/fc"
import { FiGithub } from "react-icons/fi"
import { CiMail } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { IoLockClosedOutline } from "react-icons/io5";
import { BiSolidShow } from "react-icons/bi";
import { BiShowAlt } from "react-icons/bi";
import { useState } from "react";
import { AuthForm } from "./AuthForm";
const Auth = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showLogin, setShowLogin] = useState<boolean>(false)
    return (
        <div className="flex flex-col gap-[20px] justify-center items-center w-full h-full p-[20px]">
            <h2 className="font-bold text-3xl">Code snippet Manager</h2>
            <h6>Sign in to manage your code snippet</h6>
            {!showLogin ?
                <AuthForm
                    buttonText="Create Account"
                    fields={[
                        {
                            label: "Name",
                            type: "text",
                            placeholder: "Enter Name",
                            icon: <IoPersonOutline className="text-2xl" />,
                            name: "name",
                        },
                        {
                            label: "Email",
                            type: "email",
                            placeholder: "Enter Email",
                            icon: <CiMail className="text-2xl" />,
                            name: "email",
                        },
                        {
                            label: "Password",
                            type: "password",
                            placeholder: "Enter Password",
                            icon: <IoLockClosedOutline className="text-2xl" />,
                            name: "password",
                        },
                    ]}
                    onSubmit={(values) => console.log("Register:", values)}
                />
                :
                <AuthForm
                    buttonText="Login"
                    fields={[
                        {
                            label: "Email",
                            type: "email",
                            placeholder: "Enter Email",
                            icon: <CiMail className="text-2xl" />,
                            name: "email",
                        },
                        {
                            label: "Password",
                            type: "password",
                            placeholder: "Enter Password",
                            icon: <IoLockClosedOutline className="text-2xl" />,
                            name: "password",
                        },
                    ]}
                    onSubmit={(values) => console.log("Login:", values)}
                />
            }
            {!showLogin ?
                <div className="flex gap-[5px]">
                    <p>Already have an account?</p> <button onClick={() => setShowLogin(!showLogin)}>Sign In</button> </div>
                : <div className="flex gap-[5px]">  <p>Register your account?</p> <button onClick={() => setShowLogin(!showLogin)}>Create Account</button>  </div>
            }
            <button
                // onClick={handleLogin}
                className="bg-white text-black border-slate-400 border-[1.5px] px-[20px] py-[10px] flex justify-center items-center gap-[10px] shadow-sm rounded-md font-medium"
            >
                <FcGoogle className="text-3xl" />
                Sign in with Google
            </button>
            <button
                // onClick={handleLogin}
                className="bg-white text-black border-slate-400 border-[1.5px] px-[20px] py-[10px] flex justify-center items-center gap-[10px] shadow-sm rounded-md font-medium"
            >
                <FiGithub className="text-3xl" />
                Sign in with Github
            </button>
        </div>
    )
}

export default Auth