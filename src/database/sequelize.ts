import { Sequelize } from "sequelize-typescript";

export const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT || '0'),
    models: [__dirname + '/model'],
    logging: false,
});
console.log(__dirname + '/model');
