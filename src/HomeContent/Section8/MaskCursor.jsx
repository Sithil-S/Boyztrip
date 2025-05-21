import { useState } from 'react';  
import { motion } from 'framer-motion';
import MousePosition from './MousePosition';
import './MaskCursor.css';

export default function MaskCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = MousePosition();
  const size = isHovered ? 400 : 40;

  return (
    <div className="main-container">
      <motion.div 
        className="mask-container"
        animate={{
          WebkitMaskPosition: `${x - (size/2)}px ${y - (size/2)}px`,
          WebkitMaskSize: `${size}px ${size}px`, // Ensure both dimensions are set
        }}
        transition={{ type: "tween", ease: "backOut", duration:0.5}}
      >
          <p onMouseEnter={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}}>
            A visual designer - with skills that haven't been replaced by A.I (yet) - making good shit only if the paycheck is equally good.
          </p>
      </motion.div>

      <div className="body-container">
        <p>I'm a <span>selectively skilled</span> product designer with strong focus on producing high quality & impactful digital experience.</p>
      </div>
    </div>
  )
}