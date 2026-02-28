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
    } | null
}
type User = {
    name: string,
    username: string
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
                alert(error.response.data.message);
                console.error(error);
                setLoading(false);
                navigate('/signin')
            })
    }, []);
    return {
        loading, blogs
    }
}
export const useUser = () => {
    const [user, setUser] = useState({ name: "", username: "" });
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate('/signin')
            return;
        }
        axios.get(`${Backend_URL}/api/v1/user/me`, {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        })
            .then((response) => {
                setUser(response.data.user);
            })
            .catch((err) => {
                alert(err.response.data.error);
                console.error(err);
            })
    }, []);
    return { user };
}