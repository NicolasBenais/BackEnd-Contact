require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(formidable());

const api_key = process.env.API_KEY;
const domain = process.env.DOMAIN;
const MAIL = process.env.EMAIL;

const mailgun = require("mailgun-js")({ apiKey: api_key, domain: domain });

app.post("/contact-form", (req, res) => {
  const { firstname, lastname, email, message } = req.fields;

  const data = {
    from: `${firstname} ${lastname} ${email}`,
    to: MAIL,
    subject: `Contact form from ${firstname} ${lastname}`,
    text: message,
  };

  mailgun.messages().send(data, (error, body) => {
    console.log(error);
    console.log(body);
  });

  res.status(200).json({ message: "message sent !" });
});

app.listen(process.env.PORT, () => {
  console.log("Serveur started !");
});
