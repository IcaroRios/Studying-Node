const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose') 


const bodyParser = require('body-parser')
const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')

mongoose.connect(
    'mongodb+srv://node-shop:' + 
    process.env.MONGO_ATLAS_PW  
    + '@node-rest-shop-3jy8x.mongodb.net/test?retryWrites=true',
    { useNewUrlParser: true }
)
mongoose.Promise = global.Promise;

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin','*')//poderia ser('Access-Control-Allow-Origin','www.meusite.com')
    res.header('Access-Control-Allow-Headers','Origin, X-request-With, Content-Type, Accept, Authorization')
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})

//routes witch should handle request
app.use('/products',productRoutes)
app.use('/orders',orderRoutes)

app.use((req, res,  next)=>{
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res,  next)=>{
    res.status(error.status || 500)
    res.json({
        error:{
            message: error.message
        }
    })
})
module.exports = app