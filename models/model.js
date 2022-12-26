var mongoose = require('mongoose');
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true});

 
// create an schema
var IPLdataSchema = new mongoose.Schema({        
            Mid:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'IPLLinks'
            },
            Pid:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'IPLplayers'
            },
            Score:Number
        });
 
 
module.exports = mongoose.model("IPLdatas", IPLdataSchema);