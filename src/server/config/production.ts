export default {
    knex: {
        client: process.env.KNEX_CLIENT,
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_SCHEMA
        }
    },
    auth: {
        secret: process.env.SECRET
    }
}