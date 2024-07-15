import express from "express";
import axios from "axios";
import ejs from "ejs";
import bodyParser from "body-parser";
import { createClient } from "pexels";

/////////API Key from Pexel//////////////////////////////////////////////////////
const pexelsAPI = "ckWQuiA7cPulG82KjUOhsplhCC4L7AIWHSiyE9zsAuUwkHtDvQkTJuuV";

const client = createClient(pexelsAPI);

// All requests made with the client will be authenticated

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let query = "Tigers";

app.get("/", (req, res) => {
  console.log(req.body);
  client.photos
    .search({ query, page: 15, per_page: 10 })
    .then((photos) => {
      console.log("123456789");
      res.render("index.ejs", { data: photos, dataset:"homepage" });
    })
    .catch((error) => res.sendStatus(404));
});

app.post("/", (req, res) => {
  console.log(req.body);
  query = req.body.name;
  client.photos
    .search({ query, page: 100, per_page: 5 })
    .then((photos) => {
      console.log(photos);
      res.render("index.ejs", { data:photos, dataset:query });
    })
    .catch((error) => res.sendStatus(404));
});

//Number(req.body.img)
// app.post("/Img", (req, res) => {
//   console.log(Number(req.body.img));
//   client.photos
//     .show({ id: +req.body.img })
//     .then((photo) => {
//       res.render("index.ejs", { data: photo.src.medium });
//     }).catch((error) => res.sendStatus(500));
// });
console.log(query)
app.listen(port, function () {
  console.log(`SERVEROT SLUSA NA PORTA: ${port} `);
});
