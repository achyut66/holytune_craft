import React, { useState, useEffect } from "react";
import axios from "axios";

const EditProduct = ({ product, onClose }) => {
    console.log(product);
    // Initialize form state with product data or default values
    const [formData, setFormData] = useState({
        name: product.name || "",
        price: product.price || "",
        currency: product.currency || "USD",
        category: product.category || "",
        description: product.description || "",
        detail_info: product.detail_info || "",
        weight: product.weight || "",
        q_unit: product.q_unit || "KG",
        image: null, // For image file
        diameter: product.diameter || "",
        d_unit: product.d_unit || "INCH",
        quantity: product.quantity || "",
        discount_percent: product.discount_percent || "",
        sound: null, // For sound file
    });
    console.log(formData);

    const [loading, setLoading] = useState(false); // Loading state for form submission
    const [errors, setErrors] = useState({}); // To store validation errors

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle file changes (image and sound)
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files[0], // Store the first file in the formData
        }));
    };

    // Submit form data
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formDataToSend = new FormData();

        // Append form fields to FormData
        Object.keys(formData).forEach((key) => {
            formDataToSend.append(key, formData[key]);
        });

        try {
            // API call to update product
            await axios.put(
                `/api/products-update/${product.id}`,
                formDataToSend
            );
            alert("Product updated successfully");
            onClose(); // Close modal after successful update
        } catch (error) {
            console.error("Error updating product", error);
            setErrors(error.response?.data || {}); // Store error messages
            alert("Failed to update product");
        } finally {
            setLoading(false);
        }
    };

    // Render form inputs dynamically
    const renderInputField = (
        label,
        type,
        name,
        value,
        onChange,
        required = false,
        options = []
    ) => {
        if (type === "select") {
            return (
                <div className="input-group">
                    <label htmlFor={name}>{label}</label>
                    <select
                        name={name}
                        value={value}
                        onChange={onChange}
                        required={required}
                        className="form-control"
                    >
                        {options.map((option, idx) => (
                            <option key={idx} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            );
        }

        if (type === "textarea") {
            return (
                <div className="input-group">
                    <label htmlFor={name}>{label}</label>
                    <textarea
                        id={name}
                        name={name}
                        value={value}
                        onChange={onChange}
                        required={required}
                        className="form-control"
                    />
                </div>
            );
        }

        return (
            <div className="input-group">
                <label htmlFor={name}>{label}</label>
                <input
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className="form-control"
                />
            </div>
        );
    };

    // Render file input field (image or sound)
    const renderFileInput = (label, name, onChange) => (
        <div className="input-group">
            <label htmlFor={name}>{label}</label>
            <input
                type="file"
                id={name}
                name={name}
                onChange={onChange}
                className="form-control"
            />
        </div>
    );

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-container">
                {/* Product Name */}
                {renderInputField(
                    "Product Name",
                    "text",
                    "name",
                    formData.name,
                    handleInputChange,
                    true
                )}

                {/* Price */}
                {renderInputField(
                    "Price",
                    "text",
                    "price",
                    formData.price,
                    handleInputChange,
                    true
                )}

                {/* Currency */}
                {renderInputField(
                    "Currency",
                    "select",
                    "currency",
                    formData.currency,
                    handleInputChange,
                    false,
                    [
                        { value: "USD", label: "USD" },
                        { value: "INR", label: "INR" },
                        { value: "NPR", label: "NPR" },
                        { value: "EUR", label: "EUR" },
                    ]
                )}

                {/* Category */}
                {renderInputField(
                    "Category",
                    "select",
                    "category",
                    formData.category,
                    handleInputChange,
                    false,
                    [
                        { value: "Himalaya", label: "Himalaya" },
                        { value: "Carved", label: "Carved" },
                        { value: "Fullmoon", label: "Fullmoon" },
                        { value: "7Chakra", label: "7Chakra" },
                        { value: "Antique", label: "Antique" },
                    ]
                )}

                {/* Description */}
                {renderInputField(
                    "Description",
                    "textarea",
                    "description",
                    formData.description,
                    handleInputChange,
                    true
                )}

                {/* Detailed Info */}
                {renderInputField(
                    "Detail Information",
                    "textarea",
                    "detail_info",
                    formData.detail_info,
                    handleInputChange,
                    true
                )}

                {/* Weight */}
                {renderInputField(
                    "Weight",
                    "number",
                    "weight",
                    formData.weight,
                    handleInputChange,
                    true
                )}

                {/* Unit */}
                {renderInputField(
                    "Unit",
                    "select",
                    "q_unit",
                    formData.q_unit,
                    handleInputChange,
                    false,
                    [
                        { value: "KG", label: "KG" },
                        { value: "POUND", label: "POUND" },
                    ]
                )}

                {/* Image Upload */}
                {renderFileInput("Image", "image", handleFileChange)}

                {/* Diameter */}
                {renderInputField(
                    "Diameter",
                    "number",
                    "diameter",
                    formData.diameter,
                    handleInputChange,
                    true
                )}

                {/* Diameter Unit */}
                {renderInputField(
                    "Diameter Unit",
                    "select",
                    "d_unit",
                    formData.d_unit,
                    handleInputChange,
                    false,
                    [
                        { value: "INCH", label: "INCH" },
                        { value: "CM", label: "CM" },
                    ]
                )}

                {/* Quantity */}
                {renderInputField(
                    "Quantity",
                    "number",
                    "quantity",
                    formData.quantity,
                    handleInputChange,
                    true
                )}

                {/* Discount Percentage */}
                {renderInputField(
                    "Discount",
                    "number",
                    "discount_percent",
                    formData.discount_percent,
                    handleInputChange,
                    true
                )}

                {/* Sound Upload */}
                {renderFileInput("Sound", "sound", handleFileChange)}

                {/* Submit Button */}
                <button
                    type="submit"
                    className="btn btn-submit"
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </div>
        </form>
    );
};

export default EditProduct;
