var mongoose = require('mongoose');
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true});
    
async function func() 
{
    let conn= mongoose.connection;
    
conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('error', console.error.bind(console, 'connection error:'));
module.exports = conn;
}
    

func()
