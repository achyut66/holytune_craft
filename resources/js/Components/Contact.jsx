import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import {
    FaPhone,
    FaEnvelope,
    FaWhatsapp,
    FaPaperPlane,
    FaSpinner,
} from "react-icons/fa";

const ContactComponent = () => {
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
            alert(response.data.success);
            window.location.href = "/";
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
            <div className="contact-container">
                <div className="contact-title">Feel Free To Contact Us</div>
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message:</label>
                        <textarea
                            id="message"
                            name="message"
                            value={data.message}
                            onChange={(e) => setData("message", e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        disabled={processing || sending}
                        className="send-button"
                    >
                        {sending ? (
                            <>
                                <FaSpinner className="spinner-icon" />{" "}
                                Sending...
                            </>
                        ) : (
                            <>
                                <FaPaperPlane /> Send
                            </>
                        )}
                    </button>
                </form>
            </div>
            <div className="foot-container">
                <div className="foot-contact">
                    <div className="foot-contact-item">
                        <FaPhone size={24} />
                        <span>Phone: +977-9851402057</span>
                    </div>
                    <div className="foot-contact-item">
                        <FaEnvelope size={24} />
                        <span>Email: holytunecraft@gmail.com</span>
                    </div>
                    <div className="foot-contact-item">
                        <FaWhatsapp size={24} />
                        <span>Whatsapp: +977-9812345678</span>
                    </div>
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
                    border-radius: 5px;
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

export default ContactComponent;
