import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { ArrowDown, Utensils } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../context/translations';

const HeroSection: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const [showInvisibleTooltip, setShowInvisibleTooltip] = useState(true);
  const [showQuoteTooltip, setShowQuoteTooltip] = useState(true);

  useEffect(() => {
    if (showInvisibleTooltip) {
      const timer = setTimeout(() => setShowInvisibleTooltip(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showInvisibleTooltip]);

  useEffect(() => {
    if (showQuoteTooltip) {
      const timer = setTimeout(() => setShowQuoteTooltip(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showQuoteTooltip]);

  return (
    <section 
      id="home" 
      className="relative w-full"
      style={{ 
        minHeight: '100vh', 
        height: '100vh',
        backgroundImage: 'url(/IMG_3552-Photoroom.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background overlay to maintain the yellow tint if needed */}
      <div 
        className="absolute inset-0 z-0"
        style={{ backgroundColor: 'rgba(254, 214, 71, 0.8)' }}
      />

      {/* Background */}
      <div 
        ref={bgRef}
        className="absolute top-0 left-0 w-full h-full overflow-hidden z-10"
        style={{ minHeight: '100vh' }}
      >
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[100vw] h-screen overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 -right-1/2 w-[120vw] h-[120vw] flex justify-center items-center hero-rotate">
            <img 
              src="/IMG_3555-Photoroom.png" 
              alt="Rotating plate decoration"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Thiruvalluvar Image */}
        <div className="absolute bottom-0 left-0 w-48 h-48 xs:w-52 xs:h-52 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-[28rem] lg:h-[28rem] z-[100] -ml-16 xs:-ml-20 sm:-ml-24 md:-ml-32 lg:-ml-40 -mb-12 xs:-mb-16 sm:-mb-20 md:-mb-24 lg:-mb-28">
          <img 
            src="/thiruvalluvar wo bg final.png" 
            alt="Thiruvalluvar"
            className="w-full h-full object-contain"
            draggable={false}
          />
        </div>

        <style>{`
          .hero-rotate {
            animation: heroRotate 20s linear infinite;
            transform-origin: center;
          }
          @keyframes heroRotate {
            from {
              transform: translateY(-50%) rotate(0deg);
            }
            to {
              transform: translateY(-50%) rotate(360deg);
            }
          }
        `}</style>
      </div>

      {/* INVISIBLE CLICKABLE THIRUVALLUVAR AREA - POSITIONED OVER THE STATUE */}
      <button
        onClick={() => {
          console.log('Thiruvalluvar statue clicked!');
          window.open('https://en.wikipedia.org/wiki/Thiruvalluvar', '_blank');
        }}
        className="absolute bottom-0 left-0 w-40 h-40 xs:w-44 xs:h-44 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-80 lg:h-80 z-[200] bg-transparent hover:bg-white/10 -ml-12 xs:-ml-16 sm:-ml-20 md:-ml-28 lg:-ml-36 -mb-8 xs:-mb-12 sm:-mb-16 md:-mb-20 lg:-mb-24 cursor-pointer transition-all duration-200 hover:scale-105 focus:outline-none"
        title="Click to learn about Thiruvalluvar"
        aria-label="Learn about Thiruvalluvar - Tamil poet and philosopher"
      >
        {/* Tooltip that appears on hover/focus */}
        {showInvisibleTooltip && (
          <span className="absolute left-1/2 -translate-x-1/2 -top-8 xs:-top-10 sm:-top-12 bg-black/90 text-yellow-300 text-xs xs:text-sm px-2 xs:px-3 py-1 xs:py-2 rounded-lg whitespace-nowrap pointer-events-none z-[201] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Learn about Thiruvalluvar!
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
          </span>
        )}
      </button>

      {/* Foreground Content */}
      <div className="absolute inset-0 z-20">
        <div className="absolute top-1/2 -translate-y-1/2 sm:top-1/4 sm:translate-y-0 left-4 xs:left-6 sm:left-16 md:left-24 lg:left-32 text-gray-900 max-w-[calc(100vw-2rem)] xs:max-w-[calc(100vw-3rem)] sm:max-w-none">
          <div className="text-gray-900 flex items-center mb-3 xs:mb-4 sm:mb-6">
            <Utensils className="mr-1 xs:mr-2 flex-shrink-0" size={16} />
            <span className="uppercase tracking-wide xs:tracking-widest text-xs xs:text-sm truncate">
              {translations.hero.tagline[language]}
            </span>
          </div>

          <h1 className="font-display text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 xs:mb-6 sm:mb-8 leading-tight xs:leading-normal">
            {translations.hero.title[language]}
          </h1>

          <p className="text-sm xs:text-base sm:text-lg md:text-xl mb-6 xs:mb-8 sm:mb-10 leading-snug xs:leading-relaxed max-w-xs xs:max-w-sm sm:max-w-lg">
            {translations.hero.description[language]}
          </p>

          <div className="flex flex-row flex-wrap items-start justify-start gap-2 xs:gap-4 mb-8 xs:mb-12 sm:mb-16">
            <Link
              to="menu"
              spy={true}
              smooth={true}
              offset={-80}
              duration={0}
              className="btn-primary text-xs xs:text-sm py-1 px-2 xs:py-1 xs:px-3 max-w-fit text-center"
            >
              {translations.hero.exploreMenu[language]}
            </Link>
            <Link
              to="contact"
              spy={true}
              smooth={true}
              offset={-80}
              duration={0}
              className="bg-white text-spice-500 py-1 px-2 xs:py-1 xs:px-3 rounded-md font-medium hover:bg-opacity-90 transition-all text-xs xs:text-sm max-w-fit text-center"
            >
              {translations.hero.bookTable[language]}
            </Link>
          </div>
        </div>

        {/* Quote Section */}
        <div className="absolute bottom-2 xs:bottom-4 sm:bottom-8 lg:bottom-2 left-1/2 -translate-x-1/2 flex justify-center w-full z-30 px-2 xs:px-4">
          <div className="flex items-start justify-center w-full max-w-xs xs:max-w-sm sm:max-w-2xl lg:max-w-4xl">
            <div className="w-full text-center relative">
              <a
                href="https://en.wikipedia.org/wiki/Kural"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-block"
                title="Learn more about this quote"
              >
                <p className="text-brown-700 font-bold italic text-xs xs:text-sm sm:text-base md:text-xl mb-1 xs:mb-2 sm:mb-3 cursor-pointer transition-all duration-200 group-hover:text-brown-800 group-hover:scale-105 leading-tight xs:leading-snug">
                  {
                    (() => {
                      const words = translations.hero.quote[language].split(' ');
                      const breakPoint = typeof window !== 'undefined' && window.innerWidth < 400 ? 3 : 4;
                      if (words.length <= breakPoint) return translations.hero.quote[language];
                      return (
                        <>
                          {words.slice(0, breakPoint).join(' ')}<br />
                          {words.slice(breakPoint).join(' ')}
                        </>
                      );
                    })()
                  }
                </p>
                {showQuoteTooltip && (
                  <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-1 xs:mb-2 bg-black/90 text-yellow-300 text-xs px-2 py-1 rounded opacity-100 transition-opacity whitespace-nowrap z-30">
                    Want to learn about this quote? Click here!
                  </span>
                )}
              </a>
              <p className="text-white/100 text-xs xs:text-sm text-right">
                - Thiruvalluvar
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;