export const Footer = () => {
    const links = ["Help", "Status", "About", "Careers", "Press", "Blog", "Privacy", "Rules", "Terms", "Text to speech"];
    return (
        <footer className="mt-auto">
            <div className="divider" />
            <div className="py-6 px-8">
                <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
                    {links.map((link) => (
                        <button
                            key={link}
                            className="text-ink-50 text-[13px] font-light transition-colors duration-200 hover:text-ink-400 relative group"
                        >
                            {link}
                            <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-ink-400 transition-all duration-300 group-hover:w-full" />
                        </button>
                    ))}
                </div>
            </div>
        </footer>
    );
};