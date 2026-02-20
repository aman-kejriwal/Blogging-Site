import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks";
export const Blogs = () => {
  const { blogs, loading} = useBlogs();
  if(loading){
    return <div>
      Loading...
    </div>
  }
  return <div>
    <div style={{ position: "sticky", top: 0, zIndex: 100, background: "white" }}>
      <AppBar />
    </div>
    <div className="flex justify-center">
      <div>
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            name={blog.author?.name || "Kaun Author"}
            date={new Date()}
            title={blog.title}
            content={blog.content}
          />
        ))}
      </div>

    </div>
  </div>
}