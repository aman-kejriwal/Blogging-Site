import { Avatar } from "./Avatar"
import { useNavigate } from "react-router-dom"
export const DropDownMenu = ({ name }: { name: string }) => {
    const navigate = useNavigate();
    return (
        <div className=" shadow-lg absolute right-10 rounded-md top-20 w-1/6 z-2 bg-white">
            {/* <div id="dropdownInformationButton" data-dropdown-toggle="dropdownInformation" className="text-black inline-flex items-center justify-center bg-white box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none" > */}
            <button className="flex pl-4 pr-10 gap-3 pt-3">
                <Avatar name={name} size={14} />
                <div className="hover:text-black items-center flex flex-col justify-center" onClick={() => { }}>
                    <p className="text-slate-500 font-normal pl-2 self-center text-10">{name}</p>
                    <p className="text-slate-500 font-normal pl-2 text-xs">View profile</p>
                </div>
            </button>
            <button className="pl-4 flex pr-15 gap-3 pt-5">
                <img className="h-6 w-6" src="/setting.png" alt="" />
                <p className="text-slate-500 font-normal pl-2 self-center text-10">Settings</p>
            </button>
            <button className="pl-4 flex pr-15 gap-3 pt-5">
                <img className="h-6 w-6" src="/question.png" alt="" />
                <p className="text-slate-500 font-normal pl-2 self-center text-10">Help</p>
            </button>
            <div className="bg-slate-200 my-5 h-px"></div>
            <div className="flex items-center">
                <button className="pl-4 text-slate-500 font-light hover:text-black">Become a Medium member</button>
                <img className="h-4 w-4 ml-1" src="/star.png" alt="" />
            </div>
            <button className="pl-4 text-slate-500 font-light hover:text-black pt-3">Apply to the Partner Program</button>
            <div className="bg-slate-200 my-5 h-px"></div>
            <button className="pl-4 text-slate-500 font-light hover:text-black pt-1" onClick={() => {
                localStorage.removeItem("token");
                navigate("/getstarted");
            }}>Sign Out <br />
                <p className="text-slate-500 font-normal pl-2 text-xs pt-1">{name}</p>
            </button>
            <div className="bg-slate-200 my-5 h-px"></div>
            <div className="inline-flex gap-2 pl-4 max-w-1/2 overflow-y-scroll">
                <button className="text-xs text-slate-500 font-light hover:text-black">About</button>
                <button className="text-xs text-slate-500 font-light hover:text-black">Blog</button>
                <button className="text-xs text-slate-500 font-light hover:text-black">Careers</button>
                <button className="text-xs text-slate-500 font-light hover:text-black">Privacy</button>
                <button className="text-xs text-slate-500 font-light hover:text-black">Terms</button>
            </div>
            <div className="inline-flex gap-2 pl-4 max-w-1/2 overflow-y-scroll pb-3">
                <button className="text-xs text-slate-500 font-light hover:text-black">Text to speech</button>
                <button className="text-xs text-slate-500 font-light hover:text-black">More</button>
            </div>
        </div>

    )
}