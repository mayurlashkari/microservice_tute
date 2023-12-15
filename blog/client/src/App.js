import React  from "react";
import PostCreate from "./PostCreate";
import Postlist from "./Postlist";

export default() =>{
return <div className="container">
<h1>Create Post</h1>
<PostCreate/>
<hr/>
<h>Posts </h>
<Postlist/>



</div>

};