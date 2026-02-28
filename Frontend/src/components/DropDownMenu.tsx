import { Avatar } from "./Avatar"
import { useNavigate } from "react-router-dom"

export const DropDownMenu = ({ name, username }: { name?: string, username?: string }) => {
    const navigate = useNavigate();

    const maskedEmail = (() => {
        if (!username) return "";
        const len = username.length;
        const ind = username.indexOf("@");
        if (ind < 0) return username;
        let points = "";
        for (let i = 0; i < ind - 2; i++) points += "·";
        return username.slice(0, 2) + points + username.slice(ind, len);
    })();

    return (
        <div className="absolute right-0 top-14 w-64 z-20 animate-slide-down origin-top-right">
            <div className="glass-strong rounded-2xl shadow-2xl shadow-black/10 overflow-hidden">
                {/* Profile section */}
                <div className="p-4 pb-3">
                    <button className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-surface-100 transition-colors duration-200 group">
                        <Avatar name={name} size={10} />
                        <div className="text-left">
                            <p className="text-ink-300 text-sm font-medium group-hover:text-ink-400 transition-colors">{name || "User"}</p>
                            <p className="text-ink-50 text-xs font-light">View profile</p>
                        </div>
                    </button>
                </div>

                <div className="divider mx-4" />

                {/* Menu items */}
                <div className="p-2">
                    <MenuItem icon={<SettingsIcon />} label="Settings" />
                    <MenuItem icon={<HelpIcon />} label="Help" />
                </div>

                <div className="divider mx-4" />

                {/* Membership section */}
                <div className="p-2">
                    <button className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-surface-100 transition-colors duration-200 flex items-center gap-2">
                        <span className="text-ink-100 text-sm font-normal">Become a Medium member</span>
                        <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    </button>
                    <button className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-surface-100 transition-colors duration-200">
                        <span className="text-ink-100 text-sm font-normal">Apply to the Partner Program</span>
                    </button>
                </div>

                <div className="divider mx-4" />

                {/* Sign out */}
                <div className="p-2">
                    <button
                        className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-red-50 transition-colors duration-200 group"
                        onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/getstarted");
                        }}
                    >
                        <p className="text-ink-100 text-sm font-normal group-hover:text-red-600 transition-colors">Sign out</p>
                        <p className="text-ink-50 text-xs font-light mt-0.5 group-hover:text-red-400 transition-colors">{maskedEmail}</p>
                    </button>
                </div>

                <div className="divider mx-4" />

                {/* Footer links */}
                <div className="px-4 py-3 flex flex-wrap gap-x-3 gap-y-1">
                    {["About", "Blog", "Careers", "Privacy", "Terms"].map(link => (
                        <button key={link} className="text-[11px] text-ink-50 font-light hover:text-ink-300 transition-colors duration-200">
                            {link}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

function MenuItem({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-surface-100 transition-colors duration-200 group">
            <span className="text-ink-50 group-hover:text-ink-300 transition-colors">{icon}</span>
            <span className="text-ink-100 text-sm font-normal group-hover:text-ink-300 transition-colors">{label}</span>
        </button>
    );
}

function SettingsIcon() {
    return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    );
}

function HelpIcon() {
    return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
        </svg>
    );
}