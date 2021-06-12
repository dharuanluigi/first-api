const Database = require('../config/db')

module.exports = {
    async getAll() {

        let response = "Here we are, all products bellow"
        let status = 200
        let data = null

        console.time()
        const connector = await Database()

        try {
             data = await connector.all(`
                SELECT * FROM Products;
            `)
        }
        catch(err) {
            response = "Problem when try to get all products!"
            status = 500
        }
        finally {
            await connector.close()
        }
        console.timeEnd()

        return {
            response,
            status,
            data: data === null ? "There nothing here!" : data
        }
    },
    async setA(prod_data) {
        
        let response = "Product added successfully"
        let status = 200

        console.time()

        const connector = await Database()

        try {
            await connector.run(`
                INSERT INTO Products (name, price) VALUES (
                    "${prod_data.name}",
                    ${prod_data.price}
                );
            `)
        }
        catch(err) {
            switch(err.errno) {
                case 19:
                    response = "Value already exist!"
                    status = 409
                    break
                default:       
                    response = "Unknow error!"
                    status = 500
            }
        }
        finally {
            await connector.close()
        }

        console.timeEnd()

        return {
            response,
            status
        }
    }
}