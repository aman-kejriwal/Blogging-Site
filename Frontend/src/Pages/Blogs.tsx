import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { AppBar } from "../components/AppBar";

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
    <div className="flex justify-center">
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