"use client"
import { animate, useMotionValue } from "framer-motion";
import Carousel from "../components/carousel";
import useMeasure from "react-use-measure";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CardIndex() {
    const images = [
        "/image1.jpeg",
        "/image2.jpeg",
        "/image3..jpeg", // Corrected typo here
        "/image4.jpeg",
        "/image5.jpeg",
        "/image1.jpeg",
        "/image2.jpeg",
        "/image3..jpeg", // Corrected typo here
        "/image4.jpeg",
        "/image5.jpeg",
    ];

    const FAST_DURATION = 25;
    const SLOW_DURATION = 75;

    const [duration, setDuration] = useState(FAST_DURATION);
    let [ref, { width }] = useMeasure();
    const xTransition = useMotionValue(0);
    const [mustFinish, setMustFinish] = useState(0);

    useEffect(() => {
        let controls;

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
                className="absolute left-0 flex gap-4"
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
                    <Carousel image={image} key={index} />
                ))}
            </motion.div>
        </main>
    );
}
