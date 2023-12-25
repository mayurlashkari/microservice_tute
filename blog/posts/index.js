const express = require('express');
const {rendomBytes} = require('crypto');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());
const posts = {};




app.get('/posts' , (req, res)=>{

res.send(posts);


});


app.post('/events',(req, res)=>{

    console.log('Event Recived', req.body.type);

    res.send({});

});


app.post('/posts/create' , (req, res)=>{
//const id = rendomBytes(4).toString('hex');
crypto.randomBytes(4,  (err, buf) => {
    if (err) {
      // Prints error
      console.log(err);
      return;
    }

    const id = buf.toString('hex');
    const {title} = req.body;

posts[id]={
    id,title
};

  axios.post('http://event-bus-srv:4005/events',{
    type:'PostCreated',
    data:{
        id,title
        }
});

res.status(201).send(posts[id]);

});




});



app.listen(4000,()=>{
    console.log("event-bus-srv:4005 address added ");
    console.log("listening on 4000");

});