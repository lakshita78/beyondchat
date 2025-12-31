const puppeteer = require("puppeteer-core");

async function scrapeBlogs() {
  const browser = await puppeteer.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", // your Chrome path
    headless: true
  });

  const page = await browser.newPage();
  await page.goto("https://beyondchats.com/blogs/", { waitUntil: "networkidle2" });

  // Extract first 5 articles
  const articles = await page.evaluate(() => {
    const posts = [];
    const articleElements = document.querySelectorAll("div.e-con-inner > div"); // adjust if needed

    for (let i = 0; i < Math.min(5, articleElements.length); i++) {
      const el = articleElements[i];

      // Extract title
      const title = el.querySelector("h2")?.innerText || el.innerText.split("\n")[0];
      // Extract author/date
      const authorDate = el.innerText.split("\n")[1] || "";

      posts.push({ title, authorDate });
    }

    return posts;
  });

  await browser.close();
  return articles;
}

module.exports = scrapeBlogs;
