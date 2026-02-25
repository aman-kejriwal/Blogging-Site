import { useState, useEffect, useRef } from "react"
import { Avatar } from "./Avatar"
import { useNavigate, useLocation } from "react-router-dom"
import axios from "axios";
import { Backend_URL } from "../../config";
import { DropDownMenu } from "./DropDownMenu";

export const AppBar = ({ title, content }: { title: string, content: string }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isEditHovered, setIsEditHovered] = useState(false);
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const isPublishPage = location.pathname === "/publish";

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
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
                        onClick={() => {
                            const token = localStorage.getItem("token");
                            if (token) {
                                navigate("/publish");
                            } else {
                                navigate("/signin");
                            }
                        }}>
                        <img className="h-6 w-6" src={isEditHovered ? "./edit_Dark.png" : "./edit.png"} alt="write.png" />
                        <button className="text-slate-500 rounded-full pr-4 py-2 mr-4 h-min self-center hover:text-slate-700 font-light">
                            Write</button>
                    </div>
                }
                {isPublishPage &&
                    <div className="flex items-center gap-2">
                        <button className="text-black bg-green-500 rounded-full px-4 py-2 mr-4 h-min self-center hover:text-slate-700 font-light" onClick={() => {
                            const token = localStorage.getItem("token");
                            if (!token) {
                                navigate("/signin");
                                return;
                            }
                            axios.post(`${Backend_URL}/api/v1/blog`, {
                                title: title,
                                content: content
                            }, {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem("token")}`
                                }
                            }).then(res => {
                                console.log(res.data);
                                navigate("/blogs");
                            }).catch(err => {
                                console.log(err);
                            })
                        }}>
                            Publish</button>
                    </div>
                }
                <button>
                    <img className="h-6 w-6" src="/more.png" alt="Button Icon" />
                </button>
                <button>
                    <img className="h-6 self-center" src="/bell.png" alt="bell" />
                </button>
                <button className="rounded-full" onClick={() => {
                    setOpen(!open);
                }}>
                    <Avatar name="Aman Kumar" />
                </button>
                {open && <DropDownMenu name="Aman Kumar" />}
            </div>
        </div>
        <div className="bg-slate-200 h-px"></div>
    </div>
}