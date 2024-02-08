import React, { Component } from "react";
import Slider from "react-slick";

function CustomSlider({ images }: { images: string[] }) {
    const settings = {
        /*
            Image pagination
        */

        // customPaging: function (i: number) { 
        //     return (
        //         <a className="w-[350px]">
        //             <img src={images[i]} width="150" alt="car" className="h-[100px] w-[350px] object-cover m-3" />
        //         </a>
        //     );
        // },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <div className="slider-container">
            <Slider {...settings}>
                {images?.map((img, index) => (
                    <img key={index} src={img} alt="car" className="h-[500px] w-full object-cover" />
                ))}
            </Slider>
        </div>
    );
}
export default CustomSlider;
