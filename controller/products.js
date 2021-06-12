const productModel = require('../model/products')

module.exports = {
    async getAll() {
        return await productModel.getAll()
    },
    async addProd(prod_data) {
        return await productModel.setA(prod_data)
    }
}