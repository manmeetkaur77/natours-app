const express = require('express');
const tourController = require('/Users/manmeetkaur/Desktop/natours_app/controllers/tourController');

const router = express.Router();

////param middleware------use only for parameters is they are valid or not
//only invoke if the params are passed in the url
// router.param('id', tourController.checkID);


router
  .route('/')
  .get(tourController.getAllTours)
  //.post(middleware,tour-controller.method)--middle ware use to check the req.body (checkbody-go and see in tourcontroller)
  //if name or price is there or not
  //chain middleware
  //now this middleware is no more needed beacuse mongoose /mongodb can check this by itself
  //handle by model [unique],[jaruri]
  .post(tourController.createTour);

  
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;