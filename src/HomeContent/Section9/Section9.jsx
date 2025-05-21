import './Section9.css';
import { useTransform, motion, useScroll } from 'framer-motion';
import { useRef } from 'react';
import { projects } from './Section9data';

const Card = ({i, title, description, src, link, color, progress, range, targetScale}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);
 
  return (
    <div ref={container} className="cardContainer">
      <motion.div 
        style={{backgroundColor: color, scale, top:`calc(-5vh + ${i * 25}px)`}} 
        className="card"
      >
        <h2>{title}</h2>
        <div className="body">
          <div className="description">
            <p>{description}</p>
            <span>
              <a href={link} target="_blank" rel="noopener noreferrer">See more</a>
              <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z" fill="black"/>
              </svg>
            </span>
          </div>

          <div className="imageContainer">
            <motion.div
              className="inner"
              style={{scale: imageScale}}
            >
              <img
                src={`/images/${src}`}
                alt={title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Section9 = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start']
  });
  
  const cardCount = projects.length;
  
  return (
    <div ref={container} className="section9Container">
      <div className="cardsContainer">
        {projects.map((project, i) => {
          const targetScale = 1 - ((cardCount - i) * 0.05);
          return <Card 
            key={i}
            i={i}
            {...project}
            progress={scrollYProgress}
            range={[i * (1/cardCount), (i + 1) * (1/cardCount)]}
            targetScale={targetScale}
          />
        })}
      </div>
    </div>
  );
};

export default Section9;
