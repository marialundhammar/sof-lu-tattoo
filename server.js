const express = require("express");
const axios = require("axios").default;
const app = express();

const nodeMailer = require("nodemailer");
const { request } = require("express");
/* 
const multer = require("multer");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
 */

require('dotenv').config();

/* test
 */
const port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}


//middleware
app.use(express.static("public"));
app.use(express.json());
/* app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(fileupload); */

//var path;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/contact-form.html");
});
/* 
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'public/images')

  },
  filename: function (req, file, callback) {
    let filename = 'filenametogive';
    req.body.file = filename;
    callback(null, filename + "_" + Date.now())
  } 
}) 

/* const upload = multer({
  storage: storage, limits: { fieldSize: 10 * 1024 * 1024 }
}).single('image')
 */

app.get("/instagram", (req, res) => {
  res.sendFile(__dirname + "/public/instagram.html");
});

app.get("/images", (req, res) => {
  const TOKEN =
    "IGQVJXMEZAwT2hYZAFdScHFfNVliRDI5N2JZAYm9qV2N6bk93S3BtM05XRFdZAWTNDQmlzcVM3T1pILXppMFVjeS16UUpCVk1KbTV6VlZATNDBjUXVYX0FtV1pUSzVnZA3ppdzZArQ3ZAIRWpsU0FnQVYxMXZAscAZDZD";
  const url = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink&access_token=${TOKEN}`;
  axios.get(url).then((response) => {
    res.send(response.data);
  });
});

app.post("/", (req, res) => {
  console.log(req.body);
  //console.log(req.file);

  /*   upload(req, res, function (err) {
      if (err) {
        console.log(err)
        return res.end("something went wrong")
      } else {
   */
  //console.log(req.file);
  /*     console.log(req.body.file)
      path = req.file.path;
      console.log(path); */




  const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: req.body.email,
    to: "marialundhammar@gmail.com",
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
