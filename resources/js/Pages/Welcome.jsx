import { useState, useEffect } from "react";
import { Link, Head } from "@inertiajs/react";
import Header from "@/Pages/Header/Header";
import Footer from "@/Pages/Header/Footer";
import Banner from "@/components/Banner";
import Productlists from "@/Components/Productlists";
import PageTitle from "@/Components/Pagetitle";
import Community from "@/Components/Community";
import ScrollerButton from "@/Components/Scroller";
import StatusBarCom from "@/Components/StatusBar";
import Trending from "@/Components/Trending";
import Marquee from "@/Components/Marque";
import MessengerChat from "@/Components/FacebookChat";
import Accessories from "@/Components/Accessories";
import Instruments from "@/Components/Instrument";
import WhatsAppChat from "@/Components/WhatsApp";

export default function Welcome(props) {
    const [scrolled, setScrolled] = useState(false);
    const [isInView, setIsInView] = useState({
        banner: false,
        productlists: false,
        accessories: false,
        instruments: false,
        community: false,
        trending: false,
        statusBar: false,
        marquee: false,
    });

    // Scroll event handler to trigger animation when user scrolls down
    const handleScroll = () => {
        if (window.scrollY > 50) {
            // Trigger after 50px scroll
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    // Add event listener for scroll
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Animation class based on whether the user has scrolled
    const getScrollClass = (componentName) => {
        return scrolled
            ? `${componentName} fade-in-up-visible`
            : `${componentName} fade-in-up`;
    };

    return (
        <>
            <Header />
            <Head title="Welcome" />
            <div>
                <Banner />
            </div>
            <div>
                <PageTitle
                    dynamictitle={"Singing bowls"}
                    className={getScrollClass("fade-in-up")}
                />
            </div>
            <div>
                <Productlists className={getScrollClass("fade-in-up")} />
            </div>
            <div>
                <PageTitle
                    dynamictitle={"Accessories"}
                    className={getScrollClass("fade-in-up")}
                />
            </div>
            <div>
                <Accessories className={getScrollClass("fade-in-up")} />
            </div>
            <div>
                <PageTitle
                    dynamictitle={"Instruments"}
                    className={getScrollClass("fade-in-up")}
                />
            </div>
            <div>
                <Instruments className={getScrollClass("fade-in-up")} />
            </div>
            <div>
                <Community className={getScrollClass("fade-in-up")} />
            </div>
            <div>
                <ScrollerButton className={getScrollClass("fade-in-up")} />
            </div>
            <div>
                <PageTitle
                    dynamictitle={"now trending"}
                    className={getScrollClass("fade-in-up")}
                />
            </div>
            <div>
                <Trending className={getScrollClass("fade-in-up")} />
            </div>
            <div>
                <PageTitle
                    dynamictitle={"portfolio"}
                    className={getScrollClass("fade-in-up")}
                />
            </div>
            <div>
                <StatusBarCom className={getScrollClass("fade-in-up")} />
            </div>
            <div>
                <WhatsAppChat className={getScrollClass("fade-in-up")} />
            </div>
            <div>
                <Marquee className={getScrollClass("fade-in-up")} />
            </div>

            <Footer />
        </>
    );
}
