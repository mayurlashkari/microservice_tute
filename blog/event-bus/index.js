const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events = [];
app.post('/events',async (req, res)=>{

    const event = req.body;

  
    events.push(event);
    try{
        await axios.post('http://posts-cluseterip-srv:4000/events',event);
    }
    catch (e){

    }

    try{
        await  axios.post('http://comment-cluseterip-srv:4001/events',event);
    }
    catch (e){
        
    }

    try{
        await  axios.post('http://query-cluseterip-srv:4002/events',event);
    }
    catch (e){
        
    }

    try{
        await  axios.post('http://moderation-cluseterip-srv:4003/events',event);
    }
    catch (e){
        
    }
  
 
  
    
  
   
//console.log(event);
    res.send({status:'OK'});

});


app.get('/events',(req, res)=>{

res.send(events);

});


app.listen(4005,()=>{

    console.log('Listening on 4005');

    console.log('http://posts-cluseterip-srv:4000/events adress added');
});