const express = require("express");
const { recordVisitor, getVisitorCount } = require("../controllers/visitorController");

const router = express.Router();

router.get('/record-visitor', recordVisitor); // Records visitor and returns updated count
router.get('/visitor/count', getVisitorCount);

module.exports = router;
