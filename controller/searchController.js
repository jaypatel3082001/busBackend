const SeatModel = require("../models/bookedseat");
const Businfo = require("../models/busInfo");
const Routeinfo = require("../models/routeinfo");
async function getsearchAll(req, res) {
  try {
    // Extract the Date parameter from the query string
    const { Date: dateStr, route } = req.query;

    // Initialize an empty filter object
    const filter = {};
    const ExsitingRoute = await Routeinfo.findOne({ route });

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
          $lte: endOfDay,
        };
      } else {
        return res
          .status(400)
          .json({ error: "Invalid date format. Please use YYYY-MM-DD." });
      }
    }

    // Build the aggregation pipeline
    const pipeline = [];

    // Add $match stage to the pipeline if there's a valid filter
    if (Object.keys(filter).length > 0) {
      pipeline.push({
        $match: filter,
      });
    }
    pipeline.push(
      {
        $match: {
          route: ExsitingRoute._id,
        },
      },
      {
        $lookup: {
          from: "routeinfos", // The collection to join
          localField: "route", // Field from the `orders` collection
          foreignField: "_id", // Field from the `customers` collection
          as: "routeDetails", // Output array field name
        },
      },
      {
        $unwind: "$routeDetails", // Unwind the array to merge customer details
      },
      {
        $group: {
          _id: {
            name: "$name",
            village: "$vilage",
          },
          seatNumbers: {
            $push: "$seatNumber",
          },
          date: {
            $first: "$date",
          },
          village: {
            $first: "$vilage",
          },
          name: {
            $first: "$name",
          },
          mobile: {
            $first: "$mobile",
          },
          routeDetails: {
            $first: "$routeDetails",
          },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id.name",
          village: 1,
          seatNumbers: 1,
          routeDetails: 1,
          mobile: 1,
          date: 1,
        },
      }
    );
    console.log("pipeline", pipeline);

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
    const { Date: dateStr, route } = req.query;

    // Initialize an empty filter object
    const filter = {};
    const ExsitingRoute = await Routeinfo.findOne({ route });

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
          $lte: endOfDay,
        };
      } else {
        return res
          .status(400)
          .json({ error: "Invalid date format. Please use YYYY-MM-DD." });
      }
    }

    // Build the aggregation pipeline
    const pipeline = [];

    // Add $match stage to the pipeline if there's a valid filter
    if (Object.keys(filter).length > 0) {
      pipeline.push({
        $match: filter,
      });
    }
    pipeline.push(
      {
        $match: {
          route: ExsitingRoute._id,
        },
      },
      {
        $lookup: {
          from: "routeinfos", // The collection to join
          localField: "route", // Field from the `orders` collection
          foreignField: "_id", // Field from the `customers` collection
          as: "routeDetails", // Output array field name
        },
      },
      {
        $unwind: "$routeDetails", // Unwind the array to merge customer details
      }
    );

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



async function getsearchAllByseat(req, res) {
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
          $lte: endOfDay,
        };
      } else {
        return res
          .status(400)
          .json({ error: "Invalid date format. Please use YYYY-MM-DD." });
      }
    }

    // Define the custom sort order for villages
    const villageOrder = [
      "અરજણસુખ", "ખાખરીય", "સૂર્ય પ્રતાપગઢ", "અનિડા", "ઉજળા", "તાલાળી",
      "સનાળી", "રાણસીકી", "દેરડી", "મોટી ખીલોરી", "મેતાખંભાળિયા", "કમઢીયા",
      "બિલડી", "ડોડીયાળા", "સાણથલી", "નવાગામ", "પીપળીયા", "જીવાપર", "પાંચવડા",
      "આટકોટ", "જસદણ", "સૂર્યા પંપ","લીલાપુર", "લાલાવદર", "વિછીયા", "રાણપુર"
    ];

    // Create a mapping for sorting
    const villageSortOrder = villageOrder.reduce((acc, village, index) => {
      acc[village] = index;
      return acc;
    }, {});

    // Build the aggregation pipeline
    const pipeline = [];

    // Add $match stage to the pipeline if there's a valid filter
    if (Object.keys(filter).length > 0) {
      pipeline.push({
        $match: filter,
      });
    }

    // Add the $group and $project stages to the pipeline
    pipeline.push(
      {
        $group: {
          _id: {
            name: "$name",
            village: "$vilage", // Corrected typo here
          },
          seatNumbersArray: {
            $addToSet: "$seatNumber", // Collect unique seat numbers
          },
          date: {
            $first: "$date",
          },
          village: {
            $first: "$vilage", // Corrected typo here
          },
          name: {
            $first: "$name",
          },
          mobile: {
            $first: "$mobile",
          },
        },
      },
      {
        $addFields: {
          villageOrderIndex: {
            $indexOfArray: [villageOrder, "$village"]
          }
        }
      },
      {
        $sort: {
          villageOrderIndex: 1
        }
      },
      {
        $project: {
          _id: 0,
          name: "$_id.name",
          village: "$_id.village",
          seatNumbersArray: 1,
          date: 1,
          mobile: 1
        }
      }
    );

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
// async function getsearchAllByseat(req, res) {
//   try {
//     // Extract the Date parameter from the query string
//     const { Date: dateStr } = req.query;

