// server.js
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "https://novel-frontend-sigma.vercel.app/",
};

app.use(cors(corsOptions));

app.get("/chapter", async (req, res) => {
  try {
    const url =
      "https://www.royalroad.com/fiction/21220/mother-of-learning/chapter/301778/1-good-morning-brother";
    const { data } = await axios.get(url);
    console.log(data);
    const $ = cheerio.load(data);
    const chapterText = $(".chapter-content").html();
    console.log(chapterText);
    res.send({ content: chapterText });
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch chapter" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
