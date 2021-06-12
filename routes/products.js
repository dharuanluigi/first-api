const routes = require('express').Router()
const productController = require('../controller/products')

routes.get('/', (req, res, next) => {
    productController.getAll()
    .then((content) => {
        res.status(content.status).send({
            message: content.response,
            data: content.data
        })
    })
    .catch((err) => {
        return res.status(500).send({
            message: "Internal issue"
        })
    })
})

routes.post('/', (req, res, next) => {
    productController.addProd(req.body)
    .then((content) => {
        return res.status(content.status).send({
            message: content.response
        })
    })
    .catch((err) => {
        return res.status(500).send({
            message: "Internal issue"
        })
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