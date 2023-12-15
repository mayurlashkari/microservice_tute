const express = require('express');
const {rendomBytes} = require('crypto');
const axios = require('axios');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();


app.use(bodyParser.json());

app.use(cors());
const commnetspostbyID = {};

app.get('/',(req, res)=>{
console.log("Base calling");
res.send("OK");
});

app.get('/posts/:id/comments',(req, res)=>{

    console.log('get 4001 Get request');

res.send(commnetspostbyID[req.params.id]|| [] );


});



app.post('/posts/:id/comments',(req, res)=>{

    console.log('get 4001 post request');
    crypto.randomBytes(4,   (err, buf) => {
        if (err) {
          // Prints error
          console.log(err);
          return;
        }
    
        const cooment_id = buf.toString('hex');
    const {content} = req.body;        
   
    const comments = commnetspostbyID[req.params.id] || [];
    comments.push({id: cooment_id, content , status:'pending'});
  axios.post('http://event-bus-srv:4005/events',{
type:'commentCrated',
data:{
        id:cooment_id,
        content,
        postId:req.params.id, 
        status:'pending'
    }
});


    commnetspostbyID[req.params.id] = comments;
        res.status(201).send(comments);
    });




});

app.post('/events',async (req, res)=>{

    console.log('Event Recived',req.body.type);

    const {type,data}  =req.body;
    if(type === "CommentModerated")
    {
     
        console.log("------------");
        console.log(data);
        console.log("------------");
         
        const{postId,id,status,content} = data;
        const comments = commnetspostbyID[postId];
        const comment  = comments.find(comment => {
                return comment.id ===id;
                            });
        comment.status = status;
        await axios.post('http://event-bus-srv:4005/events',{
        type:'commentUpdated',
        data:{
                id ,
                status,
                postId, 
                content
            }
        }); 
       /*  const{postId,id,status,content} = data;
        const comments = commnetspostbyID[postId];
        const comment  = comments.find(comment => {
                return comment.id ===id;
                            });

    comment.status = status;
    console.log(comment);
   await axios.post('http://localhost:4005/events',{
        type:'commentUpdated',
        data:{
                id ,
                status,
                postId, 
                content
            }
        }); */
    }
 
 
    
    res.send({});

});

app.listen(4001,()=>{

    console.log('App listen on the port 4001');

});