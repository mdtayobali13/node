
const express = require('express');
const moviesRouter = require('./Routes/moviesRout')

let app = express();

app.use(express.json())


app.use((req,res,next)=>{
    req.requestedAd = new Date().toISOString();
    next()
})



// Route Handler
 app.use("/api/v1/movies",moviesRouter);

module.exports = app;
