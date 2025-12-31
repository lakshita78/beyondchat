const Article = require("../models/articleModel");
const scrapeBlogs = require("../scraper/scrapeBlogs");

const scrapeAndSaveArticles = async (req, res) => {
  try {
    const blogs = await scrapeBlogs();

    await Article.deleteMany(); // clear old articles
    const savedArticles = await Article.insertMany(blogs);

    res.status(200).json({ message: "Articles scraped & saved", data: savedArticles });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { scrapeAndSaveArticles, getArticles };
