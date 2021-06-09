const morgan = require('morgan')
const express = require('express')
const app = express()

// configs
app.use(express.urlencoded({extended: false}))
app.use(express.json()) // just accept data from json

// routes
const productRoute = require('../routes/products')
const orderRoute = require('../routes/orders')

// cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Header', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PATH, PUT, DELETE')
        return res.status(204).send({})
    }

    next()
})

// show call logs
app.use(morgan('dev'))

app.use('/products', productRoute)
app.use('/orders', orderRoute)

app.use((req, res, next) => {
    const error = new Error('Nothing was found!')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        error: {
            message: error.message || "Dump server error!"
        }
    })
})

module.exports = app