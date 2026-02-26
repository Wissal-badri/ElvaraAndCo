require('dotenv').config();
const sequelize = require('./config/database');
const User = require('./models/User');

async function run() {
    try {
        await sequelize.authenticate();
        console.log('✅ Connected to database.');

        // Destroy existing admin to ensure password hook runs on creation
        await User.destroy({ where: { username: 'admin' } });
        await User.create({
            username: 'admin',
            password: '123456',
            role: 'admin'
        });
        
        console.log('✅ Admin user recreated. Username: admin, Password: 123456');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error:', err.message);
        process.exit(1);
    }
}
run();
