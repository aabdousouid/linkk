/* const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
    longUrl : {type:String, require:true},
    shortUrl : {type:String, require:true },
    createdAt : {type:Date,default: Date.now}
}) ;


module.exports = mongoose.model("Url",UrlSchema); */
const mongoose = require("mongoose");
const Url = mongoose.model("url",
    new mongoose.Schema({
        longUrl:String,
        shortUrl:String,
        createdAt:{type:Date,default:Date.now}
    })
);

module.exports = Url;