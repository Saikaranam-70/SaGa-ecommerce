//import sections
const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
const venderRoutes = require('./routes/venderRoutes')
const firmRoutes = require('./routes/firmRoutes')
const productRoutes =  require('./routes/productRoutes')
const path = require('path')
const cors = require('cors')

const app = express()

const PORT = process.env.PORT || 4000;
dotenv.config();
app.use(cors())

//mongoDB connection
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Mongo DB connected successfully")
}).catch((error)=>console.log(error))

app.use(bodyParser.json());
app.use('/vender', venderRoutes);
app.use('/firm', firmRoutes)
app.use('/product', productRoutes)
app.use('/uploads', express.static('uploads'));
//port
app.listen(PORT, ()=>{
    console.log(`server started and running at ${PORT}`)
});
//route
app.use('/',(req,res)=>{
    res.send("<h1>Welcome to SaGa</h1>")
})