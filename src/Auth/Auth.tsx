import { FcGoogle } from "react-icons/fc"
import { FiGithub } from "react-icons/fi"
import { CiMail } from "react-icons/ci";
// import { IoPersonOutline } from "react-icons/io5";
import { IoLockClosedOutline } from "react-icons/io5";
// import { BiSolidShow } from "react-icons/bi";
// import { BiShowAlt } from "react-icons/bi";
import { useEffect, useState } from "react";
import { AuthForm } from "./AuthForm";
import {supabase} from "../utils/supabase";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { setSession } from "../redux/slice/UserSession";
// import { setUserEmail } from "../redux/slice/UserProfile";
interface AuthProps {
    setShowPart: React.Dispatch<React.SetStateAction<boolean>>
}
interface AppMetadata {
    provider: string;
    providers: string[];
}

interface User {
    app_metadata: AppMetadata;
    aud: string;
    confirmation_sent_at: string;
    created_at: string;
    email: string;
    id: string;
    identities: any[];
    is_anonymous: boolean;
    phone: string;
    role: string;
    updated_at: string;
    user_metadata: Record<string, any>; // If it's dynamic metadata
}

interface Data {
    session: null | string; // Or replace `string` with the actual session type if you have it
    user: User | null;
}
const Auth = ({ setShowPart }: AuthProps) => {
    // const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showLogin, setShowLogin] = useState<boolean>(false)
    const [formValues, setFormValues] = useState<Record<string, string>>({});
    const [loginFormValues, setLoginFormValues] = useState<Record<string, string>>({});
    const [error, setError] = useState<string>("")
    const { session } = useSelector(
        (state: RootState) => state.session
    );
    const dispatch = useDispatch()
    const signUpUser = async () => {
      

        try {
            const { data, error } = await supabase.auth.signUp({
                email: formValues?.email,
                password: formValues?.password
            })
            const response = data as Data
            if (response?.user?.aud === 'authenticated') {
                setShowLogin(true)
            }
              if (error) {
                setError(error.message);
                return;
            }

        } catch (error) {
           return error
        }
    }
    const logInUser = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: loginFormValues?.email,
                password: loginFormValues?.password
            })
            const response = data as Data
            if (error) {
                setError(error.message);
                return;
            }

            if (response.user) {
                setShowPart(true);
            }
        } catch (error) {
            console.log('error', error)
        }
    }
    //  const [session, setSession] = useState<any>(null);

  async function handleGithubLogin() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        scopes: "gist user",
        redirectTo: "https://cloiemokilpeahhfplmeegecbfcmojki.chromiumapp.org/",
      },
    });

    if (error) {
      console.error("OAuth error:", error.message);
    } else if (data?.url) {
    // window.location.href = data.url; // full page redirect
    // OR
     window.open(data.url, "_blank", "width=500,height=600"); // popup
  }
  }

 
  useEffect(() => {
    // fetch the current session when component mounts
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Session error:", error.message);
      } else {
        console.log('this is data', data)
        dispatch(setSession(data.session));
    //    dispatch(setUserEmail(data.session?.user?.email))

        if (data.session) {
          console.log("Access token:", data.session.provider_token);
        setShowPart(true)
        }
      }
    };

    getSession();

    // optional: subscribe to changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      dispatch(setSession(newSession));
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  console.log('this is the seeison for git', session)
 
    return (
        <div className="flex flex-col gap-[20px] justify-center items-center w-full h-full p-[20px]">
            <h2 className="font-bold text-3xl">Code snippet Manager</h2>
            <h6>Sign in to manage your code snippet</h6>
            <p className="text-red-500">{error}</p>
            {!showLogin ?
                <AuthForm
                    buttonText="Create Account"
                    values={formValues}
                    setValues={setFormValues}
                    fields={[
                        // {
                        //     label: "Name",
                        //     type: "text",
                        //     placeholder: "Enter Name",
                        //     icon: <IoPersonOutline className="text-2xl" />,
                        //     name: "name",
                        // },
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
                    onSubmit={signUpUser}
                />
                :
                <AuthForm
                    buttonText="Login"
                    values={loginFormValues}
                    setValues={setLoginFormValues}
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
                    onSubmit={logInUser}
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
                onClick={handleGithubLogin}
                className="bg-white text-black border-slate-400 border-[1.5px] px-[20px] py-[10px] flex justify-center items-center gap-[10px] shadow-sm rounded-md font-medium"
            >
                <FiGithub className="text-3xl" />
                Sign in with Github
            </button>
        </div>
    )
}

export default Auth