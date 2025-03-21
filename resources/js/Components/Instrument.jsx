import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/trending.css"; // Import the CSS file
import { Link } from "@inertiajs/react";

const Instruments = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState(["Himalaya"]); // Default category
    const [cartCount, setCartCount] = useState(0);
    const [message, setMessage] = useState("");

    const addToCart = async (product) => {
        try {
            const response = await axios.post("/api/cart", product);
            fetchCartCount();
            setMessage(response.data.message);
            setTimeout(() => setMessage(""), 3000);
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    // Fetch products whenever the categories change
    useEffect(() => {
        fetchCartCount();
        const categoryQuery = categories
            .map((category) => `categories[]=${encodeURIComponent(category)}`)
            .join("&");
        axios
            .get(`/api/instrument-cat?${categoryQuery}`)
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, [categories]);

    const fetchCartCount = async () => {
        try {
            const response = await axios.get("/api/cart/count");
            setCartCount(response.data.count);
        } catch (error) {
            console.error("Error fetching cart count:", error);
        }
    };

    return (
        <div className="trending-container">
            {message && <div className="notification">{message}</div>}
            <div className="trending-grid">
                {products.map((product) => (
                    <div key={product.id} className="trending-product-card">
                        <Link href={`/products/${product.id}`}>
                            <div className="product-image">
                                <img
                                    src={`/storage/${product.image}`}
                                    alt={product.name}
                                    className="product-img"
                                />
                            </div>
                            <div className="product-details">
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <p className="product-price">
                                    ${product.price}
                                </p>
                                <button
                                    className="add-to-cart-btn"
                                    onClick={() => addToCart(product)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Instruments;
