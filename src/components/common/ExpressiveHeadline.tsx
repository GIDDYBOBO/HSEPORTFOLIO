import React from 'react';
import { motion } from 'motion/react';

interface ExpressiveHeadlineProps {
  text: string;
  highlightWord?: string;
  className?: string;
}

export const ExpressiveHeadline: React.FC<ExpressiveHeadlineProps> = ({
  text,
  highlightWord = 'ZERO-HARM',
  className = ''
}) => {
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  return (
    <motion.h1
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`font-display font-black tracking-tight leading-[1.08] uppercase ${className}`}
    >
      {words.map((word, idx) => {
        const isHighlight = word.toUpperCase().includes(highlightWord.toUpperCase());
        return (
          <motion.span
            key={`${word}-${idx}`}
            variants={wordVariants}
            className="inline-block mr-[0.28em] last:mr-0"
          >
            {isHighlight ? (
              <span className="relative inline-block text-[#1C6CD4] font-black">
                {word}
              </span>
            ) : (
              word
            )}
          </motion.span>
        );
      })}
    </motion.h1>
  );
};
