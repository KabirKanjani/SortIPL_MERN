var mongoose = require('mongoose');
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true});

 
// create an schema
var IPLplayerSchema = new mongoose.Schema({            
            Pname:String
        });
 
 
module.exports = mongoose.model("IPLplayers", IPLplayerSchema);