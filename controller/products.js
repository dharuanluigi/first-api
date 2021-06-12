const productModel = require('../model/products')

module.exports = {
    async getAll() {
        return await productModel.getAll()
    },
    async get(prod_id) {
        return await productModel.get(prod_id)
    },
    async addProd(prod_data) {
        return await productModel.set(prod_data)
    },
    async updateProd(prod_data) {
        return await productModel.update(prod_data)
    },
    async deleteProd(prod_id) {
        return await productModel.delete(prod_id)
    }
}