require('dotenv').config();
const sequelize = require('./config/database');
require('./models/index');
const { User } = require('./models');

async function seed() {
    try {
        await sequelize.sync({ alter: true });

        // Delete existing admin and recreate with new password
        await User.destroy({ where: { username: 'admin' } });
        await User.create({ username: 'admin', password: '123456', role: 'admin' });
        console.log('✅ Admin user reset: username=admin  password=123456');

        process.exit(0);
    } catch (err) {
        console.error('❌ Seed failed:', err);
        process.exit(1);
    }
}

seed();
