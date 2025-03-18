import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import "../../../css/form.css";
import Sidebar from "@/Components/Sidebar";
import PageTitle from "@/Components/Pagetitle";
import { Head, Link } from "@inertiajs/react";

const ProductForm = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        currency: "USD",
        category: "Himalaya",
        description: "",
        detail_info: "",
        weight: "",
        q_unit: "KG",
        image: null,
        diameter: "",
        d_unit: "INCH",
        quantity: "",
        discount_percent: "",
        sound: null,
        flag: 1,
    });
    // State to manage product list
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("/api/products");
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({
            ...formData,
            [name]: files[0],
        });
    };
    // handle modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Handle closing the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the page from refreshing

        // Create a FormData object to handle file uploads
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        try {
            const response = await axios.post("/api/store", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        ?.getAttribute("content"), // Add CSRF token
                },
            });
            alert("Product added successfully");
            window.location.href = "/cms-products";
        } catch (error) {
            if (error.response) {
                console.error(
                    "Server responded with an error:",
                    error.response.data
                );
                alert(
                    "There was an error submitting the form: " +
                        JSON.stringify(error.response.data)
                );
            } else if (error.request) {
                // The request was made but no response was received
                console.error("No response received:", error.request);
                alert("No response received from the server.");
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error("Error setting up the request:", error.message);
                alert("Error setting up the request: " + error.message);
            }
        }
    };

    const handleDelete = async (productId) => {
        try {
            const response = await axios.delete(`/api/products/${productId}`);
            if (response.status === 200) {
                setProducts(
                    products.filter((product) => product.id !== productId)
                );
                alert("Product deleted successfully");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Error deleting product");
        }
    };

    return (
        <>
            <Head title={"AddProducts"} />
            <div className="productinput-list-container">
                <PageTitle dynamictitle={"our products"} />
                <div style={{ textAlign: "right" }}>
                    <button
                        onClick={openModal}
                        style={{
                            backgroundColor: "blue",
                            padding: "9px 9px",
                            borderRadius: "5px",
                            width: "150px",
                        }}
                    >
                        Add Product
                    </button>
                </div>

                {products && products.length > 0 ? (
                    <table className="table table-responsive striped w-full">
                        <thead>
                            <tr>
                                <th>S.N</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Image</th>
                                <th>#</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={product.id}>
                                    <td>{index + 1}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.description}</td>
                                    <td>
                                        <img
                                            src={`/storage/${product.image}`}
                                            alt={product.name}
                                            className="w-12 h-12 object-cover"
                                        />
                                    </td>
                                    <td>
                                        <Link
                                            href={`/products-edit/${product.id}`}
                                        >
                                            <button className="btn btn-edit">
                                                Edit
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDelete(product.id)
                                            }
                                            className="btn btn-delete"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div>No products found</div>
                )}
            </div>
            {isModalOpen && (
                <>
                    <PageTitle dynamictitle={"add products"} />
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                            <div className="bg-white p-6 rounded shadow-lg w-11/12 sm:w-256 md:w-230 lg:w-233">
                                <div className="form-container addcontainer"></div>
                                <h2 className="text-2xl mb-4">Add Product</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="flex flex-wrap gap-12 mb-6">
                                        <div className="input-group w-1/5">
                                            <label htmlFor="name">
                                                Product Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full p-2 border border-gray-300 rounded"
                                            />
                                        </div>
                                        <div className="input-group w-1/5">
                                            <label htmlFor="price">Price</label>
                                            <input
                                                type="text"
                                                id="price"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full p-2 border border-gray-300 rounded"
                                            />
                                        </div>
                                        <div className="input-group w-1/5">
                                            <label htmlFor="currency">
                                                Currency
                                            </label>
                                            <select
                                                className="form-control w-full p-2 border border-gray-300 rounded"
                                                name="currency"
                                                value={formData.currency}
                                                onChange={handleInputChange}
                                            >
                                                <option value={"USD"}>
                                                    USD
                                                </option>
                                                <option value={"INR"}>
                                                    INR
                                                </option>
                                                <option value={"NPR"}>
                                                    NPR
                                                </option>
                                                <option value={"EUR"}>
                                                    EUR
                                                </option>
                                            </select>
                                        </div>
                                        <div className="input-group w-1/5">
                                            <label htmlFor="category">
                                                Category
                                            </label>
                                            <select
                                                className="form-control w-full p-2 border border-gray-300 rounded"
                                                name="category"
                                                value={formData.category}
                                                onChange={handleInputChange}
                                            >
                                                <optgroup label="Singing Bowl">
                                                    <option value="Himalaya">
                                                        Himalaya
                                                    </option>
                                                    <option value="Carved">
                                                        Carved
                                                    </option>
                                                    <option value="Fullmoon">
                                                        Fullmoon
                                                    </option>
                                                    <option value="7Chakra">
                                                        7Chakra
                                                    </option>
                                                    <option value="Antique">
                                                        Antique
                                                    </option>
                                                </optgroup>
                                                <optgroup label="Singing Bowl Accessories">
                                                    <option value="Singing Bowl Striker">
                                                        Singing Bowl Striker
                                                    </option>
                                                    <option value="Resting Cushion">
                                                        Resting Cushion
                                                    </option>
                                                    <option value="Protective Bags">
                                                        Protective Bags
                                                    </option>
                                                </optgroup>
                                                <optgroup label="Sound Healing Instrument">
                                                    <option value="Gongs">
                                                        Gongs
                                                    </option>
                                                    <option value="Tingsa & Bells">
                                                        Tingsa & Bells
                                                    </option>
                                                </optgroup>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-12 mb-3">
                                        <div className="input-group w-1/5">
                                            <label htmlFor="description">
                                                Description
                                            </label>
                                            <textarea
                                                id="description"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="input-group w-1/5">
                                            <label htmlFor="detail_info">
                                                Detail Information
                                            </label>
                                            <textarea
                                                id="detail_info"
                                                name="detail_info"
                                                value={formData.detail_info}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="input-group w-1/5">
                                            <label htmlFor="weight">
                                                Weight
                                            </label>
                                            <input
                                                type="number"
                                                id="weight"
                                                name="weight"
                                                value={formData.weight}
                                                onChange={handleInputChange}
                                                required
                                                step="0.1" // This allows decimal values for weight
                                            />
                                        </div>
                                        <div className="input-group w-1/5">
                                            <label htmlFor="q_unit">Unit</label>
                                            <select
                                                className="form-control"
                                                name="q_unit"
                                                value={formData.q_unit}
                                                onChange={handleInputChange}
                                            >
                                                <option value={"KG"}>KG</option>
                                                <option value={"POUND"}>
                                                    POUND
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-12 mb-3">
                                        <div className="input-group w-1/5">
                                            <label htmlFor="image">Image</label>
                                            <input
                                                type="file"
                                                id="image"
                                                name="image"
                                                onChange={handleFileChange}
                                            />
                                            <p style={{ color: "red" }}>
                                                Supports .jpg,.jpeg,.png only
                                            </p>
                                        </div>
                                        <div className="input-group w-1/5">
                                            <label htmlFor="diameter">
                                                Diameter
                                            </label>
                                            <input
                                                type="number"
                                                id="diameter"
                                                name="diameter"
                                                value={formData.diameter}
                                                onChange={handleInputChange}
                                                required
                                                step="0.1" // This allows decimal values for weight
                                            />
                                        </div>
                                        <div className="input-group w-1/5">
                                            <label htmlFor="d_unit">Unit</label>
                                            <select
                                                className="form-control"
                                                name="d_unit"
                                                value={formData.d_unit}
                                                onChange={handleInputChange}
                                            >
                                                <option value={"INCH"}>
                                                    INCH
                                                </option>
                                                <option value={"CM"}>CM</option>
                                            </select>
                                        </div>
                                        <div className="input-group w-1/5">
                                            <label htmlFor="quantity">
                                                Quantity
                                            </label>
                                            <input
                                                type="number"
                                                id="quantity"
                                                name="quantity"
                                                value={formData.quantity}
                                                onChange={handleInputChange}
                                                required
                                                step="0.1" // This allows decimal values for weight
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-12 mb-3">
                                        <div className="input-group w-1/5">
                                            <label htmlFor="discount_percent">
                                                Discount
                                            </label>
                                            <input
                                                type="number"
                                                id="discount_percent"
                                                name="discount_percent"
                                                value={
                                                    formData.discount_percent
                                                }
                                                onChange={handleInputChange}
                                                required
                                                step="0.1" // This allows decimal values for weight
                                            />
                                            %
                                        </div>
                                        <div className="input-group w-1/5">
                                            <label htmlFor="sound">Sound</label>
                                            <input
                                                type="file"
                                                id="sound"
                                                name="sound"
                                                onChange={handleFileChange}
                                            />
                                            <p style={{ color: "red" }}>
                                                MP3 file only
                                            </p>
                                        </div>
                                        <div className="input-group w-1/5">
                                            <button
                                                type="submit"
                                                className="bg-blue-500 text-white py-3 px-4 rounded hover:bg-blue-600"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                        <div className="input-group w-1/5">
                                            <button
                                                type="button"
                                                onClick={closeModal}
                                                className="bg-gray-500 text-white py-3 px-4 rounded hover:bg-gray-600"
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </>
            )}
            <Sidebar />
        </>
    );
};

export default ProductForm;
