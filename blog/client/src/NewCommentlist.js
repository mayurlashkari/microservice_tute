import React,{useState,useEffect} from "react";
 
export default({comments})=>{

 

    const renderPosts = comments.map(comment =>{

        let _content;
        if (comment.status === "accepted")
        {
            _content=comment.content;
        }
        if(comment.status === "rejected")
        {
            _content = "This comment has been rejected";
        }
        if(comment.status === "pending")
        {
            _content = "This comment is awaiting for the moderation";
        }

            return <li key={comment.id}>{_content}</li>
    });


    return <ul>{renderPosts}</ul>
}