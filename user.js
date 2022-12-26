var express = require('express')
var userModel = require('./models/allplayer');
var connection = require('./database')
var router = express.Router()


  connection.query('SELECT * FROM demo.all_player', function (err, rows) {
    if (err) {
      console.log(err);
    } else 
    {
        
      rows.forEach(element => {
 
        var userDetails = new userModel({
            Pid:element["Pid"],
            Pname:element["Pname"]
          });
           
          userDetails.save((err, doc) => {
                if (!err)
                console.log("Yes")
                else
                    console.log('Error during record insertion : ' + err);
          });
      });
      
    }

})
module.exports = router