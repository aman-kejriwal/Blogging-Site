import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Backend_URL } from "../../config";
import { Avatar } from "../components/Avatar";
import { BlogSkeleton } from "../components/BlogSkeleton";

export const Blog = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const newId = id?.slice(1);

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/signin"); return; }
    axios.get(`${Backend_URL}/api/v1/blog/${newId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => setData(response.data))
      .catch((err) => { console.error(err); setError("Failed to fetch blog."); })
      .finally(() => setLoading(false));
  }, [newId]);

  if (loading) return (
    <div className="flex justify-center pt-10">
      <BlogSkeleton />
    </div>
  );
  if (error) return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="text-center">
        <p className="text-ink-50 text-lg">{error}</p>
        <button className="btn-primary mt-4" onClick={() => navigate("/blogs")}>Back to Feed</button>
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in" style={{ animationFillMode: 'both' }}>
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Title */}
        <h1 className="font-extrabold text-3xl md:text-[42px] leading-tight text-ink-400 mb-6 tracking-tight">
          {data.blog.title}
        </h1>

        {/* Author */}
        <div className="flex items-center gap-4 mb-8">
          <Avatar name={data.blog.author?.name} size={12} />
          <div>
            <p className="text-ink-300 font-semibold text-base">
              {data.blog.author?.name || "Unknown Author"}
            </p>
            <p className="text-ink-50 text-sm font-light">
              {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              <span className="mx-2">·</span>
              {Math.ceil(data.blog.content.split(" ").length / 200)} min read
            </p>
          </div>
        </div>

        {/* Dividers & actions */}
        <div className="divider mb-6" />

        {/* Content */}
        <div className="font-source-serif text-lg md:text-xl text-ink-300 leading-[1.8] tracking-wide">
          <p className="whitespace-pre-wrap">{data.blog.content}</p>
        </div>

        <div className="divider mt-12 mb-8" />

        {/* Author card */}
        <div className="flex items-center gap-4 p-6 rounded-2xl bg-surface-100">
          <Avatar name={data.blog.author?.name} size={14} />
          <div>
            <p className="text-xs text-ink-50 font-light uppercase tracking-wider mb-1">Written by</p>
            <p className="text-ink-400 font-bold text-lg">{data.blog.author?.name || "Unknown Author"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}