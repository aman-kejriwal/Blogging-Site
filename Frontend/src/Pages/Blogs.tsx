import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks";
import { BlogSkeleton } from "../components/BlogSkeleton";

export const Blogs = () => {
  const { blogs, loading } = useBlogs();
  if (loading) {
    return <div>
      <div className="flex justify-center">
        <div>
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
        </div>
      </div>
    </div>
  }
  return <div>
    <div style={{ position: "sticky", top: 0, zIndex: 100, background: "white" }}>
    </div>
    <div className="flex justify-center pt-10">
      <div>
        {blogs.map((blog) => (
          <BlogCard
            id={blog.id}
            name={blog.author?.name || "Unknown Author"}
            date={new Date()}
            title={blog.title}
            content={blog.content}
          />
        ))}
      </div>

    </div>
  </div>
}