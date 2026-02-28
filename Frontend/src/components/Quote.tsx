export const Quote = () => {
    return (
        <div className="h-screen relative overflow-hidden flex flex-col justify-center items-center"
            style={{
                background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 30%, #4338ca 60%, #6366f1 100%)"
            }}
        >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10"
                    style={{ background: "radial-gradient(circle, white, transparent)" }}
                />
                <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full opacity-10"
                    style={{ background: "radial-gradient(circle, white, transparent)" }}
                />
            </div>

            <div className="max-w-lg px-8 relative z-10">
                {/* Large quote mark */}
                <div className="text-white/20 text-[120px] font-serif leading-none -mb-16 -ml-4 select-none">
                    &ldquo;
                </div>

                <div className="text-white/90 text-xl font-source-serif font-normal leading-relaxed tracking-wide">
                    The customer service I received was exceptional. The support team went above
                    and beyond to address my concerns and ensure I had a seamless experience.
                </div>

                <div className="mt-8 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-lg">A</span>
                    </div>
                    <div>
                        <div className="text-white font-semibold text-base tracking-wide">
                            Aman Kejriwal
                        </div>
                        <div className="text-indigo-200/70 text-sm font-light">
                            CEO, Acme Inc
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};