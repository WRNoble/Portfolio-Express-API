const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sendGrid = require("@sendGrid/mail");
const { response, request } = require("express");

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Content-type, Authorization"
  );
  next();
});

app.get("/api", (request, response) => {
  response.send("API is running");
});

app.post("/api/email", (request, response, next) => {
  sendGrid.setApiKey(
  
  );
  const message = {
    to: "wrnoblejrsbts@gmail.com",
    from: request.body.email,
    subject: "Portfolio Contact",
    text: request.body.message,
  };
  sendGrid
    .send(message)
    .then((result) => {
      response.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      console.log("error", err);
      response.status(401).json({
        success: false,
      });
    });
});

app.listen(3050, "0.0.0.0");
