import axios from "axios";
import { useEffect, useState } from "react"
import { Backend_URL } from "../../config";
type Blog={
    title:string,
    content:string,
    id:string,
    author:{
        name:string
    }
}
export const useBlogs=()=>{
   const [loading, setLoading]=useState(true);
   const [blogs,setBlogs]=useState<Blog[]>([]);
    useEffect(()=>{
        const token = localStorage.getItem("token");
        axios.get(`${Backend_URL}/api/v1/blog/bulk`, {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        })
        .then((response)=>{
            setLoading(false);
            setBlogs(response.data.blog);
        })
    }, []);
    return {
        loading, blogs
    }
}