
const express = require('express');
const app = require("./app.js");
app.use("/",(req,res)=>{
    res.send("hi")
    console.log("Server is running...");
})

const port =8080;


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

