// filepath: e:\Projects\Boyztrip\boyztrip\src\HomeContent\Section8\Section8.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import MousePosition from './MousePosition';
import section8lan from "../../assets/section8/section8lan.jpg";
import './Section8.css';

const Section8 = () => {
  // References and state
  const sectionRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Use motion values for smoother animations
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Add spring physics for smoother tracking
  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  
  // Get mouse position
  const { x, y } = MousePosition(sectionRef);
  
  // Update motion values when position changes
  useEffect(() => {
    if (x !== undefined && y !== undefined) {
      mouseX.set(x);
      mouseY.set(y);
    }
  }, [x, y, mouseX, mouseY]);
  
  // Calculate mask size based on hover state
  const size = isHovered ? 400 : 40;
  
  // Track visibility with Intersection Observer
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { 
        threshold: [0.05, 0.1, 0.5, 0.9], // Multiple thresholds for smoother detection
        rootMargin: "0px"
      }
    );
    
    observer.observe(sectionRef.current);
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section 
      className='section8-container' 
      ref={sectionRef}
    >
      <div className='mask-outer-container'>
        <motion.div 
          className={`mask-container ${isVisible ? 'is-visible' : ''}`}
          initial={{ opacity: 0 }}
          animate={{
            WebkitMaskPosition: `${springX.get() - (size/2)}px ${springY.get() - (size/2)}px`,
            WebkitMaskSize: `${size}px ${size}px`,
            opacity: isVisible ? 1 : 0,
          }}
          style={{
            WebkitMaskPosition: `${springX.get() - (size/2)}px ${springY.get() - (size/2)}px`,
            WebkitMaskSize: `${size}px ${size}px`,
          }}
          transition={{ type: "tween", ease: "backOut", duration: 0.3 }}
        >
          <div 
            className='mask-content' 
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
          >
            <h2>Embark on the Ultimate</h2>
            <h2 className="highlight">Adventure Together</h2>
            <p>Create memories that will last a lifetime with friends who matter most.</p>
          </div>
        </motion.div>

        <div className="body-container">
          <div className='body-content'>
            <h2>Embark on the Ultimate</h2>
            <h2>Adventure Together</h2>
            <p>Create memories that will last a lifetime with friends who matter most.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section8;
