import { useMemo } from "react";

const avatarGradients = [
    "from-rose-400 to-pink-500",
    "from-violet-400 to-purple-500",
    "from-blue-400 to-indigo-500",
    "from-cyan-400 to-teal-500",
    "from-emerald-400 to-green-500",
    "from-amber-400 to-orange-500",
    "from-red-400 to-rose-500",
    "from-fuchsia-400 to-pink-500",
    "from-sky-400 to-blue-500",
    "from-lime-400 to-emerald-500",
    "from-teal-400 to-cyan-500",
    "from-indigo-400 to-violet-500",
];

function hashName(name: string): number {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
}

function getInitials(name: string): string {
    if (!name) return "?";
    const words = name.trim().split(" ");
    if (words.length > 1) {
        return (words[0][0] + words[1][0]).toUpperCase();
    }
    return words[0][0].toUpperCase();
}

export const Avatar = ({ name, size, open }: { name?: string; size?: number; open?: boolean }) => {
    const displayName = name || "User";
    const sz = size || 10;

    const gradient = useMemo(() => {
        return avatarGradients[hashName(displayName) % avatarGradients.length];
    }, [displayName]);

    const initials = getInitials(displayName);

    const sizeClasses: Record<number, string> = {
        6: "w-6 h-6 text-[10px]",
        8: "w-8 h-8 text-xs",
        10: "w-10 h-10 text-sm",
        12: "w-12 h-12 text-base",
        14: "w-14 h-14 text-lg",
    };

    const cls = sizeClasses[sz] || `w-${sz} h-${sz} text-sm`;

    return (
        <div className={`${open ? "ring-2 ring-ink-400 ring-offset-2" : ""} rounded-full transition-all duration-200`}>
            <div
                className={`relative inline-flex items-center justify-center ${cls} overflow-hidden rounded-full bg-gradient-to-br ${gradient} shadow-sm`}
            >
                <span className="font-semibold text-white drop-shadow-sm leading-none">
                    {initials}
                </span>
            </div>
        </div>
    );
};