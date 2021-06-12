require("dotenv").config()
const routes = require("express").Router()
const productController = require("../controller/products")

routes.get("/", (req, res, next) => {
    productController.getAll()
    .then((content) => {
        res.status(content.status).send({
            message: content.message,
            quantity: content.quantity,
            request: {
                type: "GET",
                description: "Get all products. Util 100 per request.",
                url: process.env.URL + ":" + process.env.PORT + "/products/"
            },
            data: content.data
        })
    })
    .catch((err) => {
        console.log(err)
        return res.status(500).send({
            message: "Internal issue"
        })
    })
})

routes.get("/:id", (req, res, next) => {
    productController.get(req.params.id)
    .then((content) => {
        res.status(content.status).send({
            message: content.message,
            quantity: content.quantity,
            request: {
                type: "GET",
                description: "Get all products. Util 100 per request.",
                url: process.env.URL + ":" + process.env.PORT + "/products/"
            },
            data: content.data
        })
    })
    .catch((err) => {
        console.log(err)
        return res.status(500).send({
            message: "Internal issue"
        })
    })
})

routes.post("/", (req, res, next) => {
    productController.addProd(req.body)
    .then((content) => {
        return res.status(content.status).send({
            message: content.message,
            request: {
                type: "POST",
                description: "Insert a product",
                url: process.env.URL + ":" + process.env.PORT + "/products/"
            },
            dataAdded: {
                name: req.body.name,
                price: req.body.price
            }
        })
    })
    .catch((err) => {
        console.log(err)
        return res.status(500).send({
            message: "Internal issue"
        })
    })
})

routes.patch("/", (req, res, next) => {
    productController.updateProd(req.body)
    .then((content) => {
        res.status(content.status).send({
            message: content.message
        })
    })
    .catch((err) => {
        console.log(err)
        return res.status(500).send({
            message: "Internal issue"
        })
    })
})

routes.delete("/:id", (req, res, next) => {
    productController.deleteProd(req.params.id)
    .then((content) => {
        res.status(content.status).send({
            message: content.message
        })
    })
    .catch((err) => {
        console.log(err)
        return res.status(500).send({
            message: "Internal issue"
        })
    })
})

module.exports = routes