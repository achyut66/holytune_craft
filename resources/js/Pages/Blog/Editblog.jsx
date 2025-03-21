import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";
import axios from "axios"; // Ensure axios is imported
import "../../../css/form.css";
import PageTitle from "@/Components/Pagetitle";
import ReactQuill from "react-quill"; // Import ReactQuill
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const EditBlog = ({ product }) => {
    const [formData, setFormData] = useState({
        user_name: product.user_name || "",
        user_email: product.user_email || "",
        user_contact: product.user_contact || "",
        posts: product.posts || "",
        image: null,
        video: null,
    });

    useEffect(() => {
        if (product) {
            setFormData({
                user_name: product.user_name || "",
                user_email: product.user_email || "",
                user_contact: product.user_contact || "",
                posts: product.posts || "",
                image: null,
                video: null,
            });
        }
    }, [product]);
    console.log(formData);
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
                `/api/blog-update/${product.id}`,
                formDataToSend,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            setFormData(response.data.product);
            alert("Product updated successfully");
            window.location.href = "/blogpost";
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

    const handleEditorChange = (value) => {
        setFormData({
            ...formData,
            posts: value, // Store editor content in the formData
        });
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
                            <label htmlFor="user_name">
                                Post Writer's Name
                            </label>
                            <input
                                type="text"
                                id="user_name"
                                name="user_name"
                                value={formData.user_name}
                                onChange={handleInputChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            {errors.user_name && (
                                <p style={{ color: "red" }}>
                                    {errors.user_name}
                                </p>
                            )}
                        </div>
                        <div className="input-group w-1/5">
                            <label htmlFor="user_email">Email</label>
                            <input
                                type="text"
                                id="user_email"
                                name="user_email"
                                value={formData.user_email}
                                onChange={handleInputChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            {errors.user_email && (
                                <p style={{ color: "red" }}>
                                    {errors.user_email}
                                </p>
                            )}
                        </div>
                        <div className="input-group w-1/5">
                            <label htmlFor="currency">Image</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                onChange={handleFileChange}
                                value={formData.image}
                            />
                            <p style={{ color: "red" }}>
                                Supports .jpg, .jpeg, .png only
                            </p>
                        </div>
                        <div className="input-group w-1/5">
                            <label htmlFor="video">Video</label>
                            <input
                                type="file"
                                id="video"
                                name="video"
                                value={formData.video}
                                onChange={handleFileChange}
                            />
                            <p style={{ color: "red" }}>MP4 file only</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-12 mb-3">
                        <div className="input-group w-1/2">
                            <div className="input-group w-full">
                                <label htmlFor="posts">Post Content</label>
                                <ReactQuill
                                    value={formData.posts}
                                    onChange={handleEditorChange}
                                    placeholder="Write your post content here..."
                                />
                            </div>
                        </div>
                        <div className="input-group w-1/5">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-600"
                            >
                                Submit
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="bg-red-500 text-white py-3 px-4 rounded hover:bg-red-600"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default EditBlog;
