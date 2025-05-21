import React from 'react';
import { motion, useInView } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  },
  exit: {
    opacity: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

const sentenceVariants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

const TextStagger = ({ heading, text , caption }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { amount: 0.4, once: false });
  const sentences = text.split('. ').map(sentence => sentence.trim() + '.');

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      exit="exit"
    >
      <motion.figcaption 
        variants={sentenceVariants}
      >
        {caption}
      </motion.figcaption>
      <motion.h2 
        variants={sentenceVariants}
      >
        {heading}
      </motion.h2>

      {sentences.map((sentence, index) => (
        <motion.p
          key={index}
          variants={sentenceVariants}
        >
          {sentence}
        </motion.p>
      ))}
    </motion.div>
  );
};

export default TextStagger;
