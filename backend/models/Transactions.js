var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var UserSchema = new Schema({
    firstname: { type: String, required:true},
    lastname: { type: String, required:true },
    zipcode: { type: Number, required: true },
    birthday: { type: Date },
    address: { type: String },
    phoneno: { type: Number },
    headline: { type: String },
    profimage: { type: String },
    totalreviews: { type: Number },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    nickname: { type: String },
    ilove: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    blog:{ type: String }
},
{
    collection:"Transactions"
});

var Transactions = mongoose.model("Transactions", UserSchema,"Transactions");
// the last parameter tells the mongodb server which collection to use ie User here
// it is actually redundant here as we've already specified it in the scehma above, so to write
// at one of the two places.
module.exports = Transactions;