const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

//Configuration

require('dotenv').config()
const PORT = process.env.PORT
const app = express()
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
    
  }).then( () => {console.log('mongo has been connected to') })
//Middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())


//Routes
app.get('/', (req,res)=>{
    res.json({ message :'Enabled CORS for all origins'})
})

//books
const booksController = require('./controlllers/books_controller.js')
app.use('/books', booksController)

//404
app.get('*', (req,res)=>{
    res.status(404).json({
        message: 'Error loading page.'
    })
})
//listen
app.listen(PORT, ()=> {
    console.log(`Hello? Hi! I'm in port`, PORT)
})