import React, { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import './ZoomParallax.css';

import section5img1 from '../../assets/section5/section5img2.jpg';
import section5img2 from '../../assets/section5/section5img2.jpg';
import section5img3 from '../../assets/section5/section5img5.jpg';
import section5img4 from '../../assets/section5/section5img4.jpg';
import section5img5 from '../../assets/section5/section5img5.jpg';
import section5img6 from '../../assets/section5/section5img2.jpg';
import section5img7 from '../../assets/section5/section5img1.jpg';

export default function ZoomParallax() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]); 
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const pictures = [
    { src: section5img1, scale: scale4 },
    { src: section5img2, scale: scale5 },
    { src: section5img3, scale: scale6 },
    { src: section5img4, scale: scale5 },
    { src: section5img5, scale: scale6 },
    { src: section5img6, scale: scale8 },
    { src: section5img7, scale: scale9 },
  ];

  return (
    <div ref={container} className="zoom-parallax-container">
      <div className="zoom-parallax-sticky">
        {pictures.map(({ src, scale }, index) => (
          <motion.div 
            key={index} 
            style={{ scale }} 
            className="zoom-parallax-element"
          >
            <div className="zoom-parallax-image-container">
              <img src={src} alt={`image-${index}`} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
