import { useMemo, useState } from "react";
// import { DropDownMenu } from "./DropDownMenu";

const avatarColors = [
    "bg-red-500", "bg-green-500", "bg-purple-500", "bg-pink-500",
    "bg-yellow-500", "bg-indigo-500", "bg-teal-500", "bg-orange-500",
    "bg-cyan-500", "bg-emerald-500", "bg-violet-500", "bg-rose-500",
];

export const Avatar = ({ name, size }: { name: string, size?: number }) => {
    if (!size) {
        size = 10;
    }

    const randomColor = useMemo(() => {
        return avatarColors[Math.floor(Math.random() * avatarColors.length)];
    }, []);

    return <div className={`relative inline-flex items-center justify-center w-${size} h-${size} overflow-hidden rounded-full ${randomColor} self-center`}>
        <span  className="text-body">{(() => {
            if (!name) return "UA";
            const words = name.split(" ");
            if (words.length > 1) {
                return words[0][0] + words[1][0];
            }
            return words[0][0];
        })()}</span>
    </div>
}