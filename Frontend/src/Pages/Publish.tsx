import { useState } from "react";
import { AppBar } from "../components/AppBar";
export const Publish = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const autoGrow = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
    };

    return <div>
        <AppBar title={title} content={content} />
        <div className="flex  flex-col items-center">
            <div className="flex flex-col w-full max-w-4xl gap-4 pt-4">
                <textarea className="font-thin text-5xl font-serif h-20 placeholder:text-5xl placeholder:text-slate-300 placeholder:font-light placeholder:font-serif border-none outline-none resize-none overflow-hidden" placeholder="Title" value={title} onChange={(e) => { setTitle(e.target.value); autoGrow(e); }} />
                <textarea className="font-thin text-xl font-serif placeholder:text-xl placeholder:text-slate-300 placeholder:font-light placeholder:font-serif border-none outline-none resize-none overflow-hidden" placeholder="Tell us about your story..." value={content} onChange={(e) => { setContent(e.target.value); autoGrow(e); }} />
            </div>
        </div>
    </div>
}