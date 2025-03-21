import React, { useEffect, useState } from "react";
import { Link, Head } from "@inertiajs/react";
import axios from "axios";
import "../../css/contact.css";

export default function Items() {
    const [newproducts, setNewProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const fetchNewProducts = async () => {
            try {
                const response = await fetch("/api/newproduct");
                const data = await response.json();
                setNewProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNewProducts();
    }, []);

    const fetchCartCount = async () => {
        try {
            const response = await axios.get("/api/cart/count");
            setCartCount(response.data.count);
        } catch (error) {
            console.error("Error fetching cart count:", error);
        }
    };
    const addToCart = async (product) => {
        try {
            const response = await axios.post("/api/cart", product);
            fetchCartCount(); // Update cart count
            setMessage(response.data.message); // Set the message
            setTimeout(() => setMessage(""), 3000); // Clear the message after 3 seconds
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {message && <div className="notification">{message}</div>}
            <div className="new-products-container">
                {newproducts.map((product) => (
                    <div key={product.id} className="product-card">
                        <img
                            className="newimage"
                            src={`/storage/${product.image}`}
                            alt={product.name}
                        />
                        <div
                            style={{
                                color: "green",
                                textAlign: "left",
                                fontSize: "12px",
                            }}
                        >
                            New
                        </div>
                        <h2>{product.name}</h2>
                        <div className="product-info">
                            <p>{product.description}</p>
                            <p className="product-price">
                                {product.currency}
                                {product.price}
                            </p>
                        </div>
                        <button
                            className="add-to-cart-btn"
                            onClick={() => addToCart(product)}
                        >
                            Add to Cart
                        </button>
                        <button className="buy-btn">Buy</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
