/* require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dbConfig = require("./config/db.config");


const urlRoutes = require("./routes/urlRoutes");

const app = express();
app.use(express.json());
app.use(cors());
console.log("Registered Routes:", app._router.stack.map(r => r.route?.path));

mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`,{
    useNewUrlParser:true,
  }) 
.then(()=>{
    console.log("Successfully connect to MongoDB");
    
})
.catch(err=>{
    console.error("Connection error",err); 
    process.exit();
});
console.log("Loaded routes file:", urlRoutes);
app.use("/api/url", urlRoutes);
app.use("/api/url", urlRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));
app.get("/",(req,res)=>{message:`test ${PORT}`});
app.get("/test", async (req, res) => {
    console.log("testing");
    res.send("Test route working!");
  }); */

  const express = require("express");
  const cors = require("cors");
  const db = require("./models");
require("dotenv").config();
  const dbConfig = require("./config/db.config");
  db.mongoose
  .connect(process.env.MONGODB_CONNECT_URI,{
    useNewUrlParser:true,
  })
  .then(()=>{
    console.log("Successfully connect to MongoDB")
  })
  .catch(err=>{
    console.error("Connection error",err); 
    process.exit();
});

/*   db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`,{
    useNewUrlParser:true,
  }) 
.then(()=>{
    console.log("Successfully connect to MongoDB");
    
})
.catch(err=>{
    console.error("Connection error",err); 
    process.exit();
}); */
const app = express();
var corsOptions = {
    origin : "http://localhost:8081"
};


app.use(cors({corsOptions,origin:true,methods:'POST,GET,PUT,OPTIONS,DELETE',credentials:true}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

require('./routes/urlRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  }); 