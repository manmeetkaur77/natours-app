// const fs = require('fs');
const Tour=require('../models/tourModel.js')
const APIFeatures = require('../utils/apiFeatures.js');
const catchAsync = require('../utils/catchAsync.js');
const AppError = require('../utils/appError.js');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};


// Read and parse the tours JSON file

// const tours = JSON.parse(
//   fs.readFileSync("/Users/manmeetkaur/Desktop/natours_app/data/tours-simple.json")
// );

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

// exports.checkID = (req, res, next, val) => {
//   console.log(`Tour id is: ${val}`);

//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID'
//     });
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Missing name or price'
//     });
//   }
//   next();
// };
     //---------------------------GET-ALL-TOUR------------------------
exports.getAllTours = catchAsync(async(req, res,next) => {
  //build query
  //1a-filtering
  // const qr={...req.query}
  // const excludedFields=['page','sort','limit','fields'];
  // excludedFields.forEach(el=>
  //   delete qr[el]
  //   )
  //  //1b-advance filtering
  //  let queryStr = JSON.stringify(qr);
  //  queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g
  //  , match =>
  //   `$${match}`

  //  )

  //  let query=Tours.find(JSON.parse(queryStr))
  //  //2 sort query
  //  if(req.query.sort){
  //   const sortBy=req.query.sort.split(',').join(' ')
  //   queryStr= queryStr+ `&sort=${sortBy}`
  //   }
  //     //3-executing query
  //     try {
  //       const tours = await query;
  //       res.status(200).json({
  //         status: 'success',
  //         results: tours.length,
  //         data: tours
  //         });
  //         } catch (err) {
  //           res.status(404).json({
  //             status: 'fail',
  //             message: err
  //             });
  //             }
  //             //4 field limiting
  //             // if(req.query.fields){
    //             //   const fields= req.query.fields.split(',').join(' ')
    //             //   query= query.select(fields)
    //             //   }
    //             //   //5 pagination
    //             //   if(req.query.page){
      //             //     const limit=parseInt(req.query.limit)||10
      //             //     const page=parseInt(req.query.page)||1
      //             //     const skip=(page-1)*limit
      //             //     query=query.skip(skip).limit(limit)
      //             //     }
      //             //     //6-executing query
      //             //     try {
        //             //       const tours = await query;
        //             //       res.status(200).json({
          //             //         status: 'success',
          //             //         results: tours.length,
          //             //         data: tours
          //             //         });
          


  console.log("hit1");
    const features = new APIFeatures(Tour.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const tours = await features.query;
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: tours
      });
          });
          //--------------------------GET-TOUR-------------------------------------

exports.getTour = catchAsync(async(req, res,next) => {
  console.log("hit2");
  const tour = await Tour.findById(req.params.id);
    //SAME AS Tour.findOne({_id:req.params.id})//line 58 mongoose give shortcut
    if (!tour) {
      return next(new AppError('No tour found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: tour
      });
      } );


          //------------------------------------CREATE-TOUR------------------------


exports.createTour = catchAsync(async(req, res,next) => {
console.log(req.body);
console.log("hit3");
//   const newId = tours[tours.length - 1].id + 1;
//   const newTour = Object.assign({ id: newId }, req.body);

//   tours.push(newTour);

//   fs.writeFile(
//     `${__dirname}/dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//     err => {
//       res.status(201).json({
//         status: 'success',
//         data: {
//           tour: newTour
//         }
//       });
//     }
//   );

  const newtour=await Tour.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      tour: newtour
      }
      });
      } );

 
//--------------------UPDATE-TOUR--------------------------------------

// Define and export an asynchronous function to handle tour updates
exports.updateTour = catchAsync(async (req, res,next) => {
  console.log("hit4")
    // Try to find a tour by its ID (from the URL param) and update it with the data in req.body
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,           // Return the updated document, not the original
      runValidators: true  // Run schema validation rules on the updated data
    });

    // If no tour is found with the given ID, return a 404 Not Found response
    if (!tour) {
      return next(new AppError('No tour found with that ID', 404));
    }

    // If update is successful, send back the updated tour data in the response
    res.status(200).json({
      status: 'success',
      data: {
        tour: tour // shorthand for tour: tour
      }
    });

  }
  );

//--------------------DELETE-TOUR--------------------------------------
exports.deleteTour = catchAsync(async (req, res,next) => {
  console.log("hit5")
   const tour = await Tour.findByIdAndDelete(req.params.id);

   if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  }

    res.status(204).json({
      status: 'success',
      data: null
    });
});

// ---------------------------Aggregation Pipeline-----------------------------------------------
exports.getTourStats = catchAsync(async (req, res,next) =>
  {
      const stats = await Tour.aggregate
      ([
        {
          $match: { ratingsAverage: { $gte: 4.5 } } 
          },
          {
            $group: {
              _id: null,
              numTours: { $sum: 1 },
              avgRating: { $avg: '$ratingsAverage' },
              avgPrice: { $avg: '$price' },
              minPrice: { $min: '$price' },
              maxPrice: { $max: '$price' }
              }
              }
              ]
              );
              console.log(stats)
              res.status(200).json({
                status: 'success',
                data: stats
                })
                    });
  
  // ---------------------------Aggregation Pipeline-----------------------------------------------

  exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
    const year = req.params.year * 1; // 2021
  
    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates'
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' }
        }
      },
      {
        $addFields: { month: '$_id' }
      },
      {
        $project: {
          _id: 0
        }
      },
      {
        $sort: { numTourStarts: -1 }
      },
      {
        $limit: 12
      }
    ]);
  
    res.status(200).json({
      status: 'success',
      data: {
        plan
      }
    });
  });

