import React, { useRef } from 'react';
import Background from '../../assets/section7/section7img5.jpg';
import { useScroll, useTransform, motion } from 'framer-motion';
import './Section3.css';

const Section3 = () => {
    const container = useRef();
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

    return (
        <div ref={container} className="section3-container">
            <div className="section3-content">
                <p className="section3-text-small">
                Great adventures begin with smart planning. Every detail counts, shaping unforgettable memories from start to finish.
                </p>
                <p className="section3-text-large">PEAK EXCELLENCE</p>
            </div>
            <div className="section3-background-wrapper">
                <motion.div style={{ y }} className="section3-motion">
                    <img src={Background} alt="image" className="section3-image" />
                </motion.div>
            </div>
        </div>
    );
};

export default Section3;
