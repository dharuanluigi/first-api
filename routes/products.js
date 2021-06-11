const routes = require('express').Router()
const productController = require('../controller/products')

routes.get('/', (req, res, next) => {
    res.status(200).send({
        message: "All products was got!",
        data: productController.getAll()
    })
})

routes.post('/', (req, res, next) => {
    
    res.status(201).send({
        message: "Product added successfully",
        data: ""
    })
})

routes.patch('/:id', (req, res, next) => {
    res.status(200).send({
        message: "Product updated successfully",
        id: req.params.id
    })
})

routes.delete('/:id', (req, res, next) => {
    res.status(200).send({
        message: "Product deleted"
    })
})

module.exports = routes