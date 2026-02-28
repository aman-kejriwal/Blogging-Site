import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks";
import { BlogSkeleton } from "../components/BlogSkeleton";

export const Blogs = () => {
  const { blogs, loading } = useBlogs();

  if (loading) {
    return (
      <div className="flex justify-center">
        <div className="w-full max-w-2xl px-6">
          {[...Array(5)].map((_, i) => (
            <BlogSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-center px-6 pt-6">
        <div className="w-full max-w-2xl">
          {blogs.map((blog, index) => (
            <div
              key={blog.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.08}s`, animationFillMode: 'both' }}
            >
              <BlogCard
                id={blog.id}
                name={blog.author?.name || "Unknown Author"}
                date={new Date()}
                title={blog.title}
                content={blog.content}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}