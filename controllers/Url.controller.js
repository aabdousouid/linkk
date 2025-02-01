const db = require("../models");
const shortid = require("shortid");
const validUrl = require("valid-url");
const {errorMonitor} = require("supertest/lib/test");
const Url = db.url;

const mongoose = require("mongoose");


exports.shortenUrl = async(req,res)=>{
    const {longUrl} = req.body;
    if(!validUrl.isUri(longUrl)){
        return res.status(400).json({error:"Invalid URL"});
    }
    try{
        let url = await Url.findOne({longUrl});
        if(url){
            return res.json({shortUrl: `${process.env.BASE_URL}/${url.shortUrl}`});
            
        }else{
            const shortUrl = shortid.generate();
            url = new Url({longUrl,shortUrl});
            await url.save();
            res.json({shortUrl : `${process.env.BASE_URL}/${shortUrl}`});
        }
        
    }catch(err){
        console.log(err);
            res.status(500).json({error:"server error"});
        }
    }



exports.testing = async(req,res)=>{
    
    res.send("Test route working!");
}

exports.getUrls = async(req,res)=>{
    try {
        
        const urls = await Url.find();
        if(!urls){
          console.log("empty")
        }
        else res.json(urls);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
      }
}

exports.getShortUrl = async(req,res)=>{
    try {
        const url = await Url.findOne({ shortUrl: req.params.shortUrl });
    
        if (url) {
          return res.redirect(url.longUrl);
        } else {
          return res.status(404).json({ error: "URL not found" });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
      }
}