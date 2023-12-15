import React,{useState,useEffect} from 'react'
import axios from 'axios'
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';
import NewCommentList from  './NewCommentlist';
export default()=>
{

    const [posts,setPosts] = useState({});
    const fetchPosts = async()=>{
       // const res = await axios.get('http://localhost:4000/posts');
        const res = await axios.get('http://localhost:4002/posts');
        setPosts(res.data);

        };

    useEffect(()=>{
            fetchPosts();
                    }, []);
    
    const renderPosts = Object.values(posts).map(post=>{
return (
  <div
    className="card"
    style={{ width: "30%", marginBottom: "20px" }}
    key={post.id}
  >
    <div className="card-body">
      <h3>{post.title} </h3>


      <NewCommentList comments={post.Comments} />
      <CommentCreate postId={post.id} />
    </div>
    <br />
  </div>
);

    })  ;            
    
    return <div className='d-flex flex-row flex-wrap justify-content-between'>{renderPosts}</div>;
};