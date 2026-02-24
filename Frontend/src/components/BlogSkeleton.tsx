export const BlogSkeleton = () => {
    return (
        <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
            <div className="animate-pulse">
                <div className="flex mb-4">
                    <div className="w-8 h-8 rounded-full bg-slate-200 self-center"></div>
                    <div className="px-2 self-center">
                        <div className="h-4 w-24 bg-slate-200 rounded"></div>
                    </div>
                    <div className="px-1 self-center">
                        <div className="h-4 w-32 bg-slate-200 rounded"></div>
                    </div>
                </div>
                <div className="max-w-5xl">
                    <div className="flex mt-1">
                        <div className="flex-1 pr-9">
                            <div className="pb-10">
                                <div className="h-8 w-3/4 bg-slate-200 rounded mb-3"></div>
                                <div className="h-4 w-full bg-slate-200 rounded mb-2"></div>
                                <div className="h-4 w-5/6 bg-slate-200 rounded"></div>
                            </div>
                            <div className="flex">
                                <div className="h-6 w-20 bg-slate-200 rounded-3xl"></div>
                                <div className="h-4 w-16 bg-slate-200 rounded self-center mx-2"></div>
                                <div className="ml-auto flex gap-6 mr-20 self-center">
                                    <div className="h-7 w-7 bg-slate-200 rounded"></div>
                                    <div className="h-7 w-7 bg-slate-200 rounded"></div>
                                    <div className="h-7 w-7 bg-slate-200 rounded"></div>
                                </div>
                            </div>
                        </div>
                        <div className="w-20 h-20 bg-slate-200 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
