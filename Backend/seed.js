require('dotenv').config();
const { sequelize, User, Product, Review } = require('./models');

async function seed() {
    try {
        console.log('⏳ Starting database seeding with realistic data and local images...');
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

        // Clear existing products to avoid duplicates during showcase
        await Product.destroy({ where: {} });
        await Review.destroy({ where: {} });
        console.log('✅ Cleared old products and reviews.');

        // 2. Create Realistic Products
        const productsData = [
            {
                name: 'Robe de Soirée Émeraude',
                price: 1250.00,
                category: 'Robes',
                stock: 5,
                description: 'Une robe de soirée en soie vert émeraude, parfaite pour les grands événements.',
                image: 'emerald_dress.png',
                sizes: ['XS', 'S', 'M']
            },
            {
                name: 'Costume Noir Classique',
                price: 890.00,
                category: 'Costumes',
                stock: 12,
                description: 'Costume deux pièces ajusté, idéal pour les mariages et réunions d\'affaires.',
                image: 'black_suit.png',
                sizes: ['M', 'L', 'XL', 'XXL']
            },
            {
                name: 'Robe d\'Été Blanche',
                price: 450.00,
                category: 'Robes',
                stock: 20,
                description: 'Légère et élégante, cette robe est confectionnée en lin de haute qualité.',
                image: 'white_dress.png',
                sizes: ['S', 'M', 'L']
            },
            {
                name: 'Veste en Cuir Premium',
                price: 680.00,
                category: 'Vestes',
                stock: 8,
                description: 'Veste en cuir véritable avec une coupe moderne et des finitions en métal.',
                image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1935&auto=format&fit=crop', // Kept Unsplash image because user liked it
                sizes: ['M', 'L', 'XL']
            },
            {
                name: 'Costume Bleu Marine',
                price: 950.00,
                category: 'Costumes',
                stock: 10,
                description: 'Un choix élégant et intemporel pour toutes les occasions professionnelles.',
                image: 'navy_suit.png',
                sizes: ['S', 'M', 'L', 'XL']
            },
            {
                name: 'Robe Rouge Majestueuse',
                price: 1100.00,
                category: 'Robes',
                stock: 4,
                description: 'Attirez tous les regards avec cette magnifique robe rouge écarlate.',
                image: 'red_dress.png',
                sizes: ['S', 'M']
            }
        ];

        const createdProducts = await Product.bulkCreate(productsData);
        console.log(`✅ ${createdProducts.length} realistic products inserted.`);

        // 3. Seed Reviews for the first product
        const emeraldDress = createdProducts[0];
        await Review.bulkCreate([
            {
                reviewerName: 'Sophie L.',
                rating: 5,
                comment: 'La qualité du tissu est incroyable. Je recommande vivement !',
                ProductId: emeraldDress.id
            },
            {
                reviewerName: 'Claire D.',
                rating: 4,
                comment: 'Très belle robe, bien taillée mais un peu longue pour moi.',
                ProductId: emeraldDress.id
            }
        ]);
        console.log('✅ Reviews seeded for the first product.');

        console.log('✨ Seeding completed successfully. Your app is ready to showcase with new images!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seed failed:', err);
        process.exit(1);
    }
}

seed();
