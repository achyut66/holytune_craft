import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";
import axios from "axios"; // Ensure axios is imported
import "../../../css/form.css";
import PageTitle from "@/Components/Pagetitle";

const EditProduct = ({ product }) => {
    const [formData, setFormData] = useState({
        name: product.name || "",
        price: product.price || "",
        currency: product.currency || "USD",
        category: product.category || "",
        description: product.description || "",
        detail_info: product.detail_info || "",
        weight: product.weight || "",
        q_unit: product.q_unit || "KG",
        image: product.image || null,
        diameter: product.diameter || "",
        d_unit: product.d_unit || "INCH",
        quantity: product.quantity || "",
        discount_percent: product.discount_percent || "",
        sound: product.sound || null,
        flag: product.flag || 1,
    });

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || "",
                price: product.price || "",
                currency: product.currency || "USD",
                category: product.category || "",
                description: product.description || "",
                detail_info: product.detail_info || "",
                weight: product.weight || "",
                q_unit: product.q_unit || "KG",
                image: product.image || null,
                diameter: product.diameter || "",
                d_unit: product.d_unit || "INCH",
                quantity: product.quantity || "",
                discount_percent: product.discount_percent || "",
                sound: product.sound || null,
                flag: product.flag || 1,
            });
        }
    }, [product]); // Runs only when `product` changes

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
            if (formData[key] !== null && formData[key] !== "") {
                // Append only if it's a file or has changed
                if (key === "image" || key === "sound") {
                    if (formData[key] instanceof File) {
                        formDataToSend.append(key, formData[key]);
                    }
                } else {
                    formDataToSend.append(key, formData[key]);
                }
            }
        });

        formDataToSend.append("_method", "PUT");

        try {
            const response = await axios.post(
                `/api/products-update/${product.id}`,
                formDataToSend,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            setFormData(response.data.product);
            alert("Product updated successfully");
            window.location.href = "/cms-products";
        } catch (error) {
            console.error("Error updating product", error);
            if (error.response) {
                setErrors(error.response.data.errors);
                alert("Failed to update product. Please check the errors.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head title="Edit Product" />
            <Sidebar />
            <form onSubmit={handleSubmit}>
                <div className="edit-form-container">
                    <PageTitle dynamictitle={"pruduct details"} />
                    <div className="flex flex-wrap gap-12 mb-6">
                        <div className="input-group w-1/5">
                            <label htmlFor="name">Product Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            {errors.name && (
                                <p style={{ color: "red" }}>{errors.name}</p>
                            )}
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
                            {errors.price && (
                                <p style={{ color: "red" }}>{errors.price}</p>
                            )}
                        </div>
                        <div className="input-group w-1/5">
                            <label htmlFor="currency">Currency</label>
                            <select
                                className="form-control w-full p-2 border border-gray-300 rounded"
                                name="currency"
                                value={formData.currency}
                                onChange={handleInputChange}
                            >
                                <option value={"USD"}>USD</option>
                                <option value={"INR"}>INR</option>
                                <option value={"NPR"}>NPR</option>
                                <option value={"EUR"}>EUR</option>
                            </select>
                        </div>
                        <div className="input-group w-1/5">
                            <label htmlFor="category">Category</label>
                            <select
                                className="form-control w-full p-2 border border-gray-300 rounded"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                            >
                                <optgroup label="Singing Bowl">
                                    <option value="Himalaya">Himalaya</option>
                                    <option value="Carved">Carved</option>
                                    <option value="Fullmoon">Fullmoon</option>
                                    <option value="7Chakra">7Chakra</option>
                                    <option value="Antique">Antique</option>
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
                                    <option value="Gongs">Gongs</option>
                                    <option value="Tingsa & Bells">
                                        Tingsa & Bells
                                    </option>
                                </optgroup>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-12 mb-3">
                        <div className="input-group w-1/5">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                            />
                            {errors.description && (
                                <p style={{ color: "red" }}>
                                    {errors.description}
                                </p>
                            )}
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
                            <label htmlFor="weight">Weight</label>
                            <input
                                type="number"
                                id="weight"
                                name="weight"
                                value={formData.weight}
                                onChange={handleInputChange}
                                required
                                step="0.1"
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
                                <option value={"POUND"}>POUND</option>
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
                            <label htmlFor="diameter">Diameter</label>
                            <input
                                type="number"
                                id="diameter"
                                name="diameter"
                                value={formData.diameter}
                                onChange={handleInputChange}
                                required
                                step="0.1"
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
                                <option value={"INCH"}>INCH</option>
                                <option value={"CM"}>CM</option>
                            </select>
                        </div>
                        <div className="input-group w-1/5">
                            <label htmlFor="quantity">Quantity</label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleInputChange}
                                required
                                step="0.1"
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-12 mb-3">
                        <div className="input-group w-1/5">
                            <label htmlFor="discount_percent">Discount</label>
                            <input
                                type="number"
                                id="discount_percent"
                                name="discount_percent"
                                value={formData.discount_percent}
                                onChange={handleInputChange}
                                required
                                step="0.1"
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
                            <p style={{ color: "red" }}>MP3 file only</p>
                        </div>
                        <div className="input-group w-1/5">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-3 px-4 rounded hover:bg-blue-600"
                                disabled={loading}
                            >
                                {loading ? "Submitting..." : "Submit"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default EditProduct;
