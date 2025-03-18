import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import {
    FaPhone,
    FaEnvelope,
    FaWhatsapp,
    FaPaperPlane,
    FaSpinner,
} from "react-icons/fa";
import axios from "axios";

const Community = () => {
    const { data, setData, processing, reset } = useForm({
        name: "",
        email: "",
        message: "",
    });

    const [sending, setSending] = useState(false); // Track sending state

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true); // Show loading state

        try {
            const response = await axios.post("/api/sendemail", data);
            alert("Congratulations on joining the Holytunecraft Community!!!");
            reset();
        } catch (error) {
            alert(
                error.response?.data?.error ||
                    "Error sending message. Please try again."
            );
        } finally {
            setSending(false); // Hide loading state
        }
    };

    return (
        <>
            <div
                style={{
                    backgroundImage: "url('assets/images/img2.jpg')",
                    padding: "50px 0",
                    textAlign: "center",
                }}
            >
                <div
                    style={{
                        maxWidth: "1200px",
                        margin: "0 auto",
                        padding: "0 20px",
                    }}
                >
                    <h2 style={{ marginBottom: "20px" }}>Join Our Community</h2>
                    <p style={{ marginBottom: "40px" }}>
                        Be a part of our vibrant community and stay updated with
                        the latest trends and offers in our ecommerce store.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        style={{ display: "flex", justifyContent: "center" }}
                    >
                        <input
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                            style={{
                                padding: "10px",
                                fontSize: "16px",
                                border: "1px solid #ccc",
                                borderRadius: "4px 0 0 4px",
                                outline: "none",
                                width: "300px",
                            }}
                        />
                        <input
                            type="hidden"
                            name="name"
                            value="Community Member"
                        />
                        <input
                            type="hidden"
                            name="message"
                            value="Community Member Message"
                        />
                        <button
                            type="submit"
                            disabled={processing || sending}
                            className="send-button"
                        >
                            {sending ? (
                                <>
                                    <FaSpinner className="spinner-icon" />{" "}
                                    Joining...
                                </>
                            ) : (
                                <>
                                    <FaPaperPlane /> Join
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* CSS Styles */}
            <style>
                {`
                .send-button {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    padding: 10px 15px;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 0 4px 4px 0;
                    cursor: pointer;
                    font-size: 16px;
                    transition: background 0.3s;
                }

                .send-button:disabled {
                    background-color: #aaa;
                    cursor: not-allowed;
                }

                .spinner-icon {
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                `}
            </style>
        </>
    );
};

export default Community;
