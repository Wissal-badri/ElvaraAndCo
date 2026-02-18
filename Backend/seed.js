require('dotenv').config();
const sequelize = require('./config/database');
require('./models/index');
const { User } = require('./models');

async function seed() {
    try {
        await sequelize.sync({ alter: true });

        // Create admin user
        const existing = await User.findOne({ where: { username: 'admin' } });
        if (!existing) {
            await User.create({ username: 'admin', password: 'elvara2026', role: 'admin' });
            console.log('✅ Admin user created: admin / elvara2026');
        } else {
            console.log('ℹ️  Admin user already exists.');
        }
        process.exit(0);
    } catch (err) {
        console.error('❌ Seed failed:', err);
        process.exit(1);
    }
}

seed();
