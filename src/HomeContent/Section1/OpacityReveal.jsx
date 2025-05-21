import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';
import PropTypes from "prop-types";
import './OpacityReveal.css';

export default function OpacityReveal({ paragraph, className = '' }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.8", "start 0.1"],
  });

  const renderContent = () => {
    if (typeof paragraph === "string") {
      return paragraph.split(" ").map((word, i) => {
        const start = i / paragraph.split(" ").length;
        const end = start + 1 / paragraph.split(" ").length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      });
    }

    // Convert JSX to array of words while preserving formatting
    const content = React.Children.toArray(paragraph.props.children);
    let wordCount = 0;
    const totalWords = content.reduce((count, child) => {
      if (typeof child === 'string') {
        return count + child.trim().split(/\s+/).length;
      }
      return count + child.props.children.trim().split(/\s+/).length;
    }, 0);

    return content.map((child, index) => {
      if (typeof child === 'string') {
        return child.trim().split(/\s+/).map((word) => {
          const start = wordCount / totalWords;
          const end = (wordCount + 1) / totalWords;
          wordCount++;
          return (
            <Word key={`${index}-${wordCount}`} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          );
        });
      } else {
        return child.props.children.trim().split(/\s+/).map((word) => {
          const start = wordCount / totalWords;
          const end = (wordCount + 1) / totalWords;
          wordCount++;
          return (
            <Word key={`${index}-${wordCount}`} progress={scrollYProgress} range={[start, end]}>
              <strong>{word}</strong>
            </Word>
          );
        });
      }
    });
  };

  return (
    <div ref={container} className={`opacity-reveal ${className}`}>
      {renderContent()}
    </div>
  );
}

OpacityReveal.propTypes = {
  paragraph: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
};

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="opacity-reveal-word">
      <span className="overlay">{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
};
