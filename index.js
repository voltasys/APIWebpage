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
app.use(bodyParser.urlencoded({extended:true}))

const query = "Airpor";


  app.get("/",  (req, res) => {

    client.photos.search({ query, page:15,per_page: 50 }).then((photos) => {
    res.render("index.ejs", {data:photos});
    console.log(photos)}).catch(error=>res.sendStatus(404))
    

    
  });
  //Number(req.body.img)
  app.post("/Img", (req,res)=>{
    console.log(Number(req.body.img))
    client.photos.show({ id:+req.body.img }).then(photo => {
        console.log(photo)
        res.render("index.ejs", {data:photo.src.medium});
  }).catch(error=>res.sendStatus(500));
        
  })
  

  




app.listen(port, function () {
  console.log(`SERVEROT SLUSA NA PORTA: ${port} `);
});
