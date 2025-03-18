import { useState } from "react";
import axios from "axios";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppChat = () => {
    const [message, setMessage] = useState("");
    const [phone] = useState("9779861023479");
    const [sending, setSending] = useState(false);

    const sendMessage = async () => {
        setSending(true);
        try {
            await axios.post("/api/send-whatsapp", { phone, message });
            alert("Message sent successfully!");
        } catch (error) {
            alert("Failed to send message.");
        }
        setSending(false);
    };

    return (
        <div className="whatsapp-chat">
            <FaWhatsapp size={40} />
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
            />
            <button onClick={sendMessage} disabled={sending}>
                {sending ? "Sending..." : "Send"}
            </button>
        </div>
    );
};

export default WhatsAppChat;
