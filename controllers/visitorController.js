const Visitor = require("../models/visitor");

// Controller to record a visitor
const recordVisitor = async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  try {
    // Check if the IP address already exists in the database
    const existingVisitor = await Visitor.findOne({ ipAddress: ip });
    if (!existingVisitor) {
      // Create a new visitor if not found
      await Visitor.create({ ipAddress: ip });
    }

    // Fetch the total number of unique visitors
    const totalVisitors = await Visitor.countDocuments();
    res.status(200).send({ totalVisitors });
  } catch (error) {
    res.status(500).send({ message: "Error recording visitor", error });
  }
};

// Controller to get the visitor count
const getVisitorCount = async (req, res) => {
  try {
    const totalVisitors = await Visitor.countDocuments();
    res.status(200).send({ totalVisitors });
  } catch (error) {
    res.status(500).send({ message: "Error fetching visitor count", error });
  }
};

module.exports = { recordVisitor, getVisitorCount };
