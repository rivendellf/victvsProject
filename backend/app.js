import express from "express";
import bodyParser from "body-parser";

import fs from "fs";
import cors from "cors";

const app = express();

const PORT = 9000;

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello from the homepage");
});

app.get("/api/getData", (req, res) => {
  fs.readFile("./dataJSON.json", "utf8", (err, data) => {
    const parsedData = JSON.parse(data);
    res.send(JSON.stringify(parsedData));
  });
});

app.get("/api/getTitles", (req, res) => {
  fs.readFile("./dataJSON.json", "utf8", (err, data) => {
    const parsedData = JSON.parse(data);
    const titles = parsedData.map((obj) => obj.Title);
    res.send(JSON.stringify(titles));
  });
});

app.get("/api/getDescription", (req, res) => {
  fs.readFile("./dataJSON.json", "utf8", (err, data) => {
    const parsedData = JSON.parse(data);
    const description = parsedData.map((obj) => obj.Description);
    res.send(JSON.stringify(description));
  });
});

app.get("/api/getCandidateName", (req, res) => {
  fs.readFile("./dataJSON.json", "utf8", (err, data) => {
    const parsedData = JSON.parse(data);
    const candidateName = parsedData.map((obj) => obj.CandidateName);
    const unique = [...new Set(candidateName)];
    res.send(JSON.stringify(unique));
  });
});

app.get("/api/getLocationList", (req, res) => {
  fs.readFile("./dataJSON.json", "utf8", (err, data) => {
    const parsedData = JSON.parse(data);
    const location = parsedData.map((obj) => obj.LocationName);
    const unique = [...new Set(location)];
    res.send(JSON.stringify(unique));
  });
});

app.get("/api/getDateList", (req, res) => {
  fs.readFile("./dataJSON.json", "utf8", (err, data) => {
    const parsedData = JSON.parse(data);
    const date = parsedData.map((obj) => obj.Date);
    const unique = [...new Set(date)];
    res.send(JSON.stringify(unique));
  });
});

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);

app.use(express.json());
