const productModel = require('../model/products')

module.exports = {
    async getAll() {
        return await productModel.getAll()
    },
    async addProd(prod_data) {
        
    }
}