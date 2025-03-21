import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../css/form.css";
import Sidebar from "@/Components/Sidebar";
import PageTitle from "@/Components/Pagetitle";
import { Head, Link } from "@inertiajs/react";
import ReactQuill from "react-quill"; // Import ReactQuill
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const BlogForm = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        user_name: "",
        user_email: "",
        user_contact: "",
        posts: "", // This will be replaced with Quill editor
        image: "",
    });
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("/api/blogpost");
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    // delete handling
    const handleDelete = async (blogId) => {
        try {
            const response = await axios.delete(`/api/blogstore/${blogId}`);

            if (response.status === 200) {
                setProducts(
                    products.filter((product) => product.id !== blogId)
                );
                alert("Blog deleted successfully");
            }
        } catch (error) {
            console.error("Error deleting blog:", error);
            alert("Error deleting blog");
        }
    };
    // handle file change
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({
            ...formData,
            [name]: files[0],
        });
    };
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        // console.log(formData);
        try {
            const response = await axios.post("/api/blogstore", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        ?.getAttribute("content"), // Add CSRF token
                },
            });
            console.log(data);
            alert("Blog added successfully");
            window.location.href = "/blogpost";
        } catch (error) {
            console.error("Error adding blog:", error.response || error);
            alert("There was an error adding blog.");
        }
    };

    // Handle Quill editor change
    const handleEditorChange = (value) => {
        setFormData({
            ...formData,
            posts: value, // Store editor content in the formData
        });
    };

    return (
        <>
            <Head title={"Add Blog Post"} />
            <div className="productinput-list-container">
                <PageTitle dynamictitle={"Blog Posts"} />
                <div style={{ textAlign: "right" }}>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        style={{
                            backgroundColor: "blue",
                            padding: "9px 9px",
                            borderRadius: "5px",
                            width: "150px",
                        }}
                    >
                        Add Blog Post
                    </button>
                </div>

                {/* Product List Table */}
                {products && products.length > 0 ? (
                    <table className="table table-responsive striped w-full">
                        <thead>
                            <tr>
                                <th>S.N</th>
                                <th>Username</th>
                                <th>Blog</th>
                                <th>Image/VideoMP4</th>
                                <th>#</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={product.id}>
                                    <td>{index + 1}</td>
                                    <td>{product.user_name}</td>
                                    <td>{product.posts}</td>
                                    <td>
                                        <img
                                            src={`/storage/${product.image}`}
                                            alt={product.name}
                                            className="w-12 h-12 object-cover"
                                        />
                                        {/* <iframe
                                            src={`/storage/${product.video}`}
                                        /> */}
                                    </td>
                                    <td>
                                        <Link href={`/blog-edit/${product.id}`}>
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
                    <div>No blog posts found</div>
                )}
            </div>

            {/* Modal for Adding Blog Post */}
            {isModalOpen && (
                <>
                    <PageTitle dynamictitle={"Add Blog Post"} />
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded shadow-lg w-11/12 sm:w-256 md:w-230 lg:w-233">
                            <h2 className="text-2xl mb-4">Add Blog Post</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-wrap gap-12 mb-6">
                                    {/* Name Input */}
                                    <div className="input-group w-1/5">
                                        <label htmlFor="user_name">
                                            Post's Writer Name
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
                                    </div>

                                    {/* Email Input */}
                                    <div className="input-group w-1/5">
                                        <label htmlFor="user_email">
                                            Email
                                        </label>
                                        <input
                                            type="text"
                                            id="user_email"
                                            name="user_email"
                                            value={formData.user_email}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                    </div>

                                    {/* Image Upload */}
                                    <div className="input-group w-1/5">
                                        <label htmlFor="image">Image</label>
                                        <input
                                            type="file"
                                            id="image"
                                            name="image"
                                            onChange={handleFileChange}
                                        />
                                        <p style={{ color: "red" }}>
                                            Supports .jpg, .jpeg, .png only
                                        </p>
                                    </div>
                                    {/* Video Upload */}
                                    <div className="input-group w-1/5">
                                        <label htmlFor="video">Video</label>
                                        <input
                                            type="file"
                                            id="video"
                                            name="video"
                                            onChange={handleFileChange}
                                        />
                                        <p style={{ color: "red" }}>
                                            MP4 file only
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-12 mb-3">
                                    {/* Quill Editor for Posts */}
                                    <div className="input-group w-full">
                                        <label htmlFor="posts">
                                            Post Content
                                        </label>
                                        <ReactQuill
                                            value={formData.posts}
                                            onChange={handleEditorChange}
                                            placeholder="Write your post content here..."
                                        />
                                    </div>

                                    {/* Submit/Close Buttons */}
                                    <div className="input-group w-1/5">
                                        <button
                                            type="submit"
                                            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-600"
                                        >
                                            Submit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setIsModalOpen(false)
                                            }
                                            className="bg-red-500 text-white py-3 px-4 rounded hover:bg-red-600"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}

            <Sidebar />
        </>
    );
};

export default BlogForm;
