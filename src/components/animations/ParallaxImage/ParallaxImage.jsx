import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Move helper functions outside component
const getParallaxValues = (deviceType) => {
  switch (deviceType) {
    case 'mobile': return ['-5%', '5%'];
    case 'tablet': return ['-10%', '10%'];
    default: return ['-15%', '15%'];
  }
};

const getImageSize = (deviceType) => {
  switch (deviceType) {
    case 'mobile': return '105%';
    case 'tablet': return '110%';
    default: return '115%';
  }
};

// Debounce helper
const debounce = (fn, ms) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
};

const ParallaxImage = React.memo(({ src, alt }) => {
  const [deviceType, setDeviceType] = useState('desktop');
  const ref = React.useRef(null);
  
  const checkDevice = useCallback(() => {
    const width = window.innerWidth;
    if (width <= 768) {
      setDeviceType('mobile');
    } else if (width <= 1024) {
      setDeviceType('tablet');
    } else {
      setDeviceType('desktop');
    }
  }, []);

  useEffect(() => {
    checkDevice();
    const debouncedCheck = debounce(checkDevice, 250);
    window.addEventListener('resize', debouncedCheck);
    return () => window.removeEventListener('resize', debouncedCheck);
  }, [checkDevice]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], getParallaxValues(deviceType));
  const imageSize = useMemo(() => getImageSize(deviceType), [deviceType]);

  return (
    <div ref={ref} style={{ overflow: 'hidden', width: '100%', height: '100%', position: 'relative' }}>
      <motion.img
        src={src}
        alt={alt}
        style={{
          width: imageSize,
          height: imageSize,
          objectFit: 'cover',
          objectPosition: 'center',
          y,
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)'
        }}
      />
    </div>
  );
});

ParallaxImage.displayName = 'ParallaxImage';

export default ParallaxImage;