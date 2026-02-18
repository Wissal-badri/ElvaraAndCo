import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import './About.css';

const About = () => {
    return (
        <div className="about-page">
            <Navbar />

            {/* Hero */}
            <section className="about-hero">
                <div className="about-hero-overlay" />
                <motion.div
                    className="about-hero-content"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1>Our Story</h1>
                    <p>Where elegance meets purpose</p>
                </motion.div>
            </section>

            {/* Brand Statement */}
            <section className="about-section">
                <div className="container">
                    <div className="about-grid">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <h2>ELVARA & CO.</h2>
                            <p>
                                Born from a passion for timeless elegance and modern sophistication, ELVARA & CO.
                                is a luxury clothing brand dedicated to the refined woman. Every piece in our
                                collection is crafted with meticulous attention to detail, using only the finest
                                fabrics and materials.
                            </p>
                            <p>
                                We believe that true luxury is not just about what you wear — it's about how you
                                feel. Our designs are created to empower, inspire, and celebrate the modern woman
                                in all her grace.
                            </p>
                        </motion.div>

                        <motion.div
                            className="about-values"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <div className="value-card">
                                <span className="value-icon">✦</span>
                                <h3>Craftsmanship</h3>
                                <p>Every stitch tells a story of dedication and mastery.</p>
                            </div>
                            <div className="value-card">
                                <span className="value-icon">✦</span>
                                <h3>Elegance</h3>
                                <p>Timeless designs that transcend seasonal trends.</p>
                            </div>
                            <div className="value-card">
                                <span className="value-icon">✦</span>
                                <h3>Exclusivity</h3>
                                <p>Limited collections for the discerning few.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Quote */}
            <section className="about-quote">
                <div className="container">
                    <blockquote>
                        "Discover timeless elegance with ELVARA & CO., where every piece reflects
                        sophistication and modern luxury."
                    </blockquote>
                </div>
            </section>

            <footer style={{ padding: '50px 0', borderTop: '1px solid var(--color-charcoal-grey)', textAlign: 'center' }}>
                <p>&copy; 2026 ELVARA & CO. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default About;
