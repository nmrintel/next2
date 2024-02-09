import { motion } from 'framer-motion';
import React from "react"


const pageTransition = {
  hidden: {
    opacity: 0,
    x: '-100vw',
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 60, damping: 20, duration: 0.5},
  },
  exit: {
    opacity: 0,
    x: '100vw',
    transition: { ease: 'easeInOut' },
  },
};

export default function PageMotion({ Children}:{Children:React.ElementType}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageTransition}
    >
      <Children/>
    </motion.div>
  );
}