//     // Initialize an empty filter object
//     const filter = {};

//     // Add date range filter if the date is provided
//     if (dateStr) {
//       // Parse the date string into a Date object
//       const dateValue = new Date(dateStr);

//       // Check if the date conversion is valid
//       if (!isNaN(dateValue.getTime())) {
//         // Define the start and end of the day
//         const startOfDay = new Date(dateValue.setHours(0, 0, 0, 0));
//         const endOfDay = new Date(dateValue.setHours(23, 59, 59, 999));

//         // Create a filter to match documents where the date is within the specified date range
//         filter.date = {
//           $gte: startOfDay,
//           $lte: endOfDay,
//         };
//       } else {
//         return res
//           .status(400)
//           .json({ error: "Invalid date format. Please use YYYY-MM-DD." });
//       }
//     }

//     // Define the custom sort order for villages
//     const villageOrder = [
//       "અરજણસુખ", "ખાખરીય", "સૂર્ય પ્રતાપગઢ", "અનિડા", "ઉજળા", "તાલાળી",
//       "સનાળી", "રાણસીકી", "દેરડી", "મોટી ખીલોરી", "મેતાખંભાળિયા", "કમઢીયા",
//       "બિલડી", "ડોડીયાળા", "સાણથલી", "નવાગામ", "પીપળીયા", "જીવાપર", "પાંચવડા",
//       "આટકોટ", "જસદણ", "સૂર્યા પંપ", "લીલાપુર", "લાલાવદર", "વિછીયા", "રાણપુર"
//     ];

//     // Create a mapping for sorting
//     const villageSortOrder = villageOrder.reduce((acc, village, index) => {
//       acc[village] = index;
//       return acc;
//     }, {});

//     // Build the aggregation pipeline
//     const pipeline = [];

//     // Add $match stage to the pipeline if there's a valid filter
//     if (Object.keys(filter).length > 0) {
//       pipeline.push({
//         $match: filter,
//       });
//     }

//     // Add the $group and $project stages to the pipeline
//     pipeline.push(
//       {
//         $group: {
//           _id: {
//             name: "$name",
//             village: "$vilage", // Use the correct spelling from the database
//           },
//           seatNumbersArray: {
//             $addToSet: "$seatNumber", // Collect unique seat numbers
//           },
//           date: {
//             $first: "$date",
//           },
//           village: {
//             $first: "$vilage", // Use the correct spelling from the database
//           },
//           name: {
//             $first: "$name",
//           },
//           mobile: {
//             $first: "$mobile",
//           },
//         },
//       },
//       {
//         $addFields: {
//           villageOrderIndex: {
//             $indexOfArray: [villageOrder, "$village"]
//           }
//         }
//       },
//       {
//         $sort: {
//           villageOrderIndex: 1
//         }
//       },
//       {
//         $project: {
//           _id: 0,
//           name: "$_id.name",
//           village: "$_id.village",
//           seatNumbersArray: 1,
//           date: 1,
//           mobile: 1
//         }
//       }
//     );

//     // Run the aggregation pipeline
//     const documents = await SeatModel.aggregate(pipeline);

//     return res.status(200).json({
//       data: documents,
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     return res.status(500).json({ error: error.message });
//   }
// }

//   function buildDateFilter(date, filter) {
//     const start = new Date(date);

//     // Ensure dates are valid
//     if (!isNaN(start.getTime())) {
//       // Dates are valid, add to filter
//       filter.Date = { $gte: start };
//     }
//   }

module.exports = { getsearchAll, getsearchBus,getsearchAllByseat };
