const express = require("express");
const fyers = require("fyers-api-v2");

const app = express();
const port = 8080;


// get the Console class
const { Console } = require("console");
// get fs module for creating write streams
const fs = require("fs");

// make a new logger
const myLogger = new Console({
  stdout: fs.createWriteStream("normalStdout.txt"),
});



var te = 1;
app.get("/test", (req, res) => {
    te++;
  res.send(`TE IS ${te}`);
});

app.get("/start", (req, res) => {
  fyers.setAppId("UJPANFYQ83-100");
  fyers.setRedirectUrl("https://electricsuitcase.tech/auth");
  fyers.setAccessToken(
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkuZnllcnMuaW4iLCJpYXQiOjE2NTUwOTcyOTcsImV4cCI6MTY1NTE2NjY1NywibmJmIjoxNjU1MDk3Mjk3LCJhdWQiOlsieDowIiwieDoxIiwieDoyIiwiZDoxIiwiZDoyIiwieDoxIiwieDowIl0sInN1YiI6ImFjY2Vzc190b2tlbiIsImF0X2hhc2giOiJnQUFBQUFCaXBzZlIyU3BiZlgyTnF3bmpVaHhRa2RiMWhnVWxpeDBzRW53bWxMeDR4a05aQjdDX0hINUVpQ2hEeXdjVE5lRTRXdk5BMzVwWEpjRHZyVG5VOGdZaTBXTUNoRGluaVJYY2Q1cGUtVEJjTVlpS1VqMD0iLCJkaXNwbGF5X25hbWUiOiJHVVJQUkVFVCBLQVVSIiwiZnlfaWQiOiJYRzA1NjgzIiwiYXBwVHlwZSI6MTAwLCJwb2FfZmxhZyI6Ik4ifQ.kNh_undTe451A_iNIvOYOu5ObMiTxyO7xZoOt4lxyac"
  );
  const reqBody = {
    symbol: ["NSE:ONGC-EQ", "NSE:IOC-EQ"],

    dataType: "symbolUpdate",
  };

  fyers.fyers_connect(reqBody, function (data) {
    myLogger.log(data);
    te++;
    //write your code here
  });
});
app.get("/stop", (req, res) => {
  const reqBody = {
    symbol: ["NSE:ONGC-EQ", "NSE:IOC-EQ"],

    dataType: "symbolUpdate",
  };

  fyers.fyers_unsuscribe(reqBody);
  res.send("DONE");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
