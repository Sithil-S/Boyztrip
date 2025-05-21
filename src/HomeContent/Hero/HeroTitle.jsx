import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useAnimationFrame } from "framer-motion";
import './HeroTitle.css';

const HeroTitle = () => {
  const [xPosition, setXPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(-1);
  const position = useRef(0);
  const velocity = useRef(0);
  const targetVelocity = useRef(0);
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());
  const { scrollY, scrollYProgress } = useScroll();
  const translateY = useTransform(scrollYProgress, [0, 0.1], [0, -1650]);
  const translateX = useTransform(scrollYProgress, [0, 1], [0, -300]);

  // Detect scroll direction and calculate velocity
  useEffect(() => {
    return scrollY.on("change", (latest) => {
      const now = Date.now();
      const deltaTime = (now - lastTime.current) / 1000; // Convert to seconds
      const scrollDelta = latest - lastScrollY.current;
      
      // Reduced velocity multiplier from 0.01 to 0.005
      const rawVelocity = scrollDelta / Math.max(deltaTime, 0.016); // Prevent division by zero
      targetVelocity.current = Math.sign(rawVelocity) * Math.min(Math.abs(rawVelocity) * 0.0002, 1);
      
      setScrollDirection(Math.sign(scrollDelta) || 1);
      lastScrollY.current = latest;
      lastTime.current = now;
    });
  }, [scrollY]);

  useAnimationFrame(() => {
    // Smooth velocity transition
    const velocityDiff = targetVelocity.current - velocity.current;
    velocity.current += velocityDiff * 0.1;

    // Apply velocity decay
    targetVelocity.current *= 0.95;

    const baseSpeed = 0.009;
    const speed = baseSpeed + (Math.abs(velocity.current) * 0.5); // Added multiplier to further reduce velocity impact
    
    position.current += speed * scrollDirection;
    
    // Reset position with smooth transition
    if (position.current < -100) position.current = 0;
    if (position.current > 0) position.current = -100;
    
    setXPosition(position.current);
  });

  return (
    <div className="title-container">
      <div className="title-content">
        <motion.div style={{ translateY }} className="title-text">
          <motion.div style={{ translateX }} className="slider">
            <motion.p style={{ x: `${xPosition}%` }}>
              Adventure · Memories · Emotion ·
            </motion.p>
            <motion.p style={{ x: `${xPosition}%` }}>
              Adventure · Memories · Emotion ·
            </motion.p>
          </motion.div>
        </motion.div>
        <div className="line-content">
          <div className="line"></div>
          <div className='line-desc'>
            <p>Together, we create memories that last a lifetime.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroTitle;