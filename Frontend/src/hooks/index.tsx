import axios from "axios";
import { useEffect, useState } from "react"
import { Backend_URL } from "../../config";
import { useNavigate } from "react-router-dom";
type Blog = {
    title: string,
    content: string,
    id: string,
    author: {
        name: string
    }
}
export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate('/signin')
            return;
        }
        axios.get(`${Backend_URL}/api/v1/blog/bulk`, {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        })
            .then((response) => {
                setLoading(false);
                setBlogs(response.data.blog);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
                navigate('/signin')
            })
    }, []);
    return {
        loading, blogs
    }
}