import OpenAI from "openai";
import puppeteer from "puppeteer";

const asyncLoadPuppeteer = async (url) => {
  let results = "";
  const browser = await puppeteer.launch({ headless: true });

  try {
    const page = await browser.newPage();
    await page.goto(url);

    // Remove script, style, and noscript elements directly using Puppeteer
    await page.evaluate(() => {
      document
        .querySelectorAll("script, style, noscript")
        .forEach((el) => el.remove());
    });

    // Extract text content
    const price = await page.evaluate(() => document.querySelector("#price"));

    console.log(price);

    // const lines = text.split("\n");
    // const chunks = lines.map((line) => line.trim()).filter(Boolean);

    // results = chunks.join("\n");
  } catch (error) {
    results = `Error: ${error}`;
  }

  await browser.close();

  return results;
};

const getProductDetail = async (req, res) => {
  // const openai = new OpenAI({
  //   apiKey: `${process.env.OPENAI_API_KEY}`,
  // });
  // const completion = await openai.chat.completions.create({
  //   messages: [{ role: "system", content: "You are a helpful assistant." }],
  //   model: "gpt-3.5-turbo",
  // });
  // res.status(200).json({ success: true, data: completion.choices[0] });

  const content = await asyncLoadPuppeteer(req.body.url);

  // console.log(content.length);

  res.status(200).json({ success: true, data: content });
};

/*
 const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });
  // Open a new page
  const page = await browser.newPage();

  // Enable request interception
  await page.setRequestInterception(true);

  // Intercept requests and decide whether to allow or block them
  page.on("request", (request) => {
    const resourceType = request.resourceType();

    if (resourceType === "document") {
      // Allow only document requests
      request.continue();
    } else {
      // Block all other requests
      request.abort();
    }
  });

  // On this new page:
  // - wait until the dom content is loaded (HTML is ready)
  await page.goto(
    "https://www.amazon.ca/amazon-fire-tv-55-inch-4-series-4k-smart-tv/dp/B08T6H1RQD?ref_=Oct_DLandingS_D_315af6be_1",
    {
      waitUntil: "domcontentloaded",
    }
  );

  await page.evaluate(() => {
    document
      .querySelectorAll("script, style, noscript")
      .forEach((el) => el.remove());
  });

  // Extract HTML structure and text content from the entire body
  const extractedData = await page.evaluate(() => {
    return {
      html: document.body.innerHTML,
      text: document.body.innerText,
    };
  });

  // Close the browser
  await browser.close();
*/

export default getProductDetail;
