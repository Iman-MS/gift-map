import OpenAI from "openai";
import puppeteer from "puppeteer";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { createExtractionChain } from "langchain/chains";
// import { ChatPromptTemplate } from "langchain/prompts";

// // innerHTML
// const asyncLoadPuppeteer = async (url) => {
//   let results = "";
//   const browser = await puppeteer.launch({ headless: "new" });

//   try {
//     const page = await browser.newPage();
//     await page.goto(url);

//     // Remove script, style, and noscript elements directly using Puppeteer
//     await page.evaluate(() => {
//       document
//         .querySelectorAll(
//           "script, style, noscript, nav, select, a, ol, ul, table"
//         )
//         .forEach((el) => el.remove());

//       document
//         .querySelectorAll("*")
//         .forEach((el) => el.removeAttribute("style"));

//       // Remove elements with "nav" in their class name
//       document.querySelectorAll('[class*="nav"]').forEach((el) => el.remove());

//       // Remove elements with "nav" in their id name
//       document.querySelectorAll('[id*="nav"]').forEach((el) => el.remove());
//     });

//     // Extract HTML
//     results = await page.evaluate(() => document.body.innerHTML);

//     results = results.replace(/\s*\n\s*/g, "\n").replace(/ {2,}/g, " ");

//     // const lines = text.split("\n");
//     // const chunks = lines.map((line) => line.trim()).filter(Boolean);

//     // results = chunks.join("\n");
//   } catch (error) {
//     results = `Error: ${error}`;
//   }

//   await browser.close();

//   return results;
// };

// textContent
const asyncLoadPuppeteer = async (url) => {
  let results = "";
  const browser = await puppeteer.launch({ headless: "new" });

  try {
    const page = await browser.newPage();
    await page.goto(url);

    // Remove script, style, and noscript elements directly using Puppeteer
    await page.evaluate(() => {
      document
        .querySelectorAll(
          "script, style, noscript, nav, select, a, ol, ul, table"
        )
        .forEach((el) => el.remove());

      document
        .querySelectorAll("*")
        .forEach((el) => el.removeAttribute("style"));

      // Remove elements with "nav" in their class name
      document.querySelectorAll('[class*="nav"]').forEach((el) => el.remove());

      // Remove elements with "nav" in their id name
      document.querySelectorAll('[id*="nav"]').forEach((el) => el.remove());
    });

    // Extract text content
    results = await page.evaluate(() => {
      const bodyContent = document.body.textContent;

      const images = Array.from(document.querySelectorAll("img"));
      const imgSrcArray = images.map((img) => img.src);

      return `${imgSrcArray.join("\n")}\n${bodyContent}`;
    });

    results = results.replace(/\s*\n\s*/g, "\n").replace(/ {2,}/g, " ");
  } catch (error) {
    results = `Error: ${error}`;
  }

  await browser.close();

  return results;
};

const getProductDetail = async (req, res) => {
  const openai = new OpenAI({
    apiKey: `${process.env.OPENAI_API_KEY}`,
  });

  const content = await asyncLoadPuppeteer(req.body.url);

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0,
    messages: [
      {
        role: "system",
        content: `Given the following text content from a product detail page. I would like to get the product detail. Give me the title, description of the product, the price of the product, and the main image link of the product\n${content.slice(
          0,
          10000
        )}`,
      },
    ],
    functions: [
      {
        name: "ProductDetail",
        description: "gets the product detail",
        parameters: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "the title of the product",
            },
            description: {
              type: "string",
              description: "the description of the product",
            },
            price: {
              type: "string",
              description: "the price of the product",
            },
            imageLink: {
              type: "string",
              description: "an image link of the product",
            },
          },
          required: ["title", "description", "price"],
        },
      },
    ],
    function_call: "auto",
  });

  const completionArguments = JSON.parse(
    completion.choices[0].message.function_call.arguments
  );

  const { title, description, price, imageLink } = completionArguments;

  res
    .status(200)
    .json({ success: true, data: { title, description, price, imageLink } });
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
