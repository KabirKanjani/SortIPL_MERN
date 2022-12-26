const express = require("express");

const app = express();
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
app.use(express.urlencoded({ extended: true }));
var parser = require('body-parser');
app.use(express.static('public'));
app.use(parser.urlencoded({ extended: false }))
app.use("/css", express.static(__dirname + '/css'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/img", express.static(__dirname + '/img'));
const Player = require("./models/allplayer")
const IplLink = require("./models/ipllinkmodel")
const IplData = require("./models/model")
const Teams = require("./models/team.model");
const env=require("dotenv");
env.config({path:"config.env"});

app.use(parser.json())
app.use("/images",express.static(__dirname+'/images'));



app.get("/", async (req, res) => {
    res.render("table");
});
app.get("/Check", async (req, res) => {
    res.render("index");
});
app.post("/details", async (req, res) => {
    try {
        const player_id=await Player.findOne({Pname:req.body.player}).populate('_id');
        console.log(player_id)
        const player_details = await IplData.find({Pid : player_id._id,Score:{$gte:req.body.score}}).populate('Pid').populate({
            path : 'Mid',
            populate: [{
                path :"Team1",
            },{
                path :"Team2",
            }]
        });
        
        console.log(player_details);    
        res.render("table",{items:player_details});
    } catch (error) {
        console.log(error)        
    }
})

app.get("/search",async(request,response)=>{
    try{        
        console.log(request.query.term)
        // let results=await Player.aggregate([
        //     {
        //       "$search": {
        //         "index": "default", 
        //         "autocomplete": {
        //           "query": `${request.query.term}`,
        //           "path": "Pname",
        //           "fuzzy": {
        //             "maxEdits":1,
        //             "prefixLength": 3,
        //           },
                  
        //         },
        //       },
        //     },
        // {
        //   $limit: 3
        // },
        // {
        //   $project: {
        //     "_id": 0,
        //   }
        // }

        //   ]);
        let results=await Player.find({ Pname: {'$regex' : `^${request.query.term}`, '$options' : 'i'}});
        console.log(results);
        response.send(results);
    }
    catch(error)
    {
        response.status(500).send({message:error.message})
    }
})

app.set('view engine', 'ejs');
app.use(express.json());


app.listen(process.env.PORT||3000, (err) => {
})