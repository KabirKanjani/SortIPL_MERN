const mongoose = require("mongoose");

const TeamSchema = mongoose.Schema({
    team_name : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model("Teams",TeamSchema)