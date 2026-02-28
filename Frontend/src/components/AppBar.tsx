import { useState, useEffect, useRef } from "react"
import { Avatar } from "./Avatar"
import { useNavigate, useLocation } from "react-router-dom"
import axios from "axios";
import { Backend_URL } from "../../config";
import { DropDownMenu } from "./DropDownMenu";
import { Link } from "react-router-dom";
import { useUser } from "../hooks";

export const AppBar = ({ title, content }: { title: string, content: string }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isEditHovered, setIsEditHovered] = useState(false);
    const [open, setOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const isPublishPage = location.pathname === "/publish";
    const { user } = useUser();

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => setShowToast(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    return <div className="relative">
        {/* Toast notification */}
        <div
            className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${showToast ? "translate-y-4 opacity-100" : "-translate-y-full opacity-0"
                }`}
        >
            <div className="bg-white border border-slate-200 rounded-xl shadow-lg px-6 py-4 flex items-center gap-3 max-w-lg">
                <span className="text-2xl">✏️</span>
                <p className="text-slate-700 text-sm font-light leading-relaxed">
                    Oops, did you mean to write something so short? Please write more and try publishing again.
                </p>
                <button
                    className="text-slate-400 hover:text-slate-600 ml-2 text-lg font-light"
                    onClick={() => setShowToast(false)}
                >
                    ✕
                </button>
            </div>
        </div>
        <div className="px-12 py-3 flex">
            <div className="flex">
                <Link to={"/blogs"}>
                    <img className="h-14 hover:cursor-pointer" src="/medium.png" alt="" />
                </Link>
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
                        <img className="h-6 w-6" src={isEditHovered ? "/edit_Dark.png" : "/edit.png"} alt="" />
                        <button className="text-slate-500 rounded-full pr-4 py-2 mr-4 h-min self-center hover:text-slate-700 font-light">
                            Write</button>
                    </div>
                }
                {isPublishPage &&
                    <div className="flex items-center gap-2">
                        <button className="text-black bg-green-500 rounded-full px-4 py-2 mr-4 h-min self-center hover:text-slate-700 font-light" onClick={() => {
                            if (title.length < 15 || content.length < 100) {
                                setShowToast(true);
                                return;
                            }
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
                {open && <div className="fixed inset-0 z-1" onClick={() => setOpen(false)}></div>}
                <div ref={dropdownRef} className="">
                    <button className="rounded-full" onClick={() => {
                        setOpen(!open);
                    }}>
                        <Avatar name={user?.name} open={open} />
                    </button>
                    {open && <DropDownMenu name={user?.name} username={user?.username} />}
                </div>
            </div>
        </div>
        <div className="bg-slate-200 h-px"></div>
    </div>
}