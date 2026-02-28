import { useState, useEffect } from "react";
import { AppBar } from "../components/AppBar";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) navigate("/signin");
    }, [navigate]);

    const autoGrow = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
    };

    const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

    return (
        <div className="min-h-screen bg-white">
            <AppBar title={title} content={content} />
            <div className="flex flex-col items-center animate-fade-in" style={{ animationFillMode: 'both' }}>
                <div className="flex flex-col w-full max-w-3xl gap-4 px-6 pt-8 pb-20">
                    <textarea
                        className="font-serif text-4xl md:text-5xl font-bold text-ink-400 placeholder:text-surface-300 placeholder:font-light border-none outline-none resize-none overflow-hidden leading-tight tracking-tight"
                        style={{ minHeight: '80px' }}
                        placeholder="Title"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value); autoGrow(e); }}
                    />
                    <textarea
                        className="font-source-serif text-xl text-ink-300 placeholder:text-surface-300 placeholder:font-light border-none outline-none resize-none overflow-hidden leading-relaxed"
                        style={{ minHeight: '200px' }}
                        placeholder="Tell your story..."
                        value={content}
                        onChange={(e) => { setContent(e.target.value); autoGrow(e); }}
                    />
                    {/* Word count */}
                    {wordCount > 0 && (
                        <div className="fixed bottom-6 right-8 px-4 py-2 rounded-full glass text-xs text-ink-50 font-light shadow-lg">
                            {wordCount} {wordCount === 1 ? 'word' : 'words'}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}