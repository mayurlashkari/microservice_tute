const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());



app.post('/events',   async (req, res)=>{

const {type , data}  = req.body;
    if(type==="commentCrated")
    {
        

        const status = data.content.includes('orange')?'rejected':'accepted';
         console.log("==================");
        console.log(data.postId);
        console.log(data.status);
        console.log(data.content);
        console.log("==================");
        await axios.post('http://event-bus-srv:4005/events',{
        type:"CommentModerated",
        data:{  
            id : data.id,
            content:data.content,
            postId:data.postId,
            status: status
        }
    });


    

    }
    res.send({});

});


app.listen(4003,()=>{

console.log("listing on 4003");

});

