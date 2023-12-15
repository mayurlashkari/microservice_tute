const express = require('express')
const app = express();



app.get('/',(req, res)=>{
    console.log('get request ');
    res.send("Hi There ....");
});


app.listen(8080,()=>{

    console.log('App is live on Port 8080');
});

