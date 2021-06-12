const Database = require('../config/db')

module.exports = {
    async getAll() {

        let response = {
            message: "Here we are, all products bellow",
            status: 200,
            quantity: 0,
            data: []
        }

        const connector = await Database()

        try {
            const data = await connector.all(`
                SELECT * FROM Products;
            `)

            response.quantity = data.length
            response.data = data
        }
        catch(err) {
            console.log(err)
            response = this.getErrorDictionary(err.errno)
        }
        finally {
            await connector.close()
        }

        return response
    },
    async get(id) {
        let response = {
            message: "Product information bellow",
            status: 200,
            data: []
        }

        const connector = await Database()

        try {
            const data = await connector.get(`
                SELECT * FROM Products
                WHERE id_prod = ${id};
            `)

            if(data) {
                response.data = data
            }
            else {
                response.message = "No data found!"
                response.status = 404
            }
        }
        catch(err) {
            console.log(err)
        }
        finally {
            await connector.close()
        }

        return response
    },
    async set(prod_data) {
        
        let response = {
            message: "Product added successfully",
            status: 200
        }

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
            response = this.getErrorDictionary(err.errno)
        }
        finally {
            await connector.close()
        }

        return response
    },
    async update(prod_data) {
        
        let response = {
            message: "Product updated successfully!",
            status: 200
        }
        const connector = await Database()

        try {
            await connector.run(`
                UPDATE Products
                SET name = "${prod_data.name}",
                price = ${Number(prod_data.price)}
                WHERE id_prod = ${Number(prod_data.id)};
            `)
        }
        catch(err) {
            response = this.getErrorDictionary(err.errno)
        }
        finally {
            await connector.close()
        }

        return response
    },
    async delete(prod_id) {
        let response = {
            message: "Product deleted sucessfully!",
            status: 200
        }

        const connector = await Database()

        try {
            await connector.run(`
                DELETE FROM Products
                WHERE id_prod = ${Number(prod_id)};
            `)
        }
        catch(err) {
            console.log(err)
        }
        finally {
            await connector.close()
        }

        return response
    },
    getErrorDictionary(error_index) {
        let message = null
        let status = null

        switch(error_index) {
            case 19:
                message = "Product name already exist!"
                status = 409
                break
            default:
                message = "Internal unknow issue"
                status = 500
        }

        return {
            message,
            status
        }
    }
}