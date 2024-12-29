 const express = require('express');
 const app = express();
 const mongoose = require("mongoose");
 const port = process.env.PORT || 5000;

 app.use('/',(req,res)=>{
    res.send('Welcome to book store server!')
 })

 app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
 })
