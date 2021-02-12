var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var UserSchema = new Schema({
    userID: { type: String, required:true},
    nameOnCard: { type: String, required:true },
    expiryDate: { type: Number, required: true },
    cardType: { type: Date },
    cardNumber: { type: String }
},
{
    collection:"PaymentModes"
});

var Users = mongoose.model("PaymentModes", UserSchema,"PaymentModes");
// the last parameter tells the mongodb server which collection to use ie User here
// it is actually redundant here as we've already specified it in the scehma above, so to write
// at one of the two places.
module.exports = PaymentModes;