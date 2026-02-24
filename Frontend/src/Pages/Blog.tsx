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
    if (!token) {
      navigate("/signin");
      return;
    }
    axios.get(`${Backend_URL}/api/v1/blog/${newId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch blog.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [newId]);

  if (loading) return <div className="flex justify-center"><BlogSkeleton /></div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {data.blog.title}
            </h1>
            <div className="flex gap-2 items-center">
              <Avatar name={data.blog.author?.name} />
              <p className="text-gray-600 font-semibold">{data.blog.author?.name || "Unknown Author"}</p>
            </div>
          </div>

          <div className="border-t border-gray-200"></div>
          <div className="p-6">
            <div className="prose prose-lg max-w-none text-gray-800">
              <p>{data.blog.content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}