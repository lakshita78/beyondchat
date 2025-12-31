const puppeteer = require("puppeteer-core");
const googleIt = require("google-it");

async function getReferenceArticles(title) {
  try {
    // Search Google
    const results = await googleIt({ query: title, limit: 5 });
    const urls = results
      .map(r => r.link)
      .filter(link => link.includes("http"))
      .slice(0, 2); // first 2 links

    const browser = await puppeteer.launch({
      executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", // your path
      headless: true
    });

    const page = await browser.newPage();
    const scrapedArticles = [];

    for (let url of urls) {
      await page.goto(url, { waitUntil: "networkidle2" });
      const content = await page.evaluate(() => {
        return document.body.innerText || "";
      });
      scrapedArticles.push({ url, content: content.slice(0, 5000) }); // limit to first 5000 chars
    }

    await browser.close();
    return scrapedArticles;

  } catch (err) {
    console.error("Reference scrape error:", err);
    return [];
  }
}

module.exports = getReferenceArticles;
