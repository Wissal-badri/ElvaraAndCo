require('dotenv').config();
const { sequelize, User, Product } = require('./models');

async function seed() {
    try {
        console.log('⏳ Starting database seeding...');
        await sequelize.sync({ alter: true });
        console.log('✅ Database synchronized.');

        // 1. Reset Admin User
        await User.destroy({ where: { username: 'admin' } });
        await User.create({ 
            username: 'admin', 
            password: '123456', 
            role: 'admin' 
        });
        console.log('✅ Admin user reset: username=admin password=123456');

        // 2. Restore Lost Product (White Shirt)
        const [whiteShirt, created] = await Product.findOrCreate({
            where: { name: 'white shirt' },
            defaults: {
                price: 100.00,
                category: 'Tops',
                stock: 10,
                description: 'A classic white shirt for any occasion.',
                image: 'elvara-product-1771497413239.png',
                sizes: ['S', 'M', 'L', 'XL']
            }
        });

        if (created) {
            console.log('✅ Product "white shirt" restored.');
        } else {
            console.log('ℹ️ Product "white shirt" already exists.');
        }

        console.log('✨ Seeding completed successfully.');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seed failed:', err);
        process.exit(1);
    }
}

seed();
