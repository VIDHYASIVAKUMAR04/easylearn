// CartIcon.jsx
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";

const CartIcon = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const updateCart = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(storedCart);
    };

    // Listen for custom events and storage changes
    window.addEventListener("cartUpdated", updateCart);
    window.addEventListener("storage", updateCart);
    
    // Initial load
    updateCart();

    return () => {
      window.removeEventListener("cartUpdated", updateCart);
      window.removeEventListener("storage", updateCart);
    };
  }, []);

  return (
    <Link to="/app/cart" className="relative btn btn-ghost btn-circle">
      <ShoppingCart className="h-6 w-6" />
      {cartItems.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
          {cartItems.length}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;