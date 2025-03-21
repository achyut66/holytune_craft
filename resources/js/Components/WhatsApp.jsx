import { FaWhatsapp } from "react-icons/fa";
import "../../css/whatsapp.css";

const WhatsAppChat = () => {
    const phoneNumber = "9779861023479"; // Replace with your WhatsApp number
    const message = encodeURIComponent(
        "Hello, I'm interested in your services. Can you provide more details?"
    );

    return (
        <a
            href={`https://wa.me/${phoneNumber}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-float"
        >
            <FaWhatsapp size={40} />
        </a>
    );
};

export default WhatsAppChat;
