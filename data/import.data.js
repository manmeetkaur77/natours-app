const fs=require("fs")
const mongoose = require('mongoose');
const app = require("./app.js");
const connectDB = require('./db/index.js');
const dotenv = require("dotenv");
dotenv.config({path:'./congif.env'});
const Tour=require("/Users/manmeetkaur/Desktop/Big Folder/TravelMate/Models/toursmodel.js");
const Tours = require("/Users/manmeetkaur/Desktop/Big Folder/TravelMate/Models/toursmodel.js");

connectDB();



const port = process.env.PORT;
console.log(process.env)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const file=JSON.parse(fs.readFileSync("/Users/manmeetkaur/Desktop/Big Folder/TravelMate/dev-data/data/tours.json","utf-8"));
const importData = async () => {
    try {
      await Tour.create(file);
      console.log('Data successfully loaded!');
    } catch (err) {
      console.log(err);
    }
    process.exit();
  };
  
  // DELETE ALL DATA FROM DB
  const deleteData = async () => {
    try {
      await Tour.deleteMany();
      console.log('Data successfully deleted!');
    } catch (err) {
      console.log(err);
    }
    process.exit();
  };
  
  if (process.argv[2] === '--import') {
    importData();
  } else if (process.argv[2] === '--delete') {
    deleteData();
  }