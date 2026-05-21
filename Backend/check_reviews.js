require('dotenv').config();
const { Product, Review } = require('./models');

async function run() {
    try {
        const products = await Product.findAll({
            include: [{ model: Review }]
        });

        console.log("\n=== PRODUITS ET LEURS AVIS ===");
        products.forEach(product => {
            console.log(`Produit: "${product.name}" (${product.category}) - ${product.price}€`);
            if (product.Reviews && product.Reviews.length > 0) {
                product.Reviews.forEach(review => {
                    console.log(`  ⭐ [${review.rating}/5] par ${review.reviewerName}: "${review.comment}"`);
                });
            } else {
                console.log("  (Aucun avis pour ce produit)");
            }
        });
        
        process.exit(0);
    } catch (e) {
        console.error("❌ Erreur lors de la vérification :", e.message);
        process.exit(1);
    }
}
run();
