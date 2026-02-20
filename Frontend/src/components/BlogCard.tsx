import { useState } from "react";
import { Avatar } from "./Avatar";

type BlogCardProps = {
    name: string,
    date: Date,
    title: string
    content: string,
}
export const BlogCard = ({ name, date, title, content }: BlogCardProps) => {
    return <div>
        <About name={name} date={date} />
        <BlogContent title={title} content={content} />
    </div>
}
const BlogContent = ({ title, content }: { title: string, content: string }) => {
    return (
        <div className="max-w-5xl">
            <div className="flex mt-1">
                <div className="flex-1 pr-9">
                    <h1 className="font-extrabold text-2xl pb-3">
                        {title}
                    </h1>
                    {(() => {
                        const text = content;
                        const words = text.split(" ");
                        if (words.length > 20) {
                            const preview = words.slice(0, 30).join(" ");
                            return <h3 className="text-lg font-serif font-thin text-slate-600">{preview}...</h3>;
                        } else {
                            return <h3>{text}</h3>;
                        }
                    })()}
                    <ContentFeatures content={content} ></ContentFeatures>
                </div>
                <img className="w-20" src="/captain_america.png" alt="" />
            </div>
            <div className="bg-slate-300 h-px w-full mt-10"></div>
        </div>
    );
}
const ContentFeatures = ({ content }: { content: string }) => {
    const [isBookmarkActive, setIsBookmarkActive] = useState(false);

    const handleBookmarkClick = () => {
        setIsBookmarkActive(!isBookmarkActive);
        // setTimeout(() => {
        //     setIsBookmarkActive(false);
        // }, 2000); // keep gray for 2 seconds
    };

    return <div className="mt-10 flex">
        <div className="bg-slate-100 rounded-3xl px-3 py-2 w-max font-light">
            Side Hustle
        </div>
        <h3 className="self-center mx-2  text-slate-500">
            {(() => {
                const str = content;
                const words = str.split(" ");
                const numWords = words.length;
                const estReadingTime = Math.ceil(numWords / 200); // 200 wpm standard reading speed
                return `${estReadingTime} min read`;
            })()}
        </h3>
        <div className="ml-auto flex gap-6 mr-20 self-center">
            <button
                type="button"
                className="w-7 h-7 focus:outline-none"
                onClick={handleBookmarkClick}
                aria-pressed={isBookmarkActive}
                aria-label="Bookmark"
                style={{ padding: 0, background: 'none', border: 'none' }}
            >
                <img
                    className="w-7 h-7"
                    src={isBookmarkActive ? "/book.png" : "/bookmark.png"}
                    alt={isBookmarkActive ? "Bookmarked" : "Bookmark"}
                />
            </button>
            <button
                type="button"
                className="w-7 h-7 focus:outline-none"
                onClick={() => alert('do not disturb is clicked')}
                aria-label="Do Not Disturb"
                style={{ padding: 0, background: 'none', border: 'none' }}
            >
                <img className="w-7 h-7" src="/do-not-disturb.png" alt="Do Not Disturb" />
            </button>
            <button
                type="button"
                className="w-7 h-7 focus:outline-none"
                onClick={() => {
                    alert('more is clicked')
                }}
                aria-label="More Options"
                style={{ padding: 0, background: 'none', border: 'none' }}
            >
                <img className="w-7 h-7" src="/more.png" alt="More Options" />
            </button>
        </div>
    </div>
}
const About = ({ name, date }: { name: string, date: Date }) => {
    return <div className="flex mt-2 h-14 text-lg">
        {/* <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-neutral-tertiary rounded-full bg-blue-500 self-center">
            <span className="font-medium text-body">{(() => {
                const words = name.split(" ");
                return words[0][0] + "" + words[1][0]
            })()}</span>
        </div> */}
        <Avatar name={name}/>
        <div className="px-2 self-center">
            {name}
        </div>
        <div className="px-1 text-slate-500 self-center">
            <span className="inline-block w-1 h-1 rounded-full bg-slate-400 mr-2 -translate-y-0.5"></span>
            {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            {/* {new Date().toLocaleDateString(} */}
        </div>
        <img className="h-3 w-3 self-center mb-1 ml-1" src="/star.png" alt="star icon" />
        <div className="px-1 text-slate-500 flex self-center">
            Member Only
        </div>
    </div>
}