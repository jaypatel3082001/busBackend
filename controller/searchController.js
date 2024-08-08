const SeatModel = require("../models/bookedseat");
const Businfo = require("../models/busInfo");
async function getsearchAll(req, res) {
    try {
      // Extract the Date parameter from the query string
      const { Date: dateStr } = req.query;
  
      // Initialize an empty filter object
      const filter = {};
  
      // Add date range filter if the date is provided
      if (dateStr) {
        // Parse the date string into a Date object
        const dateValue = new Date(dateStr);
  
        // Check if the date conversion is valid
        if (!isNaN(dateValue.getTime())) {
          // Define the start and end of the day
          const startOfDay = new Date(dateValue.setHours(0, 0, 0, 0));
          const endOfDay = new Date(dateValue.setHours(23, 59, 59, 999));
  
          // Create a filter to match documents where the date is within the specified date range
          filter.date = {
            $gte: startOfDay,
            $lte: endOfDay
          };
        } else {
          return res.status(400).json({ error: 'Invalid date format. Please use YYYY-MM-DD.' });
        }
      }
  
      // Build the aggregation pipeline
      const pipeline = [];
      
      // Add $match stage to the pipeline if there's a valid filter
      if (Object.keys(filter).length > 0) {
        pipeline.push({
          $match: filter
        });
      }
  
      // Run the aggregation pipeline
      const documents = await SeatModel.aggregate(pipeline);
  
      return res.status(200).json({
        data: documents,
      });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: error.message });
    }
  }
async function getsearchBus(req, res) {
    try {
      // Extract the Date parameter from the query string
      const { Date: dateStr } = req.query;
  
      // Initialize an empty filter object
      const filter = {};
  
      // Add date range filter if the date is provided
      if (dateStr) {
        // Parse the date string into a Date object
        const dateValue = new Date(dateStr);
  
        // Check if the date conversion is valid
        if (!isNaN(dateValue.getTime())) {
          // Define the start and end of the day
          const startOfDay = new Date(dateValue.setHours(0, 0, 0, 0));
          const endOfDay = new Date(dateValue.setHours(23, 59, 59, 999));
  
          // Create a filter to match documents where the date is within the specified date range
          filter.date = {
            $gte: startOfDay,
            $lte: endOfDay
          };
        } else {
          return res.status(400).json({ error: 'Invalid date format. Please use YYYY-MM-DD.' });
        }
      }
  
      // Build the aggregation pipeline
      const pipeline = [];
      
      // Add $match stage to the pipeline if there's a valid filter
      if (Object.keys(filter).length > 0) {
        pipeline.push({
          $match: filter
        });
      }
  
      // Run the aggregation pipeline
      const documents = await Businfo.aggregate(pipeline);
  
      return res.status(200).json({
        data: documents,
      });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: error.message });
    }
  }
  
  

//   function buildDateFilter(date, filter) {
//     const start = new Date(date);

//     // Ensure dates are valid
//     if (!isNaN(start.getTime())) {
//       // Dates are valid, add to filter
//       filter.Date = { $gte: start };
//     }
//   }

module.exports = { getsearchAll,getsearchBus };
