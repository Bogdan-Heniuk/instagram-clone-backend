module.exports = {

    development: {
        client: 'mysql2',
        version: '8.0',

        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: '1111',
            database: 'shop'
        },

        migrations: {
            directory: "./db/migrations"
        },
    },

    production: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }

};
