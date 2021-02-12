const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const uri = "your_mongo_db_connection";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log("MongoDB Connected!")
})
.catch(err => console.log(err))

module.exports = mongoose