import { useState } from "react";
import { Avatar } from "./Avatar";
import { Link } from "react-router-dom";

type BlogCardProps = {
    id: string;
    name: string;
    date: Date;
    title: string;
    content: string;
};

export const BlogCard = ({ id, name, date, title, content }: BlogCardProps) => {
    return (
        <article className="card-hover py-8 group">
            <About name={name} date={date} />
            <BlogContent id={id} title={title} content={content} />
            <div className="divider mt-8" />
        </article>
    );
};

const BlogContent = ({ id, title, content }: { id: string; title: string; content: string }) => {
    const words = content.split(" ");
    const preview = words.length > 25 ? words.slice(0, 30).join(" ") + "..." : content;

    return (
        <div className="max-w-5xl mt-3">
            <Link to={`/blog/:${id}`} className="block group/link">
                <div className="flex gap-6 md:gap-10">
                    <div className="flex-1 min-w-0">
                        <h2 className="font-extrabold text-xl md:text-2xl text-ink-400 leading-snug mb-2 group-hover/link:text-brand-600 transition-colors duration-300">
                            {title}
                        </h2>
                        <p className="text-base font-source-serif font-light text-ink-100 leading-relaxed line-clamp-3">
                            {preview}
                        </p>
                    </div>
                    <img
                        className="w-16 h-16 md:w-24 md:h-24 object-cover rounded-lg flex-shrink-0 self-start"
                        src="/captain_america.png"
                        alt=""
                    />
                </div>
            </Link>
            <ContentFeatures content={content} />
        </div>
    );
};

const ContentFeatures = ({ content }: { content: string }) => {
    const [isBookmarkActive, setIsBookmarkActive] = useState(false);

    const readTime = Math.ceil(content.split(" ").length / 200);

    return (
        <div className="flex items-center mt-4 gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-surface-100 text-ink-100 hover:bg-surface-200 transition-colors duration-200 cursor-pointer">
                Side Hustle
            </span>
            <span className="text-ink-50 text-sm font-light">
                {readTime} min read
            </span>
            <div className="ml-auto flex gap-3 items-center">
                <button
                    className="p-1.5 rounded-full hover:bg-surface-100 transition-all duration-200 text-ink-50 hover:text-ink-300"
                    onClick={() => setIsBookmarkActive(!isBookmarkActive)}
                    aria-label="Bookmark"
                >
                    {isBookmarkActive ? (
                        <svg className="w-5 h-5 text-ink-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                        </svg>
                    )}
                </button>
                <button
                    className="p-1.5 rounded-full hover:bg-surface-100 transition-all duration-200 text-ink-50 hover:text-ink-300"
                    aria-label="More Options"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

const About = ({ name, date }: { name: string; date: Date }) => {
    return (
        <div className="flex items-center gap-3">
            <Avatar name={name} size={8} />
            <span className="text-ink-300 text-sm font-medium">{name}</span>
            <span className="w-1 h-1 rounded-full bg-ink-50" />
            <span className="text-ink-50 text-sm font-light">
                {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <div className="flex items-center gap-1 ml-1">
                <svg className="w-3.5 h-3.5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-ink-50 text-xs font-light">Member Only</span>
            </div>
        </div>
    );
};