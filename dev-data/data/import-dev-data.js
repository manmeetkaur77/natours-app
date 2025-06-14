
  // Importing required modules
const mongoose = require('mongoose');         // MongoDB object modeling tool
const dotenv = require('dotenv');             // Loads environment variables from .env file
const fs=require("fs")                 // Node.js File System module for reading files

// Load environment variables from config.env
dotenv.config({ path: './config.env' });

// Import the database connection function
const connectDB = require('./../../db/index.js');

// Import the Tour model schema
const Tour = require('./../../models/tourModel.js');

dotenv.config();
// Connect to the MongoDB database
connectDB();

// Read and parse the JSON file containing tour data
const tours = JSON.parse(
  fs.readFileSync(
    '/Users/manmeetkaur/Desktop/natours_app/dev-data/data/tours-simple.json',
    'utf-8'
  )
);

// Function to IMPORT data into the database
const importData = async () => {
  try {
    await Tour.create(tours);   // Insert all tours into the 'tours' collection
    console.log('✅ Data successfully loaded!');
  } catch (err) {
    console.log('❌ Error loading data:', err);
  }
  process.exit();  // Exit the script
};



// Function to DELETE all data from the 'tours' collection
const deleteData = async () => {
  try {
    await Tour.deleteMany();   // Remove all documents from the collection
    console.log('🗑️ Data successfully deleted!');
  } catch (err) {
    console.log('❌ Error deleting data:', err);
  }
  process.exit();  // Exit the script
};

// Use command-line arguments to decide the operation
//process.argv gives an array of CLI arguments:

// process.argv[0]: node

// process.argv[1]: filename (e.g., import-dev-data.js)

// process.argv[2]: actual argument (--import or --delete)

// Based on this third argument, either importData() or deleteData() is called.


// Example: node import-dev-data.js --import OR --delete
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
} else {
  console.log('⚠️ Please provide a valid flag: --import or --delete');
  process.exit();
}


