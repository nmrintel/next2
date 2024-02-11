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

export  function PageMotion({children}:{children:any}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageTransition}
    >
      {children}
    </motion.div>
  );
}


export default function FadeIn({ children }: { children: React.ReactNode }) {
  const fadeInVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { duration: 3 },
    },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeInVariants}>
      {children}
    </motion.div>
  );
}

