import { useState } from "react"
import AddSnippet from "./AddSnippet"
import { FaCirclePlus } from "react-icons/fa6";
import Search from "./searchComponent/Search";
import DownSelect from '../components/downSelect/downSelect'
import { useSelector } from "react-redux";
import {supabase} from "../utils/supabase";
// import { useDispatch } from "react-redux";
// import type { UserProfile } from "../types";
// import { setUserProfile } from "../redux/slice/UserProfile";
import type { RootState } from "../redux/store";
// import { supabase } from "./supabaseClient";
// import type { Session } from '@supabase/supabase-js'
import Auth from "../Auth/Auth";
// import { GoPersonFill } from "react-icons/go";
import UserDropdown from "./selectibleComponent/UserDropdown";
const Header = () => {
    // const auth = getAuth();
    // const provider = new GoogleAuthProvider();
    const { profile } = useSelector(
        (state: RootState) => state.user
    );
    const { session } = useSelector(
        (state: RootState) => state.session
    );
    // const dispatch = useDispatch()
    const [showForm, setShowForm] = useState<boolean>(false)
    const [showPart, setShowPart] = useState<boolean>(false)
    // console.log('this is the sssion data currently', session)
    // const [userProfile, setUserProfile] = useState<string>('');
    // const signInWithGoogle = async () => {
    //   try {
    //     const result = await signInWithPopup(auth, provider);
    //     const user = result.user;
    //     console.log("Signed in:", user);
    //     if(user){
    //         setShowPart(true)
    //     }
    //     // You can also save user info in Firestore/Realtime DB here
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

    // const signInWithGoogle = async () => {
    //   const { data, error } = await supabase.auth.signInWithOAuth({
    //     provider: "google",
    //     options: {
    //       redirectTo: chrome.identity.getRedirectURL(), // works inside extensions
    //     },
    //   });

    //   if (error) {
    //     console.error("Error logging in:", error.message);
    //   } else {
    //     console.log("Redirecting to Google...");
    //   }
    // };

    // const handleLogin = async () => {
    //     //  const redirectUrl = chrome.identity.getRedirectURL(); 
    //     const {data,  error } = await supabase.auth.signInWithOAuth({
    //         provider: "google",
    //         options: {
    //             redirectTo: `chrome-extension://cloiemokilpeahhfplmeegecbfcmojki/`,
    //         },
    //     });
    //     // console.log('user data', data)
    //     if(data)
    //     {
    //          setShowPart(true)
    //     }
    //     if (error) console.error("Error logging in:", error);
    //     else console.log("Redirecting to Google...");
    // };
    //     const handleLogin = async () => {
    //   try {
    //     // Get OAuth token using Chrome Identity API
    //     const result = await chrome.identity.getAuthToken({ 
    //       interactive: true,
    //       scopes: ['email', 'profile']
    //     });

    //     if (!result.token) {
    //       throw new Error('No token received');
    //     }

    //     // Use token with Supabase
    //     const { data } = await supabase.auth.setSession({
    //       access_token: result.token,
    //       refresh_token: '' // Chrome handles refresh
    //     });

    //     if (data.session) {
    //       setShowPart(true);
    //       // Handle user data
    //     }
    //   } catch (error) {
    //     console.error('Auth error:', error);
    //   }
    // };


    //     useEffect(() => {
    //         // Supabase restores session from URL hash
    //         supabase.auth.getSession().then(({ data: { session } }) => {
    //             if (session) {
    //                 const userData = session?.user?.user_metadata as UserProfile;
    //                 dispatch(setUserProfile(userData));
    //                  setShowPart(true)
    //             }
    //         });
    //     }, []);
    // console.log('profile', profile)

    // https://nlvmtjoiaacntfspgptg.supabase.co/auth/v1/callback
    //  console.log('this is teh redirect',chrome.identity.getRedirectURL());
    const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error logging out:", error.message);
  } else {
    setShowPart(!showPart)
   
  }
};

    return (
        <>
            {!showPart ? (
                <Auth setShowPart={setShowPart} />
            ) : (
                <div className="flex flex-col gap-[20px]">
                    <div className="flex justify-between">
                        <p className="font-medium text-[12px]">Code Snippet Manager</p>

                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="bg-blue-700 text-white font-medium px-[20px] py-[10px] rounded flex justify-center items-center gap-[20px] text-[10px]"
                        >
                            <FaCirclePlus />
                            Add Snippet
                        </button>
                        <div className="flex justify-center items-center gap-[5px]">
                            {session && <UserDropdown
                                email={session?.user?.user_metadata?.email}
                                onLogout={handleLogout} // replace with your logout logic
                            />

                                // session?.user?.user_metadata?.email
                            }
                            {/* <img src={profile?.picture}  className="rounded-full w-[30px] h-[30px]"/> */}
                            <p className="text-sm">{profile?.name}</p>
                        </div>
                    </div>
                    <Search />
                    <DownSelect />
                    {showForm && <AddSnippet setShowForm={setShowForm} />}
                </div>
            )}
        </>
    );
};

export default Header