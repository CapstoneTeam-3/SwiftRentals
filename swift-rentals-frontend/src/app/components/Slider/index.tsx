import React, { useState } from "react";
import Image from "next/image";

function CustomSlider({ images }: { images: string[] }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextSlide = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const prevSlide = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleThumbnailClick = (index: number) => {
        setCurrentImageIndex(index);
    };

    return (
        <div className="w-full">
            <div className="overflow-hidden rounded-lg flex justify-center bg-gray-300 h-96">
                <Image
                    src={images[currentImageIndex] ? images[currentImageIndex] : "/images/car-placeholder.png" }
                    alt={`Slide ${currentImageIndex}`}
                    width={5000}
                    height={5000}
                    quality={100}
                    objectFit="cover"
                    className="w-fit h-full"
                />
            </div>

            {images.length > 0 && (<div className="p-1 flex space-x-2 justify-center">
                {images.map((image, index) => (
                    <Image
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index}`}
                    width={100}
                    height={100}
                    className={`w-16 sm:w-24 h-16 sm:h-24 cursor-pointer border border-gray-200 ${
                        currentImageIndex === index ? 'border-blue-500' : ''
                    }`}
                    onClick={() => handleThumbnailClick(index)}
                />
                ))}
            </div>)}

            {images.length > 0 && (<div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 sm:px-6">
                <button
                    onClick={prevSlide}
                    className="flex items-center justify-center w-8 h-8 bg-gray-800 bg-opacity-50 text-white rounded-full focus:outline-none"
                >
                    {"<"}
                </button>
                <button
                    onClick={nextSlide}
                    className="flex items-center justify-center w-8 h-8 bg-gray-800 bg-opacity-50 text-white rounded-full focus:outline-none"
                >
                    {">"}
                </button>
            </div>)}
        </div>
    );
}

export default CustomSlider;
