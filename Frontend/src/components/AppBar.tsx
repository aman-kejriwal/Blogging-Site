import { useState, useEffect, useRef } from "react"
import { Avatar } from "./Avatar"
import { useNavigate, useLocation } from "react-router-dom"
import axios from "axios";
import { Backend_URL } from "../../config";
import { DropDownMenu } from "./DropDownMenu";
import { Link } from "react-router-dom";
import { useUser } from "../hooks";

export const AppBar = ({ title, content }: { title?: string, content?: string }) => {
    const navigate = useNavigate();
    const location = useLocation();
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

    return (
        <div className="relative">
            {/* Toast notification */}
            <div className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out
                ${showToast ? "translate-y-4 opacity-100" : "-translate-y-full opacity-0"}`}
            >
                <div className="glass-strong rounded-2xl shadow-xl px-6 py-4 flex items-center gap-3 max-w-lg border border-amber-100/50">
                    <span className="text-xl">✏️</span>
                    <p className="text-ink-200 text-sm font-normal leading-relaxed">
                        Your story needs a bit more content. Add more and try publishing again.
                    </p>
                    <button
                        className="text-ink-50 hover:text-ink-400 ml-2 transition-colors duration-200"
                        onClick={() => setShowToast(false)}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* AppBar */}
            <div className="px-6 md:px-12 py-3 flex items-center bg-white/80 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <Link to="/blogs" className="transition-opacity duration-200 hover:opacity-75">
                        <img className="h-10 md:h-12" src="/medium.png" alt="Medium" />
                    </Link>
                    {isPublishPage && (
                        <span className="text-ink-50 text-sm font-light font-serif hidden md:block">Draft in Kirags</span>
                    )}
                </div>

                <div className="ml-auto flex gap-4 md:gap-5 items-center">
                    {/* Write button */}
                    {!isPublishPage && (
                        <button
                            className="flex items-center gap-2 text-ink-50 hover:text-ink-400 transition-all duration-200 group"
                            onClick={() => {
                                const token = localStorage.getItem("token");
                                navigate(token ? "/publish" : "/signin");
                            }}
                        >
                            <svg className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                            <span className="text-sm font-normal hidden md:block">Write</span>
                        </button>
                    )}

                    {/* Publish button */}
                    {isPublishPage && (
                        <button
                            className="btn-brand text-sm px-5 py-2"
                            onClick={() => {
                                if (!title || !content || title.length < 15 || content.length < 100) {
                                    setShowToast(true);
                                    return;
                                }
                                const token = localStorage.getItem("token");
                                if (!token) { navigate("/signin"); return; }
                                axios.post(`${Backend_URL}/api/v1/blog`, {
                                    title, content
                                }, {
                                    headers: { Authorization: `Bearer ${token}` }
                                }).then(res => {
                                    console.log(res.data);
                                    navigate("/blogs");
                                }).catch(err => console.log(err))
                            }}
                        >
                            Publish
                        </button>
                    )}

                    {/* Notification bell */}
                    <button className="text-ink-50 hover:text-ink-400 transition-colors duration-200 p-1">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                        </svg>
                    </button>

                    {/* Avatar & Dropdown */}
                    {open && <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />}
                    <div ref={dropdownRef} className="relative">
                        <button
                            className="rounded-full transition-transform duration-200 hover:scale-105"
                            onClick={() => setOpen(!open)}
                        >
                            <Avatar name={user?.name} open={open} />
                        </button>
                        {open && <DropDownMenu name={user?.name} username={user?.username} />}
                    </div>
                </div>
            </div>

            {/* Bottom border */}
            <div className="divider" />
        </div>
    );
}