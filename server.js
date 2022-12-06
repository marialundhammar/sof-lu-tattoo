const express = require("express");
const axios = require("axios").default;
const app = express();

const nodeMailer = require("nodemailer");
const { request } = require("express");

require('dotenv').config();

/* test
 */
let port = process.env.PORT;
if (port == null || port == "") {
  port=5000; 
}


//middleware
app.use(express.static("public"));
app.use(express.json());
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/contact-form.html");
});

app.get("/instagram", (req, res) => {
  res.sendFile(__dirname + "/public/instagram.html");
});

app.get("/images", (req, res) => {
  const url = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink&access_token=${process.env.TOKEN}`;
  axios.get(url).then((response) => {
    res.send(response.data);
  });
});
app.post("/", (req, res) => {
  console.log(req.body);

  const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: req.body.email,
    to: "soflutattoo@gmail.com",
    subject: `Bokning från ${req.body.name} med mailadress ${req.body.email} `,
    text:
      `Mejl: ${req.body.email}
    📞 Telefonnummer: ${req.body.phone} \n
    Beskriv motivet du vill göra: ${req.body.message} \n 
    Typ av tatuering: ${req.body.type} \n 
    Storlek av tatueringen: ${req.body.size}\n
    Länk till pintrest eller google drive-länk eller liknande: ${req.body.url}`,


  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      console.log("Email sent:" + info.response);
      res.send("success");
    }
  });

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
