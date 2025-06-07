import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { AnimatedSectionProps } from '../types';

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  className = '', 
  delay = 0 
}) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (inView && sectionRef.current) {
      sectionRef.current.classList.add('visible');
    }
  }, [inView]);

  return (
    <div 
      ref={ref} 
      className={`fade-in ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div ref={sectionRef}>
        {children}
      </div>
    </div>
  );
};

export default AnimatedSection;