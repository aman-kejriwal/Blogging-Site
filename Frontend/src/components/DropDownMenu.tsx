import { Avatar } from "./Avatar"
import { useNavigate } from "react-router-dom"
export const DropDownMenu = ({ name, username }: { name: string, username: string }) => {
    const navigate = useNavigate();
    return (
        <div className="shadow-lg absolute right-10 rounded-md top-20 w-1/6 z-2 bg-white">
            {/* <div id="dropdownInformationButton" data-dropdown-toggle="dropdownInformation" className="text-black inline-flex items-center justify-center bg-white box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none" > */}
            <button className="flex pl-6 pr-10 gap-3 pt-3 group">
                <Avatar name={name} size={10} />
                <div className="hover:text-black items-center flex flex-col justify-center" onClick={() => { }}>
                    <p className="text-slate-500 font-normal pl-2 self-center text-10 group-hover:text-black">{name}</p>
                    <p className="text-slate-500 font-normal pl-2 text-xs group-hover:text-black">View profile</p>
                </div>
            </button>
            <button className="pl-6 flex pr-15 gap-3 pt-5 group">
                <img className="h-6 w-6 group-hover:hidden" src="/setting.png" alt="" />
                <img className="h-6 w-6 group-hover:block hidden" src="/setting_black.png" alt="" />
                <p className={`font-normal pl-2 self-center text-10 text-slate-500 group-hover:text-black`}>Settings</p>
            </button>
            <button className="pl-6 flex pr-15 gap-3 pt-5 group">
                <img className="h-6 w-6 group-hover:hidden" src="/question.png" alt="" />
                <img className="h-6 w-6 group-hover:block hidden" src="/question_black.png" alt="" />
                <p className="text-slate-500 font-normal pl-2 self-center text-10 group-hover:text-black">Help</p>
            </button>
            <div className="bg-slate-200 my-5 h-px"></div>
            <div className="flex items-center">
                <button className="pl-6 text-slate-500 font-light hover:text-black">Become a Medium member</button>
                <img className="h-4 w-4 ml-1" src="/star.png" alt="" />
            </div>
            <button className="pl-6 text-slate-500 font-light hover:text-black pt-3">Apply to the Partner Program</button>
            <div className="bg-slate-200 my-5 h-px"></div>
            <div className="group cursor-pointer" onClick={() => {
                localStorage.removeItem("token");
                navigate("/getstarted");
            }}>
                <div className="pl-6 text-slate-500 font-light group-hover:text-black pt-1">Sign Out <br />
                </div>
                <p className="text-slate-500 font-normal pl-6 text-xs pt-1 group-hover:text-black ml-auto">{(() => {
                    const len = username.length;
                    const ind = username.indexOf("@");
                    let points = "";
                    for (let i = 0; i < ind - 2; i++) {
                        points += ".";
                    }
                    return username.slice(0, 2) + points + username.slice(ind, len);
                })()}</p>
            </div>
            <div className="bg-slate-200 my-5 h-px"></div>
            <div className="inline-flex gap-2 pl-6 max-w-1/2 overflow-y-scroll">
                <button className="text-xs text-slate-500 font-light hover:text-black">About</button>
                <button className="text-xs text-slate-500 font-light hover:text-black">Blog</button>
                <button className="text-xs text-slate-500 font-light hover:text-black">Careers</button>
                <button className="text-xs text-slate-500 font-light hover:text-black">Privacy</button>
                <button className="text-xs text-slate-500 font-light hover:text-black">Terms</button>
            </div>
            <div className="inline-flex gap-2 pl-6 max-w-1/2 overflow-y-scroll pb-3">
                <button className="text-xs text-slate-500 font-light hover:text-black">Text to speech</button>
                <button className="text-xs text-slate-500 font-light hover:text-black">More</button>
            </div>
        </div>

    )
}