import React, { useEffect, useState } from "react";
import { Head, Link } from "@inertiajs/react";
import Header from "../Header/Header";
import Footer from "../Header/Footer";
import PageTitle from "@/Components/Pagetitle";
import axios from "axios";
import "../../../css/trending.css"; // Import the CSS file
import StatusBar from "@/Components/StatusBar";
import Marquee from "@/Components/Marque";

const SingingBowlPage = () => {
    const [products, setProducts] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [message, setMessage] = useState("");
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("name") || "Gongs";
    // console.log(category);

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

    useEffect(() => {
        fetchCartCount();

        axios
            .get(`/api/getitemsbyname?name=${encodeURIComponent(category)}`)
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, [category]);

    const fetchCartCount = async () => {
        try {
            const response = await axios.get("/api/cart/count");
            setCartCount(response.data.count);
        } catch (error) {
            console.error("Error fetching cart count:", error);
        }
    };

    return (
        <>
            <Head title={"Category : " + category} />
            <Header />
            <div style={{ textDecoration: "underline" }}>
                <PageTitle dynamictitle={"category : " + category} />
            </div>
            <div className="trending-container">
                {message && <div className="notification">{message}</div>}
                <div className="trending-grid">
                    {products.map((product) => (
                        <div key={product.id} className="trending-product-card">
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
                        </div>
                    ))}
                </div>
            </div>
            <section class="overflow-hidden bg-white pb-12 pt-20 lg:pb-[90px] lg:pt-[120px] dark:bg-dark">
                <div class="container mx-auto">
                    <div class="-mx-4 flex flex-wrap items-center justify-between">
                        <div class="w-full px-4 lg:w-6/12">
                            <div class="-mx-3 flex items-center sm:-mx-4">
                                <div class="w-full px-3 sm:px-4 xl:w-1/2">
                                    <div class="py-3 sm:py-4">
                                        <img
                                            src="../assets/images/bowl1.jpg"
                                            alt=""
                                            class="w-full rounded-2xl"
                                        />
                                    </div>

                                    <div class="py-2 sm:py-4">
                                        <img
                                            src="../assets/images/img2.jpg"
                                            alt=""
                                            class="w-full rounded-2xl"
                                        />
                                    </div>
                                </div>
                                <div class="w-full px-3 sm:px-4 xl:w-1/2">
                                    <div class="relative z-10 my-4">
                                        <img
                                            src="../assets/images/img4.jpg"
                                            alt=""
                                            class="w-full rounded-2xl"
                                        />
                                        <span class="absolute -bottom-7 -right-7 z-[-1]">
                                            <svg
                                                width="134"
                                                height="106"
                                                viewBox="0 0 134 106"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <circle
                                                    cx="1.66667"
                                                    cy="104"
                                                    r="1.66667"
                                                    transform="rotate(-90 1.66667 104)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="16.3333"
                                                    cy="104"
                                                    r="1.66667"
                                                    transform="rotate(-90 16.3333 104)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="31"
                                                    cy="104"
                                                    r="1.66667"
                                                    transform="rotate(-90 31 104)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="45.6667"
                                                    cy="104"
                                                    r="1.66667"
                                                    transform="rotate(-90 45.6667 104)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="60.3334"
                                                    cy="104"
                                                    r="1.66667"
                                                    transform="rotate(-90 60.3334 104)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="88.6667"
                                                    cy="104"
                                                    r="1.66667"
                                                    transform="rotate(-90 88.6667 104)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="117.667"
                                                    cy="104"
                                                    r="1.66667"
                                                    transform="rotate(-90 117.667 104)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="74.6667"
                                                    cy="104"
                                                    r="1.66667"
                                                    transform="rotate(-90 74.6667 104)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="103"
                                                    cy="104"
                                                    r="1.66667"
                                                    transform="rotate(-90 103 104)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="132"
                                                    cy="104"
                                                    r="1.66667"
                                                    transform="rotate(-90 132 104)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="1.66667"
                                                    cy="89.3333"
                                                    r="1.66667"
                                                    transform="rotate(-90 1.66667 89.3333)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="16.3333"
                                                    cy="89.3333"
                                                    r="1.66667"
                                                    transform="rotate(-90 16.3333 89.3333)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="31"
                                                    cy="89.3333"
                                                    r="1.66667"
                                                    transform="rotate(-90 31 89.3333)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="45.6667"
                                                    cy="89.3333"
                                                    r="1.66667"
                                                    transform="rotate(-90 45.6667 89.3333)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="60.3333"
                                                    cy="89.3338"
                                                    r="1.66667"
                                                    transform="rotate(-90 60.3333 89.3338)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="88.6667"
                                                    cy="89.3338"
                                                    r="1.66667"
                                                    transform="rotate(-90 88.6667 89.3338)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="117.667"
                                                    cy="89.3338"
                                                    r="1.66667"
                                                    transform="rotate(-90 117.667 89.3338)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="74.6667"
                                                    cy="89.3338"
                                                    r="1.66667"
                                                    transform="rotate(-90 74.6667 89.3338)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="103"
                                                    cy="89.3338"
                                                    r="1.66667"
                                                    transform="rotate(-90 103 89.3338)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="132"
                                                    cy="89.3338"
                                                    r="1.66667"
                                                    transform="rotate(-90 132 89.3338)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="1.66667"
                                                    cy="74.6673"
                                                    r="1.66667"
                                                    transform="rotate(-90 1.66667 74.6673)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="1.66667"
                                                    cy="31.0003"
                                                    r="1.66667"
                                                    transform="rotate(-90 1.66667 31.0003)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="16.3333"
                                                    cy="74.6668"
                                                    r="1.66667"
                                                    transform="rotate(-90 16.3333 74.6668)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="16.3333"
                                                    cy="31.0003"
                                                    r="1.66667"
                                                    transform="rotate(-90 16.3333 31.0003)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="31"
                                                    cy="74.6668"
                                                    r="1.66667"
                                                    transform="rotate(-90 31 74.6668)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="31"
                                                    cy="31.0003"
                                                    r="1.66667"
                                                    transform="rotate(-90 31 31.0003)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="45.6667"
                                                    cy="74.6668"
                                                    r="1.66667"
                                                    transform="rotate(-90 45.6667 74.6668)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="45.6667"
                                                    cy="31.0003"
                                                    r="1.66667"
                                                    transform="rotate(-90 45.6667 31.0003)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="60.3333"
                                                    cy="74.6668"
                                                    r="1.66667"
                                                    transform="rotate(-90 60.3333 74.6668)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="60.3333"
                                                    cy="30.9998"
                                                    r="1.66667"
                                                    transform="rotate(-90 60.3333 30.9998)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="88.6667"
                                                    cy="74.6668"
                                                    r="1.66667"
                                                    transform="rotate(-90 88.6667 74.6668)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="88.6667"
                                                    cy="30.9998"
                                                    r="1.66667"
                                                    transform="rotate(-90 88.6667 30.9998)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="117.667"
                                                    cy="74.6668"
                                                    r="1.66667"
                                                    transform="rotate(-90 117.667 74.6668)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="117.667"
                                                    cy="30.9998"
                                                    r="1.66667"
                                                    transform="rotate(-90 117.667 30.9998)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="74.6667"
                                                    cy="74.6668"
                                                    r="1.66667"
                                                    transform="rotate(-90 74.6667 74.6668)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="74.6667"
                                                    cy="30.9998"
                                                    r="1.66667"
                                                    transform="rotate(-90 74.6667 30.9998)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="103"
                                                    cy="74.6668"
                                                    r="1.66667"
                                                    transform="rotate(-90 103 74.6668)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="103"
                                                    cy="30.9998"
                                                    r="1.66667"
                                                    transform="rotate(-90 103 30.9998)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="132"
                                                    cy="74.6668"
                                                    r="1.66667"
                                                    transform="rotate(-90 132 74.6668)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="132"
                                                    cy="30.9998"
                                                    r="1.66667"
                                                    transform="rotate(-90 132 30.9998)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="1.66667"
                                                    cy="60.0003"
                                                    r="1.66667"
                                                    transform="rotate(-90 1.66667 60.0003)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="1.66667"
                                                    cy="16.3333"
                                                    r="1.66667"
                                                    transform="rotate(-90 1.66667 16.3333)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="16.3333"
                                                    cy="60.0003"
                                                    r="1.66667"
                                                    transform="rotate(-90 16.3333 60.0003)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="16.3333"
                                                    cy="16.3333"
                                                    r="1.66667"
                                                    transform="rotate(-90 16.3333 16.3333)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="31"
                                                    cy="60.0003"
                                                    r="1.66667"
                                                    transform="rotate(-90 31 60.0003)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="31"
                                                    cy="16.3333"
                                                    r="1.66667"
                                                    transform="rotate(-90 31 16.3333)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="45.6667"
                                                    cy="60.0003"
                                                    r="1.66667"
                                                    transform="rotate(-90 45.6667 60.0003)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="45.6667"
                                                    cy="16.3333"
                                                    r="1.66667"
                                                    transform="rotate(-90 45.6667 16.3333)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="60.3333"
                                                    cy="60.0003"
                                                    r="1.66667"
                                                    transform="rotate(-90 60.3333 60.0003)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="60.3333"
                                                    cy="16.3333"
                                                    r="1.66667"
                                                    transform="rotate(-90 60.3333 16.3333)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="88.6667"
                                                    cy="60.0003"
                                                    r="1.66667"
                                                    transform="rotate(-90 88.6667 60.0003)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="88.6667"
                                                    cy="16.3333"
                                                    r="1.66667"
                                                    transform="rotate(-90 88.6667 16.3333)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="117.667"
                                                    cy="60.0003"
                                                    r="1.66667"
                                                    transform="rotate(-90 117.667 60.0003)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="117.667"
                                                    cy="16.3333"
                                                    r="1.66667"
                                                    transform="rotate(-90 117.667 16.3333)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="74.6667"
                                                    cy="60.0003"
                                                    r="1.66667"
                                                    transform="rotate(-90 74.6667 60.0003)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="74.6667"
                                                    cy="16.3333"
                                                    r="1.66667"
                                                    transform="rotate(-90 74.6667 16.3333)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="103"
                                                    cy="60.0003"
                                                    r="1.66667"
                                                    transform="rotate(-90 103 60.0003)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="103"
                                                    cy="16.3333"
                                                    r="1.66667"
                                                    transform="rotate(-90 103 16.3333)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="132"
                                                    cy="60.0003"
                                                    r="1.66667"
                                                    transform="rotate(-90 132 60.0003)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="132"
                                                    cy="16.3333"
                                                    r="1.66667"
                                                    transform="rotate(-90 132 16.3333)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="1.66667"
                                                    cy="45.3333"
                                                    r="1.66667"
                                                    transform="rotate(-90 1.66667 45.3333)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="1.66667"
                                                    cy="1.66683"
                                                    r="1.66667"
                                                    transform="rotate(-90 1.66667 1.66683)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="16.3333"
                                                    cy="45.3333"
                                                    r="1.66667"
                                                    transform="rotate(-90 16.3333 45.3333)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="16.3333"
                                                    cy="1.66683"
                                                    r="1.66667"
                                                    transform="rotate(-90 16.3333 1.66683)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="31"
                                                    cy="45.3333"
                                                    r="1.66667"
                                                    transform="rotate(-90 31 45.3333)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="31"
                                                    cy="1.66683"
                                                    r="1.66667"
                                                    transform="rotate(-90 31 1.66683)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="45.6667"
                                                    cy="45.3333"
                                                    r="1.66667"
                                                    transform="rotate(-90 45.6667 45.3333)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="45.6667"
                                                    cy="1.66683"
                                                    r="1.66667"
                                                    transform="rotate(-90 45.6667 1.66683)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="60.3333"
                                                    cy="45.3338"
                                                    r="1.66667"
                                                    transform="rotate(-90 60.3333 45.3338)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="60.3333"
                                                    cy="1.66683"
                                                    r="1.66667"
                                                    transform="rotate(-90 60.3333 1.66683)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="88.6667"
                                                    cy="45.3338"
                                                    r="1.66667"
                                                    transform="rotate(-90 88.6667 45.3338)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="88.6667"
                                                    cy="1.66683"
                                                    r="1.66667"
                                                    transform="rotate(-90 88.6667 1.66683)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="117.667"
                                                    cy="45.3338"
                                                    r="1.66667"
                                                    transform="rotate(-90 117.667 45.3338)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="117.667"
                                                    cy="1.66683"
                                                    r="1.66667"
                                                    transform="rotate(-90 117.667 1.66683)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="74.6667"
                                                    cy="45.3338"
                                                    r="1.66667"
                                                    transform="rotate(-90 74.6667 45.3338)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="74.6667"
                                                    cy="1.66683"
                                                    r="1.66667"
                                                    transform="rotate(-90 74.6667 1.66683)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="103"
                                                    cy="45.3338"
                                                    r="1.66667"
                                                    transform="rotate(-90 103 45.3338)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="103"
                                                    cy="1.66683"
                                                    r="1.66667"
                                                    transform="rotate(-90 103 1.66683)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="132"
                                                    cy="45.3338"
                                                    r="1.66667"
                                                    transform="rotate(-90 132 45.3338)"
                                                    fill="#3056D3"
                                                />
                                                <circle
                                                    cx="132"
                                                    cy="1.66683"
                                                    r="1.66667"
                                                    transform="rotate(-90 132 1.66683)"
                                                    fill="#3056D3"
                                                />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="w-full px-4 lg:w-1/2 xl:w-5/12">
                            <div class="mt-10 lg:mt-0">
                                <h2 class="mb-5 text-3xl font-bold text-dark sm:text-[40px]/[48px] dark:text-white">
                                    {category}
                                </h2>
                                <p class="mb-5 text-base text-body-color dark:text-dark-6">
                                    {category} have a long and rich history in
                                    Nepal, dating back centuries. They were
                                    traditionally used in religious and
                                    spiritual ceremonies, particularly in Hindu
                                    and Buddhist practices. The sound produced
                                    by a {category + "'"} is believed to have
                                    healing properties and is often used to
                                    invoke spiritual presence, promote
                                    meditation, and create a harmonious
                                    environment.
                                    <br />
                                    In the Newar culture of the Kathmandu
                                    Valley, {category + "'"}s hold a special
                                    place, often used during festivals like
                                    Indra Jatra and Dashain. Over time,{" "}
                                    {category + "'"}s have become a significant
                                    part of the broader Nepali musical heritage,
                                    featuring in both spiritual and secular
                                    contexts.
                                </p>
                                <p>
                                    A {category + "'"} is a large, flat,
                                    circular metal disc, traditionally made from
                                    a combination of bronze, brass, or other
                                    metals. It is struck with a mallet to
                                    produce a deep, resonant sound that can
                                    sustain for a long period. The{" "}
                                    {category + "'"}'s size, shape, and the
                                    metal composition contribute to its unique
                                    sound quality.
                                </p>
                                <div
                                    className=""
                                    style={{
                                        fontWeight: "bold",
                                        textDecoration: "underline",
                                    }}
                                >
                                    Uses of {category} are:
                                </div>
                                <br />
                                <li>
                                    <span style={{ fontWeight: "bold" }}>
                                        Religious Ceremonies:
                                    </span>
                                    {""}
                                    In temples and monasteries, {category + "'"}
                                    s create an atmosphere conducive to
                                    meditation and prayer.
                                </li>
                                <li>
                                    <span style={{ fontWeight: "bold" }}>
                                        Festivals and Rituals:
                                    </span>{" "}
                                    {category + "'"}s are a common part of
                                    musical ensembles during Nepalese festivals
                                    and cultural events.
                                </li>
                                <li>
                                    <span style={{ fontWeight: "bold" }}>
                                        Sound Therapy:
                                    </span>{" "}
                                    The vibrations and tones of {category + "'"}
                                    s are used in sound healing practices to
                                    balance energy and promote relaxation.
                                </li>

                                <a
                                    href="javascript:void(0)"
                                    class="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-7 py-3 text-center text-base font-medium text-white hover:bg-opacity-90"
                                >
                                    Get Started
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <StatusBar />
            <Marquee />
            <Footer />
        </>
    );
};

export default SingingBowlPage;
