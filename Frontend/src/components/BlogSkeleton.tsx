export const BlogSkeleton = () => {
    return (
        <div className="py-8 max-w-screen-md">
            {/* Author row */}
            <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full shimmer" />
                <div className="h-3.5 w-24 shimmer rounded-full" />
                <div className="h-3.5 w-32 shimmer rounded-full" />
            </div>

            {/* Content area */}
            <div className="flex gap-8">
                <div className="flex-1">
                    <div className="h-6 w-4/5 shimmer rounded-lg mb-3" />
                    <div className="h-4 w-full shimmer rounded-lg mb-2" />
                    <div className="h-4 w-3/4 shimmer rounded-lg mb-6" />

                    {/* Features row */}
                    <div className="flex items-center gap-3">
                        <div className="h-7 w-20 shimmer rounded-full" />
                        <div className="h-4 w-16 shimmer rounded-full" />
                        <div className="ml-auto flex gap-3">
                            <div className="w-8 h-8 shimmer rounded-full" />
                            <div className="w-8 h-8 shimmer rounded-full" />
                        </div>
                    </div>
                </div>
                <div className="w-24 h-24 shimmer rounded-lg flex-shrink-0" />
            </div>

            {/* Divider */}
            <div className="divider mt-8" />
        </div>
    );
};
