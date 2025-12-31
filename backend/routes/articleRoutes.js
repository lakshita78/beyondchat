const express = require("express");
const router = express.Router();
const { scrapeAndSaveArticles, getArticles } = require("../controllers/articleController");

router.post("/scrape", scrapeAndSaveArticles);
router.get("/", getArticles);

module.exports = router;
