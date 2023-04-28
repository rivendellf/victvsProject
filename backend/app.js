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
    const { startDate, endDate } = req.query;

    let filteredData = parsedData;

    if (startDate && endDate) {
      filteredData = parsedData.filter(
        (exam) => exam.Date >= startDate && exam.Date <= endDate
      );
    }

    res.send(filteredData);
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

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);

app.use(express.json());
