const Visitor = require("../models/visitor");

// Controller to record a visitor
const recordVisitor = async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  try {
    // Check if visitor already exists
    const existingVisitor = await Visitor.findOne({ ipAddress: ip });
    if (!existingVisitor) {
      await Visitor.create({ ipAddress: ip });
    }
    const totalVisitors = await Visitor.countDocuments();
    res.send({
      message: "Visitor recorded successfully!",
      totalVisitors,
      visitorIP: ip,
    });
  } catch (error) {
    res.status(500).send({ message: "Error recording visitor", error });
  }
};

// Controller to get total visitor count
const getVisitorCount = async (req, res) => {
  try {
    const totalVisitors = await Visitor.countDocuments();
    res.send({ totalVisitors });
  } catch (error) {
    res.status(500).send({ message: "Error fetching visitor count", error });
  }
};

module.exports = { recordVisitor, getVisitorCount };
