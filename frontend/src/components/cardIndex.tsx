"use client"
import { animate, useMotionValue } from "framer-motion";
import Carousel from "../components/carousel";
import useMeasure from "react-use-measure";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CardIndex() {
    const images = [
        {src:"/ai1.jpeg",title:"MODULE 1"},
        {src:"/ai2.jpeg",title:"MODULE 2"},
        {src:"/ai3.jpeg",title:"MODULE 3"},
        {src:"/ai4.jpeg",title:"MODULE 4"},
        {src:"/ai5.jpeg",title:"MODULE 5"},
        {src:"/ai1.jpeg",title:"MODULE 6"},
        {src:"/ai2.jpeg",title:"MODULE 2"},
        {src:"/ai3.jpeg",title:"MODULE 3"},
        {src:"/ai4.jpeg",title:"MODULE 4"},
        {src:"/ai5.jpeg",title:"MODULE 5"},

    ];
    const title =[
        
    ]

    const FAST_DURATION = 25;
    const SLOW_DURATION = 75;

    const [duration, setDuration] = useState(FAST_DURATION);
    let [ref, { width }] = useMeasure();
    const xTransition = useMotionValue(0);
    const [mustFinish, setMustFinish] = useState(true);

    useEffect(() => {
       let controls:any;

        const finalPosition = -width / 2 - 8;

        if (mustFinish) {
            controls = animate(xTransition, [xTransition.get(), finalPosition], {
                ease: "linear",
                duration: duration * (1 - xTransition.get() / finalPosition),
                onComplete: () => {
                setMustFinish(false);
                },
            });
        } else {
            controls = animate(xTransition, [0, finalPosition], {
                ease: "linear",
                duration: duration,
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 0,
            });
        }

        return () => controls.stop();
    }, [width, xTransition, duration, mustFinish]);

    return (
        <main className="py-8 relative">
            <motion.div
                className="absolute left-0 flex gap-4 text-blac"
                ref={ref}
                style={{ x: xTransition }}
                onMouseEnter={() => {
                    //@ts-ignore
                    setMustFinish(true);
                    setDuration(SLOW_DURATION);
                }}
                onMouseLeave={() => setDuration(FAST_DURATION)}
            >
                {images.map((image, index) => (
                    <div key={index}>
                        <div>
                                <div key={index} style={{ position: "relative" }}>
                                <div>
                                    <Carousel image={image.src} title={image.title} />
                                    {/* <h1 className="text-black font-bold" style={{ position: "absolute", top: 0, left: 0 }}>
                                        {image.title}
                                    </h1> */}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </motion.div>
        </main>
    );
}
