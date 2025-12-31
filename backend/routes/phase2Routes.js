const express = require("express");
const router = express.Router();

// Make sure path is correct
const { updateArticles } = require("../controllers/phase2Controller");

router.post("/update-articles", updateArticles);

module.exports = router;
