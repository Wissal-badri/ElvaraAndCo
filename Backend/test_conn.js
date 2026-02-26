require('dotenv').config();
const { Sequelize } = require('sequelize');
const seq = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
});
async function test() {
    console.log('Testing connection...');
    try {
        await seq.authenticate();
        console.log('Connection established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        await seq.close();
        console.log('Connection closed.');
    }
}
test();
