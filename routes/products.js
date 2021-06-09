const routes = require('express').Router()

routes.get('/', (req, res, next) => {
    res.status(200).send({
        message: "Get all products"
    })
})

routes.post('/', (req, res, next) => {
    const prd = {
        name: req.body.name,
        qtd: req.body.qtd
    }
    res.status(201).send({
        message: "Product added successfully",
        product: {
            ...prd
        }
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