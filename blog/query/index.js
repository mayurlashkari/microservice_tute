const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const axios = require('axios')
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts',(req, res)=>{

res.send(posts);

} );

const handleEvent=(type , data)=>{
        if(type=="PostCreated"){
            const{id,title} = data;
            posts[id] = {id,title,Comments:[]};
        }
        if(type==="commentCrated")
        {
            const {id,content , postId , status} = data;
            const post = posts[postId];
            post.Comments.push({id,content,status});
        }
        if(type==="commentUpdated")
        {
            const {id, status, postId ,content } = data;
            const post = posts[postId];
            const comment = post.Comments.find(comment =>{
                return comment.id===id;
            });
            comment.status  = status;
            comment.content = content;
        
        
        }
}


app.post('/events',(req,res)=>{

const {type , data} = req.body;
handleEvent(type , data);

res.send({});

});


app.listen(4002,async ()=>{

    console.log('event query running on the 4002');

    const res = await axios.get("http://event-bus-srv:4005/events");

    for(let events of res.data)
    {
        console.log("processing events :",events.type);
        handleEvent(events.type , events.data);
    }

});