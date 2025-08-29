import { FiGithub } from "react-icons/fi";
import { CiCloud } from "react-icons/ci";
import { useEffect, useState } from "react";
import {supabase} from "../../utils/supabase";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../redux/store";
import { setSession } from "../../redux/slice/UserSession";
const Sync = () => {
interface SyncDataProps {
title: string;
Icon: any;
text: string;
text2: string;
provider: string
}
    const syncData: SyncDataProps[]  = [
    {
        title:'Github Gists',
        Icon: <FiGithub />,
        text: 'Sync your code on Github Gist. Each snippet witll stored as a separate gist',
        text2: 'You will be redirected to Github',
        provider: 'github'
    },
     {
        title:'Google Drive',
        Icon: <CiCloud />,
        text: 'Sync your code on Google Drive. Each snippet witll stored as a single JSON file',
        text2: 'You will be redirected to Google Drive',
          provider: 'google'
    },
]


const dispatch = useDispatch()
  const { session } = useSelector(
        (state: RootState) => state.session
    );
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

        if (data.session) {
          console.log("Access token:", data.session.provider_token);
        //    setShowPart(true)
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

// const handleGithubConnect = () => {
//     const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
//     const redirectUri = chrome.identity.getRedirectURL();
//     const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
//       redirectUri
//     )}&scope=gist`;

//     chrome.identity.launchWebAuthFlow(
//       {
//         url: authUrl,
//         interactive: true,
//       },
//       function (redirectResponseUrl) {
//         if (chrome.runtime.lastError) {
//           console.error(chrome.runtime.lastError);
//           return;
//         }

//         const url = new URL(redirectResponseUrl as string);
//         const code = url.searchParams.get("code");

//         console.log("Got GitHub code:", code);

//         // 🚨 TODO: send this `code` to your backend to exchange for an access_token
//       }
//     );
//   };
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index); // toggle
  };
  console.log('this is teh session', session)
  return (
    <div className="flex flex-col gap-[20px] ">
        <h3 className="font-medium text-[15px]">Sync Settings</h3>
         {session && <p>✅ Logged in as GitHub user</p>}
        <div className="flex flex-col">
        <div className=" flex flex-col gap-[10px] ">
        {syncData.map((sync:  SyncDataProps, index) => (
            <div   onClick={() => toggleItem(index)} key={index} className=" cursor-pointer gap-[20px] flex flex-col rounded-12px] border-[1px] w-fit px-[10px] py-[20px] rounded-[6px]">
            <div  className="flex gap-[10px] items-center  " >
                <span className="bg-slate-300 p-[10px] rounded-[5px]">{ sync.Icon}</span>
                <div className="flex flex-col">
                    <h4 className="font-medium ">{sync.title}</h4>
                    <p className="font-medium text-slate-400 text-[12px]">{sync.text}</p>
                </div>
                
            </div>
            {activeIndex === index && <div className="bg-white py-[15px] border-[1px] rounded-[5px] flex flex-col gap-[10px] justify-center items-center "> 
                <button onClick={(e) => {
                      e.stopPropagation(); 
                      if (sync.provider === "github") handleGithubLogin();
                      
                    }} className="bg-slate-900 text-white px-[20px] py-[10px] rounded-[5px] w-[80%] items-center justify-center flex gap-[10px]">
                    <span>{sync.Icon}</span>
                   Connect to {sync.title}
                </button>
                <p className="text-sm text-slate-400 font-medium">{sync.text2}</p>
                </div>}
            </div>
        ))}
        </div>
        </div>
    </div>
  )
}

export default Sync