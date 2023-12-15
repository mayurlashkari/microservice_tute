import React,{useState,useEffect} from "react";
import axios from 'axios'

export default({PostId})=>{

const[Comments,setComments] = useState([]);
//useState return array
//responce data and event modified data
const fetchPost = async()=>{

const res = await axios.get(`http://localhost:4001/posts/${PostId}/comments`)
setComments(res.data);

};

useEffect(()=>{
    fetchPost();
},[]);


    const renderPosts = Comments.map(comment =>{

       
            return <li key={comment.id}>{comment.content}</li>
    
    
        });


    return <ul>{renderPosts}</ul>
}