/* const express = require("express");
const router = express.Router();
const Url = require("../models/Url");
const shortid = require("shortid");
const validUrl = require("valid-url");
const { errorMonitor } = require("supertest/lib/test");

// POST /shorten: Shortens a given URL
router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;

  if (!validUrl.isUri(longUrl)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  try {
    let url = await Url.findOne({ longUrl });

    if (url) {
      return res.json({ shortUrl: `${process.env.BASE_URL}/${url.shortUrl}` });
    } else {
      const shortUrl = shortid.generate();
      url = new Url({ longUrl, shortUrl });
      await url.save();
      res.json({ shortUrl: `${process.env.BASE_URL}/${shortUrl}` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /:shortUrl: Redirects to the original URL
router.get("/:shortUrl", async (req, res) => {
  try {
    const url = await Url.findOne({ shortUrl: req.params.shortUrl });

    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json({ error: "URL not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


router.get("/all", async (req, res) => {
  try {
    console.log("bruh")
    const urls = await Url.find();
    if(!urls){
      console.log("empty")
    }
    else res.json(urls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/test", async (req, res) => {
  console.log("testing");
  res.send("Test route working!");
});
module.exports = router;
 */
const controller = require("../controllers/Url.controller");


module.exports = function(app){
  app.use(function(req,res,next){
      res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept");
          next();
      
  });

  app.get("/api/url/test",
    controller.testing
  );
  app.post("/api/url/shortenUrl",
    controller.shortenUrl
  );

  app.get("/:shortUrl",
    controller.getShortUrl
  )
}