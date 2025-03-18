import React from "react";
import Header from "./Header/Header";
import { Head } from "@inertiajs/react";
import Footer from "./Header/Footer";
import StatusBar from "@/Components/StatusBar";
import PageTitle from "@/Components/Pagetitle";

export default function FAQ() {
    const pageTitle = "F.A.Q";
    return (
        <>
            <Head title={pageTitle} />
            <Header />
            <PageTitle dynamictitle={pageTitle} />
            <div className="faq-container">
                <div className="faqClass">
                    1. How long will it take for my order to be shipped?
                </div>
                <p>
                    Answer: The processing time for your order typically takes
                    1-3 business days. Once your order is shipped, delivery
                    times vary depending on your location and the shipping
                    method chosen. Domestic shipments usually take 5-7 business
                    days, while international orders may take 10-21 business
                    days.
                </p>

                <div className="faqClass">
                    2. Do you offer international shipping?
                </div>
                <p>
                    Answer: Yes, we offer international shipping to most
                    countries. Please note that shipping times and rates may
                    vary depending on the destination. Additional customs fees
                    or taxes may apply for international orders, which are the
                    responsibility of the customer.
                </p>

                <div className="faqClass">
                    3. Can I track my order once it’s shipped?
                </div>
                <p>
                    Answer: Yes, once your order is shipped, you will receive an
                    email with a tracking number and a link to track your
                    shipment. You can use this information to check the status
                    and location of your package at any time.
                </p>

                <div className="faqClass">
                    4. What should I do if my order is delayed?
                </div>
                <p>
                    Answer: If your order is delayed, please check the tracking
                    information for any updates. If you still have concerns,
                    feel free to contact our customer service team, and we’ll
                    assist you in resolving the issue. Sometimes, delays can
                    happen due to weather, customs clearance, or high shipping
                    volumes, but we’re here to help.
                </p>

                <div className="faqClass">
                    5. Do you offer expedited shipping options?
                </div>
                <p>
                    Answer: Yes, we offer expedited shipping options for faster
                    delivery. You can select expedited shipping at checkout for
                    faster processing and delivery times. Rates will vary based
                    on the chosen shipping method and destination.
                </p>

                <div className="faqClass">
                    6. How are shipping costs calculated?
                </div>
                <p>
                    Answer: Shipping costs are calculated based on the weight
                    and dimensions of your order, as well as the destination
                    address. You will see the total shipping cost before
                    completing your purchase at checkout.
                </p>
                <div className="faqClass">
                    7. What happens if my package is damaged during shipping?
                </div>
                <p>
                    Answer: If your package arrives damaged, please contact us
                    within 7 days of receiving the order. We may ask you to
                    provide photos of the damage and the packaging, and we will
                    work with you to resolve the issue, whether it’s issuing a
                    refund or sending a replacement.
                </p>
                <div className="faqClass">
                    8. Can I change my shipping address after placing an order?
                </div>
                <p>
                    Answer: Once an order is placed, it is processed quickly to
                    ensure timely delivery. If you need to change your shipping
                    address, please contact our customer service team
                    immediately. We will make every effort to update your
                    address before the order is shipped, but we cannot guarantee
                    changes once the order is in transit.
                </p>
                <div className="faqClass">
                    9. Will I have to pay customs duties or taxes on my order?
                </div>
                <p>
                    Answer: For international orders, customs duties, taxes, and
                    fees may apply depending on the destination country’s
                    regulations. These charges are the responsibility of the
                    customer and will not be covered by Holytune Craft. Please
                    check with your local customs office for more information on
                    potential charges.
                </p>
                <div className="faqClass">
                    10. How do I contact customer service about shipping issues?
                </div>
                <p>
                    Answer: If you have any questions or concerns about your
                    shipment, you can contact our customer service team via
                    email at{" "}
                    <span style={{ color: "blue", fontWeight: "bold" }}>
                        nepal@holytunecraft.com
                    </span>{" "}
                    or call us at &nbsp;
                    <span style={{ color: "blue", fontWeight: "bold" }}>
                        977-9851402057
                    </span>
                    . We are here to assist you with any shipping-related
                    inquiries.
                </p>
            </div>
            <div>
                <PageTitle dynamictitle={"we provide"} />
            </div>
            <div>
                <StatusBar />
            </div>
            <Footer />
        </>
    );
}
