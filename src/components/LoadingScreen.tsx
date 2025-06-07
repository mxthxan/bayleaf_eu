import React, { useEffect, useRef } from 'react';
import { useLoading } from '../context/LoadingContext';
import gsap from 'gsap';

const LoadingScreen: React.FC = () => {
  const { isLoading, setIsLoading } = useLoading();
  const curtainLeftRef = useRef<HTMLDivElement>(null);
  const curtainRightRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgLeftRef = useRef<HTMLDivElement>(null);
  const bgRightRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.set([bgLeftRef.current, bgRightRef.current], { opacity: 0 })
      .set(textRef.current, { opacity: 0 })
      .to([bgLeftRef.current, bgRightRef.current], {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out'
      })
      .to(textRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out'
      }, '-=0.2');

    const timer = setTimeout(() => {
      const openCurtain = gsap.timeline({
        onComplete: () => {
          setTimeout(() => setIsLoading(false), 500);
        }
      });

      openCurtain
        .to(textRef.current, { opacity: 0, duration: 0.6, ease: 'power2.out' }) // Adjusted duration
        .to(bgLeftRef.current, { x: '-50vw', duration: 2.0, ease: 'power2.out' }, '-=0.2') // Adjusted duration
        .to(bgRightRef.current, { x: '50vw', duration: 2.0, ease: 'power2.out' }, '-=2.0') // Adjusted duration
        .to([bgLeftRef.current, bgRightRef.current], { opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3') // Adjusted duration
        .to(curtainLeftRef.current, { scaleX: 0, duration: 2.0, ease: 'power3.inOut' }, '-=0.4') // Adjusted duration
        .to(curtainRightRef.current, { scaleX: 0, duration: 2.0, ease: 'power3.inOut' }, '-=2.0') // Adjusted duration
        .to(backdropRef.current, { opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3'); // Adjusted duration
    }, 1500);

    return () => clearTimeout(timer);
  }, [setIsLoading]);

  if (!isLoading) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="fixed inset-0 bg-white z-[9999]"
      />

      {/* Curtains */}
      <div
        ref={curtainLeftRef}
        className="fixed top-0 left-0 h-full w-1/2 bg-white z-[10000]"
        style={{ transformOrigin: 'left center' }}
      />
      <div
        ref={curtainRightRef}
        className="fixed top-0 right-0 h-full w-1/2 bg-white z-[10000]"
        style={{ transformOrigin: 'right center' }}
      />

      {/* Curtain content */}
      <div className="fixed inset-0 flex items-center justify-center z-[10001]">
        <div className="relative flex flex-col items-center justify-center w-full h-full">
          {/* Left Background */}
          <div
            ref={bgLeftRef}
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
            style={{
              clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
              zIndex: 1,
            }}
          >
            <img
              src="/red curtain with welcome .jpg"
              alt="Red Curtain Left"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Right Background */}
          <div
            ref={bgRightRef}
            className="absolute top-0 right-0 w-full h-full flex items-center justify-center"
            style={{
              clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)',
              zIndex: 1,
            }}
          >
            <img
              src="/red curtain with welcome .jpg"
              alt="Red Curtain Right"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Optional Text (add if needed) */}
          <div
            ref={textRef}
            className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10 pointer-events-none text-black text-center text-lg md:text-2xl font-semibold"
          >
            {/* You can insert a welcome text here if required */}
            {/* <p>Welcome</p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;
