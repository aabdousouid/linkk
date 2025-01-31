const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
//const { MongoMemoryServer } = require("mongodb-memory-server");
const {MongoMemoryServer} = require("mongodb-memory-server-core")
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

process.env.BASE_URL = "http://localhost:5000";

require("../routes/urlRoutes")(app);

jest.setTimeout(15000);

let mongoServer;


beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("URL Shortener API", () => {
  test("GET /api/url/test returns a test message", async () => {
    const res = await request(app).get("/api/url/test");
    expect(res.status).toBe(200);
    expect(res.text).toBe("Test route working!");
  });

  test("POST /api/url/shortenUrl returns a shortened URL for a valid URL", async () => {
    const res = await request(app)
      .post("/api/url/shortenUrl")
      .send({ longUrl: "https://example.com" });
      
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("shortUrl");
    expect(res.body.shortUrl).toContain(process.env.BASE_URL);
  });

  test("POST /api/url/shortenUrl returns an error for an invalid URL", async () => {
    const res = await request(app)
      .post("/api/url/shortenUrl")
      .send({ longUrl: "invalid-url" });
      
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});
