const Database = require('./db')

const initDB = {
    async init() {
        await this.createTableProducts()
        await this.createTableOrder()
    },
    async createTableProducts() {
        console.time()
        const connector = await Database()

        await connector.run(`
            DROP TABLE IF EXISTS Products;
        `)

        await connector.run(`
            CREATE TABLE Products (
                id_prod INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR(45) UNIQUE,
                price FLOAT
            );
        `)

        await connector.close()

        console.timeEnd()
        console.info('Table PRODUCTS, created successfully!')
    },
    async createTableOrder() {
        console.time()
        const connector = await Database()

        await connector.run(`
            DROP TABLE IF EXISTS Orders;
        `)

        await connector.run(`
            CREATE TABLE Orders (
                id_ord INTEGER PRIMARY KEY AUTOINCREMENT,
                id_prod INTEGER,
                qtd INTEGER,
                FOREIGN KEY (id_prod) REFERENCES Products (id_prod)
            );
        `)
        
        await connector.close()

        console.timeEnd()
        console.info('Table ORDERS, created successfully!')
    }
}

initDB.init()