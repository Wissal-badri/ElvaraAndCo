import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

import { useCart } from "../context/CartContext";
import { FaShoppingBag, FaUser } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Close menu on route change & lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Collections" },
    { to: "/about", label: "About" },
    ...(user?.role === "admin" ? [{ to: "/admin", label: "Dashboard" }] : []),
  ];

  return (
    <>
      <nav className="navbar">
        <div className="container nav-container">
          <Link to="/" className="nav-logo" onClick={close}>
            <span className="nav-logo-dot" />
            ELVARA & CO.
          </Link>

          {/* Desktop links */}
          <div className="nav-links desktop-menu">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to}>
                {l.label}
              </Link>
            ))}
          </div>

          <div className="nav-actions">
            {user ? (
              <button onClick={logout} className="icon-btn" title="Logout">
                <FaUser />
              </button>
            ) : (
              <Link to="/login" className="icon-btn" title="Login">
                <FaUser />
              </Link>
            )}

            <Link to="/cart" className="icon-btn cart-btn" onClick={close}>
              <FaShoppingBag />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>

            <button
              className="mobile-toggle"
              onClick={() => setIsOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {isOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-overlay"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            {/* Decorative brand */}
            <p className="mobile-overlay-brand">ELVARA & CO.</p>

            <nav className="mobile-overlay-links">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.07 + i * 0.06 }}
                >
                  <Link
                    to={l.to}
                    className="mobile-overlay-link"
                    onClick={close}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mobile-overlay-footer">
              {user ? (
                <button
                  className="mobile-overlay-action"
                  onClick={() => {
                    logout();
                    close();
                  }}
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  to="/login"
                  className="mobile-overlay-action"
                  onClick={close}
                >
                  Admin Login
                </Link>
              )}
              <Link to="/cart" className="mobile-overlay-cart" onClick={close}>
                <FaShoppingBag />
                <span>Cart {cartCount > 0 ? `(${cartCount})` : ""}</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
