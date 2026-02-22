import { useState } from "react"
import { Avatar } from "./Avatar"
import { useNavigate, useLocation } from "react-router-dom"

export const AppBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isEditHovered, setIsEditHovered] = useState(false);
    const isPublishPage = location.pathname === "/publish";
    return <div>
        <div className="px-12 py-3 flex">
            <div className="flex">
                <img className="h-14" src="/medium.png" alt="" />
                <h3 className="self-center px-4 text-lg font-serif">Draft in Kirags</h3>
            </div>
            <div className="ml-auto flex gap-5 items-center">
                {!isPublishPage &&
                    <div className="flex items-center gap-2"
                        onMouseEnter={() => setIsEditHovered(true)}
                        onMouseLeave={() => setIsEditHovered(false)}
                        onClick={() => navigate("/publish")}>
                        <img className="h-6 w-6" src={isEditHovered ? "./edit_Dark.png" : "./edit.png"} alt="write.png" />
                        <button className="text-slate-500 rounded-full pr-4 py-2 mr-4 h-min self-center hover:text-slate-700 font-light">
                            Write</button>
                    </div>
                }
                {isPublishPage &&
                    <div className="flex items-center gap-2">
                        <button className="text-black bg-green-500 rounded-full px-4 py-2 mr-4 h-min self-center hover:text-slate-700 font-light">
                            Publish</button>
                    </div>
                }
                <button>
                    <img className="h-6 w-6" src="/more.png" alt="Button Icon" />
                </button>
                <button>
                    <img className="h-6 self-center" src="/bell.png" alt="bell" />
                </button>
                <Avatar name="Aman Kumar" />
            </div>
        </div>
        <div className="bg-slate-200 h-px"></div>
    </div>
}