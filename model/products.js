const Database = require('../config/db')

module.exports = {
    async getAll() {
        console.time()

        const connector = await Database()

        const allPRDs = await connector.all(`
            SELECT * FROM Products;
        `)

        await connector.close()

        console.timeEnd()
        console.time('All products was got successfully!')

        return allPRDs
    },
    async setA(prod_data) {
        console.time()

        const connector = await Database()

        await connector.run(`
            INSERT INTO Products VALUES (
                NULL,
                "${prod_data.name}",
                ${prod_data.price}
            );
        `)

        await connector.close()

        console.timeEnd()
        console.info('Insert ended!')

        return "Product"
    }
}