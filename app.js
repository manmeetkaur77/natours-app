const fs = require("fs");
const express = require("express");
const tourRouter = require('./routes/tourRoutes.js');
const userRouter = require('./routes/userRoutes.js');

const app = express(); 
console.log("hi")
// Read and parse the tours JSON file
// const tours = JSON.parse(
//   fs.readFileSync("/Users/manmeetkaur/Desktop/natours_app/data/tours-simple.json")
// );

// Define routes

// //1--handling get reques
// app.get("/api/v1/tours", (req, res) => {
//   res.status(200).json({
//     message: "ok",
//     data: {
//       tours
//     }
//   });
// });



// //2--handling get request with parameters

// app.get("/api/v1/tours/:id", (req, res) => {
//     console.log(req.params);
//     const id = req.params.id * 1; // convert to number
//     const tour = tours.find(ele => ele.id === id);

//     if (!tour) {
//         return res.status(404).json({
//             status: "failed",
//             message: "Tour not found"
//         });
//     }

//     res.status(200).json({
//         status: "success",
//         message: "Successful request",
//         data: {
//             tour
//         }
//     });
// });

// //3--handling patch req
// app.use(express.json()); // place this at the top, after `app = express();`

// app.patch("/api/v1/tours/:id", (req, res) => {
//     const id = req.params.id * 1;
//     const tour = tours.find(t => t.id === id);

//     if (!tour) {
//         return res.status(404).json({
//             status: "fail",
//             message: "Invalid ID"
//         });
//     }

//     // Update the tour (in memory only)
  

//     res.status(200).json({
//         status: "success",
//         data: {
//             tour
//         },
//         message: "Updated successfully"
//     });
// });


// app.get("/", (req, res) => {
//   res.status(200).send("hi");
// });

// //4- handling delete req
// app.delete("/api/v1/tours/:id", (req, res) => {
//     const id = req.params.id * 1;
//     const tour = tours.find(t => t.id === id);

//     if (!tour) {
//         return res.status(404).json({
//             status: "fail",
//             message: "Invalid ID"
//         });
//     }

//     // Update the tour (in memory only)
  

//     res.status(204).json({
//         status: "success",
//         data:null,
//         message: "deleted"
//     });
// });
//-------routes----------using middlewares
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);


//creating routes 
// app 
//    .route("/api/v1/users")
//    .get(getAllUsers)
//    .post(createUser)
// app
//    .route("/api/v1/users/:id")
//    .get(getUser)
//    .patch(updateUser)
//    .delete(deleteUser)




module.exports = app;