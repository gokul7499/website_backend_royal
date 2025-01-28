const express = require("express");
const { recordVisitor, getVisitorCount } = require("../controllers/visitorController");

const router = express.Router();

router.get("/", recordVisitor);
router.get("/count", getVisitorCount);

module.exports = router;
