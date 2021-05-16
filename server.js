const express = require('express')
const mongoose =require('mongoose')
require('dotenv').config()
const app = express()

//initial route
app.get('/',(req,res)=>{
    res.send('<h1>Api is ready!!!</h1')
})

//database connection
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then(()=>console.log('connected with db')).catch((e)=>console.log('Error in db connect',e));

//Middleware
app.use(express.json())
app.use('/api',require('./View/admin/adminRoute'))
app.use('/api',require('./View/ImageKit/fileKit'))
app.use('/api',require('./View/category/categoryRoute'))

//listen post
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on ${process.env.PORT}`)
})