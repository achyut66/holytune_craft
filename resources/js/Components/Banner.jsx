import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
    {
        src: "/assets/banners/11.jpg",
        name: "Tibetan Singing Bowl",
        botimage: "/assets/banners/bottibetan.jpg",
        // botimage1: "/assets/banners/bottibetan1.jpg",
        // botimage2: "/assets/banners/bottibetan2.jpg",
        text: "Tibetan Singing Bowls are metal bowls used in meditation, sound therapy, and spiritual rituals. They produce resonating, harmonic tones when struck or rubbed. These sounds are believed to promote relaxation, reduce stress, and aid in healing by balancing energy, enhancing mental clarity, and aligning chakras for overall well-being.",
    },
    {
        src: "/assets/banners/22.jpg",
        name: "7Chakra Singing Bowl",
        botimage: "/assets/banners/ch7.png",
        // botimage1: "/assets/banners/7bot1.jpg",
        // botimage2: "/assets/banners/7bot2.jpg",
        text: "A 7 Chakra Singing Bowl is a set of seven bowls, each corresponding to one of the seven chakras in the body. These bowls are tuned to specific frequencies that align with each chakra, promoting energy balance and healing. The sound vibrations help clear blockages, improve emotional health, and restore harmony in the body and mind.",
    },
    {
        src: "/assets/banners/33.jpg",
        name: "Antique Singing Bowl",
        botimage: "/assets/banners/ant.png",
        // botimage1: "/assets/banners/antbot1.jpg",
        // botimage2: "/assets/banners/antbot2.jpg",
        text: "An antique singing bowl is a traditional, handcrafted bowl, often made from a blend of metals like copper, tin, and iron, that produces soothing, harmonic sounds when struck or rubbed with a mallet. These bowls, typically several decades or centuries old, are valued for their craftsmanship, and rituals to promote healing, balance, and tranquility.",
    },
];

export default function ImageBanner() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-slide every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    return (
        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
            {/* Flex container that will slide the banners */}
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }} // Moves the entire set of banners
            >
                {images.map((image, index) => (
                    <div key={index} className="relative w-full flex-shrink-0">
                        {" "}
                        {/* Use flex-shrink-0 to ensure each item takes up full space */}
                        {/* Left Section - Banner Image */}
                        <div className="w-2/3 relative">
                            <img
                                src={image.src}
                                alt={`Banner ${index + 1}`}
                                className="w-full h-full object-cover blur-sm"
                            />
                        </div>
                        {/* Right Section - Image Name and Text */}
                        <div className="w-1/3 relative p-4">
                            <div className="absolute left-0 top-1/3 transform -translate-y-1/2 mt-[-600px] ml-[1140px] text-[22px] font-bold text-left text-black underline bg-transparent drop-shadow-md whitespace-nowrap">
                                {image.name}
                            </div>

                            <div
                                className="absolute left-0 top-1/2 transform -translate-y-1/2 mt-[-420px] ml-[1010px] text-[20px] font-normal text-left text-black font-[cursive] overflow-hidden relative z-10"
                                style={{ width: "90%" }}
                            >
                                {image.text}
                            </div>

                            <div
                                className="absolute left-0 top-1/2 transform -translate-y-1/2 mt-[-250px] ml-[1160px] text-[20px] font-bold text-left text-black font-[cursive] overflow-hidden"
                                style={{
                                    width: "100%",
                                }}
                            >
                                <img
                                    src={image.botimage}
                                    alt={`Banner ${index + 1}`}
                                    width={300}
                                    height={300}
                                    style={{
                                        borderRadius: "100px",
                                        zIndex: -1,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Left Arrow */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full"
            >
                <ChevronLeft size={32} />
            </button>

            {/* Right Arrow */}
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full"
            >
                <ChevronRight size={32} />
            </button>
        </div>
    );
}
