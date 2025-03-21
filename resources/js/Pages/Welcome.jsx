import { useState, useEffect, useRef } from "react";
import { Link, Head } from "@inertiajs/react";
import Header from "@/Pages/Header/Header";
import Footer from "@/Pages/Header/Footer";
import Banner from "@/Components/Banner";
import Productlists from "@/Components/Productlists";
import PageTitle from "@/Components/Pagetitle";
import Community from "@/Components/Community";
import ScrollerButton from "@/Components/Scroller";
import StatusBarCom from "@/Components/StatusBar";
import Trending from "@/Components/Trending";
import Marquee from "@/Components/Marque";
import Accessories from "@/Components/Accessories";
import Instruments from "@/Components/Instrument";
import WhatsAppChat from "@/Components/WhatsApp";

export default function Welcome(props) {
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

    // Create a ref for each component
    const bannerRef = useRef(null);
    const productlistsRef = useRef(null);
    const accessoriesRef = useRef(null);
    const instrumentsRef = useRef(null);
    const communityRef = useRef(null);
    const trendingRef = useRef(null);
    const statusBarRef = useRef(null);
    const marqueeRef = useRef(null);

    // Use the IntersectionObserver API to detect when a component is in view
    const observeComponent = (componentRef, componentName) => {
        useEffect(() => {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setIsInView((prev) => ({
                                ...prev,
                                [componentName]: true,
                            }));
                        } else {
                            setIsInView((prev) => ({
                                ...prev,
                                [componentName]: false,
                            }));
                        }
                    });
                },
                { threshold: 0.5 }
            );
            if (componentRef.current) observer.observe(componentRef.current);
            return () => {
                if (componentRef.current)
                    observer.unobserve(componentRef.current);
            };
        }, [componentRef, componentName]);
    };

    observeComponent(bannerRef, "banner");
    observeComponent(productlistsRef, "productlists");
    observeComponent(accessoriesRef, "accessories");
    observeComponent(instrumentsRef, "instruments");
    observeComponent(communityRef, "community");
    observeComponent(trendingRef, "trending");
    observeComponent(statusBarRef, "statusBar");
    observeComponent(marqueeRef, "marquee");

    const getScrollClass = (componentName) => {
        switch (componentName) {
            case "banner":
                return isInView[componentName]
                    ? "banner fade-in-up-visible"
                    : "banner fade-in-up";
            case "productlists":
                return isInView[componentName]
                    ? "productlists slide-in-left-visible"
                    : "productlists slide-in-left";
            case "accessories":
                return isInView[componentName]
                    ? "accessories slide-in-right-visible"
                    : "accessories slide-in-right";
            case "instruments":
                return isInView[componentName]
                    ? "instruments fade-in-up-visible"
                    : "instruments fade-in-up";
            case "community":
                return isInView[componentName]
                    ? "community fade-in-up-visible"
                    : "community fade-in-up";
            case "trending":
                return isInView[componentName]
                    ? "trending slide-in-left-visible"
                    : "trending slide-in-left";
            case "statusBar":
                return isInView[componentName]
                    ? "statusBar fade-in-up-visible"
                    : "statusBar fade-in-up";
            default:
                return "";
        }
    };

    return (
        <>
            <Header />
            <Head title="Welcome" />

            {/* Banner */}
            <div ref={bannerRef} className={getScrollClass("banner")}>
                <Banner />
            </div>

            {/* Product List */}
            <div
                ref={productlistsRef}
                className={getScrollClass("productlists")}
            >
                <PageTitle dynamictitle={"Singing bowls"} />
                <Productlists />
            </div>

            {/* Accessories */}
            <div ref={accessoriesRef} className={getScrollClass("accessories")}>
                <PageTitle dynamictitle={"Accessories"} />
                <Accessories />
            </div>

            {/* Instruments */}
            <div ref={instrumentsRef} className={getScrollClass("instruments")}>
                <PageTitle dynamictitle={"Instruments"} />
                <Instruments />
            </div>

            {/* Community */}
            <div ref={communityRef} className={getScrollClass("community")}>
                <Community />
            </div>

            {/* Trending */}
            <div ref={trendingRef} className={getScrollClass("trending")}>
                <PageTitle dynamictitle={"Now Trending"} />
                <Trending />
            </div>

            {/* Status Bar */}
            <div ref={statusBarRef} className={getScrollClass("statusBar")}>
                <StatusBarCom />
            </div>

            {/* Marquee */}
            <div ref={marqueeRef} className={getScrollClass("marquee")}>
                <Marquee />
            </div>

            <Footer />
        </>
    );
}
