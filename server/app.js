const express = require("express");
const app = express();
const axios = require("axios");

const morgan = require("morgan");
app.use(morgan("dev"));

const cache = {};

app.get("/", (req, res) => {
  let iReq = req.query.i;
  let tReq = req.query.t;

  if (iReq !== undefined) {
    if (cache.hasOwnProperty(iReq) === true) {
      res.send(cache[iReq]);
    } else {
      axios
        .get("http://www.omdbapi.com/?i=" + iReq + "&apikey=8730e0e")
        .then(response => {
          cache[iReq] = response.data;
          res.send(response.data);
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response);
          }
        });
    }
  } else {
    tReq = tReq.replace(" ", "%20");
    if (cache.hasOwnProperty(tReq) === true) {
      res.send(cache[tReq]);
    } else {
      axios
        .get("http://www.omdbapi.com/?t=" + tReq + "&apikey=8730e0e")
        .then(response => {
          cache[tReq] = response.data;
          res.send(response.data);
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response);
          }
        });
    }
  }
});

module.exports = app;
