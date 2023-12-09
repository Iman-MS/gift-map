import OpenAI from "openai";
import puppeteer from "puppeteer";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage } from "langchain/schema";
import { SerpAPI } from "langchain/tools";

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
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

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

      // Remove elements with "button" in their class name
      document
        .querySelectorAll('[class*="button"]')
        .forEach((el) => el.remove());

      // Remove elements with "button" in their id name
      document.querySelectorAll('[id*="button"]').forEach((el) => el.remove());

      // Remove elements with "review" in their class name
      document
        .querySelectorAll('[class*="review"]')
        .forEach((el) => el.remove());

      // Remove elements with "review" in their id name
      document.querySelectorAll('[id*="review"]').forEach((el) => el.remove());

      // Remove elements with "warranty" in their class name
      document
        .querySelectorAll('[class*="warranty"]')
        .forEach((el) => el.remove());

      // Remove elements with "warranty" in their id name
      document
        .querySelectorAll('[id*="warranty"]')
        .forEach((el) => el.remove());

      // Remove elements with "guarantee" in their class name
      document
        .querySelectorAll('[class*="guarantee"]')
        .forEach((el) => el.remove());

      // Remove elements with "guarantee" in their id name
      document
        .querySelectorAll('[id*="guarantee"]')
        .forEach((el) => el.remove());
    });

    // Extract text content
    results = await page.evaluate(() => {
      const bodyContent = document.body.textContent;

      const images = Array.from(document.querySelectorAll("img"));
      const imgSrcArray = images.map((img) =>
        img.alt ? `(${images.alt + img.src})` : null
      );

      return `${imgSrcArray.join("\n")}\n${bodyContent}`;
    });

    results = results.replace(/\s*\n\s*/g, "\n").replace(/ {2,}/g, " ");
  } catch (error) {
    results = `Error: ${error}`;
  }

  await browser.close();

  return results;
};

// getting product detail using openai functions
const getProductDetail = async (req, res) => {
  const openai = new OpenAI({
    apiKey: `${process.env.OPENAI_API_KEY}`,
  });

  const content = await asyncLoadPuppeteer(req.query.url);

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0,
    messages: [
      {
        role: "user",
        content: `Given the following text content from a product detail page. I would like to get the product detail. Give me the title, description of the product, the price of the product, and the main image link of the product itself\n${content.slice(
          0,
          10000
        )}`,
      },
    ],
    tools: [
      {
        type: "function",
        function: {
          name: "get_product_detail",
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
                type: "number",
                description: "the price of the product",
              },
              productImageLink: {
                type: "string",
                description: "the main image link of the product itself",
              },
            },
            required: ["title", "description", "price", "productImageLink"],
          },
        },
      },
    ],
    tool_choice: "auto",
  });

  if (completion.choices[0].message.tool_calls[0]?.function?.arguments) {
    const completionArguments = JSON.parse(
      completion.choices[0].message.tool_calls[0].function.arguments
    );

    console.log(completion.choices[0].message.tool_calls[0].function.arguments);

    const { title, description, price, productImageLink } = completionArguments;

    res.status(200).json({
      success: true,
      data: { title, description, price, imageLink: productImageLink },
    });
  } else {
    res.status(502).json({ success: false });
  }
};

// // getting product detail using langchain
// const getProductDetail = async (req, res) => {
//   const content = await asyncLoadPuppeteer(req.query.url);

//   const modelForFunctionCalling = new ChatOpenAI({
//     modelName: "gpt-3.5-turbo",
//     temperature: 0,
//   });

//   const response = await modelForFunctionCalling.predictMessages(
//     [
//       new HumanMessage(
//         `Given the following text content from a product detail page. I would like to get the product detail. Give me the title, description of the product, the price of the product, and the main image link of the product\n${content.slice(
//           0,
//           10000
//         )}`
//       ),
//     ],
//     {
//       functions: [
//         {
//           name: "get_product_detail",
//           description: "gets the product detail",
//           parameters: {
//             type: "object",
//             properties: {
//               title: {
//                 type: "string",
//                 description: "the title of the product",
//               },
//               description: {
//                 type: "string",
//                 description: "the description of the product",
//               },
//               price: {
//                 type: "number",
//                 description: "the price of the product",
//               },
//               productImageLink: {
//                 type: "string",
//                 description: "an image link of the product",
//               },
//             },
//             required: ["title", "description", "price", "productImageLink"],
//           },
//         },
//       ],
//       // You can set the `function_call` arg to force the model to use a function
//       function_call: {
//         name: "get_product_detail",
//       },
//     }
//   );

//   if (response.additional_kwargs?.function_call?.arguments) {
//     const completionArguments = JSON.parse(
//       response.additional_kwargs.function_call.arguments
//     );

//     const { title, description, price, productImageLink } = completionArguments;

//     res.status(200).json({
//       success: true,
//       data: { title, description, price, imageLink: productImageLink },
//     });
//   } else {
//     res.status(502).json({ success: false });
//   }
// };

export default getProductDetail;
