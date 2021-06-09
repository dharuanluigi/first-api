const routes = require('express').Router()

routes.get('/', (req, res, next) => {
    res.status(200).send({
        message: "Get all orders"
    })
})

routes.post('/', (req, res, next) => {
    res.status(201).send({
        message: "Order maked"
    })
})

routes.patch('/:id', (req, res, next) => {
    res.status(200).send({
        message: "Order updated",
        id: req.params.id
    })
})

routes.delete('/:id', (req, res, next) => {
    res.status(200).send({
        message: "Order deleted"
    })
})

module.exports = routes