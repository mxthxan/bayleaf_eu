import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { BookOpen, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../context/translations';

const AboutSection: React.FC = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  
  // Image slider state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    {
      src: "/about us pic/For about 1.jpg",
      alt: "Restaurant interior"
    },
    {
      src: "/about us pic/For about fish 4.jpg",
      alt: "Traditional South Indian dishes"
    },
    {
      src: "/about us pic/For about thali 5.jpg",
      alt: "Chef preparing food"
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const features = [
    {
      ...translations.about.features.ingredients,
      color: 'spice'
    },
    {
      ...translations.about.features.recipes,
      color: 'leaf'
    },
    {
      ...translations.about.features.ambiance,
      color: 'chili'
    }
  ];

  return (
    <section
      id="about"
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 pb-16 sm:pb-20 md:pb-24 lg:pb-32 overflow-hidden"
      style={{ backgroundColor: '#fed647' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div ref={textRef} className="text-center mb-8 sm:mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center mb-3 sm:mb-4"
          >
            <BookOpen className="mr-2 text-spice-600" size={18} />
            <span className="uppercase tracking-widest text-xs sm:text-sm text-spice-600">
              {translations.about.subtitle[language]}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 px-2"
          >
            {translations.about.title[language]}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4"
          >
            {translations.about.description[language]}
          </motion.p>
        </div>
        
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-start mt-8 sm:mt-10 lg:mt-12">
          {/* Left Column: Story and Stats */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6 sm:space-y-8 order-2 lg:order-1"
          >
            {/* White animated box for "Our Story" */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/90 rounded-xl shadow-lg p-4 sm:p-6 lg:p-8"
            >
              <h3 className="font-display text-xl sm:text-2xl md:text-3xl mb-3 sm:mb-4 text-gray-900 font-bold">
                {translations.about.story.title[language]}
              </h3>
              <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                {translations.about.story.content[language]}
              </p>
              <h4 className="font-display text-lg sm:text-xl md:text-2xl mb-2 text-gray-800 font-semibold">
                {translations.about.legacy.title[language]}
              </h4>
              <p className="text-gray-700 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                {translations.about.legacy.story[language]}
              </p>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {translations.about.legacy.continuation[language]}
              </p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-col items-center bg-white/90 rounded-lg p-4 sm:p-6 shadow text-center"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-spice-100 flex items-center justify-center text-spice-600 mb-2 text-xl sm:text-2xl font-bold">
                  {translations.about.stats.experience.number}+
                </div>
                <h4 className="font-medium text-gray-900 text-xs sm:text-sm">{translations.about.stats.experience.label[language]}</h4>
                <p className="text-xs text-gray-500 mt-1">{translations.about.stats.experience.subtext[language]}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex flex-col items-center bg-white/90 rounded-lg p-4 sm:p-6 shadow text-center"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-leaf-100 flex items-center justify-center text-leaf-600 mb-2 text-xl sm:text-2xl font-bold">
                  {translations.about.stats.recipes.number}+
                </div>
                <h4 className="font-medium text-gray-900 text-xs sm:text-sm">{translations.about.stats.recipes.label[language]}</h4>
                <p className="text-xs text-gray-500 mt-1">{translations.about.stats.recipes.subtext[language]}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1.0 }}
                className="flex flex-col items-center bg-white/90 rounded-lg p-4 sm:p-6 shadow text-center"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-chili-100 flex items-center justify-center text-chili-600 mb-2 text-xl sm:text-2xl font-bold">
                  {translations.about.stats.customers.number}+
                </div>
                <h4 className="font-medium text-gray-900 text-xs sm:text-sm">{translations.about.stats.customers.label[language]}</h4>
                <p className="text-xs text-gray-500 mt-1">{translations.about.stats.customers.subtext[language]}</p>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Right Column: Image Slider and Temple */}
          <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px] rounded-lg overflow-hidden shadow-xl relative group"
            >
              {/* Image Container */}
              <div className="relative w-full h-full">
                {images.map((image, index) => (
                  <motion.img
                    key={index}
                    src={image.src}
                    alt={image.alt}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: index === currentImageIndex ? 1 : 0,
                      scale: index === currentImageIndex ? 1 : 1.1
                    }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                  />
                ))}
              </div>

              {/* Navigation Buttons - Always visible on mobile */}
              <button
                onClick={prevImage}
                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1.5 sm:p-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
              >
                <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1.5 sm:p-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
              >
                <ChevronRight size={20} className="sm:w-6 sm:h-6" />
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                      index === currentImageIndex 
                        ? 'bg-white scale-110' 
                        : 'bg-white/60 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Thanjavur Temple Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="cursor-pointer transform transition-all duration-300 hover:scale-105"
              onClick={() => window.open('https://en.wikipedia.org/wiki/Brihadisvara_Temple', '_blank')}
            >
              <div className="relative">
                <img
                  src="/thanjavur temple -Photoroom.png"
                  alt="Thanjavur Brihadisvara Temple"
                  className="w-full h-[200px] sm:h-[250px] lg:h-[400px] xl:h-[500px] object-contain mx-auto"
                />
                <div className="text-center mt-4">
                  <p className="text-sm sm:text-base font-medium text-gray-800">Brihadisvara Temple</p>
                  <p className="text-xs sm:text-sm text-gray-600">Click to learn more</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 sm:mt-16 lg:mt-20 mb-12 sm:mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title[language]}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.2 }}
                whileHover={{ y: -10 }}
                className="bg-white/90 p-4 sm:p-6 lg:p-8 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-xl"
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-${feature.color}-500 text-white flex items-center justify-center mb-3 sm:mb-4`}>
                  <span className="font-bold text-lg sm:text-xl">{index + 1}</span>
                </div>
                <h3 className="font-display text-lg sm:text-xl mb-2 sm:mb-3 text-gray-900">
                  {feature.title[language]}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {feature.description[language]}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-12 sm:mb-16 max-w-4xl mx-auto"
        >
          <div className="bg-white/90 rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 lg:p-12 relative mx-2 sm:mx-4 lg:mx-0">
            {/* Quote marks */}
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-spice-300 absolute top-2 sm:top-4 left-3 sm:left-6 font-serif">"</div>
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-spice-300 absolute bottom-2 sm:bottom-4 right-3 sm:right-6 font-serif">"</div>
            
            <blockquote className="relative z-10">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-light text-gray-800 mb-4 sm:mb-6 leading-relaxed italic px-4 sm:px-6 lg:px-8">
                {translations.about.quote.text[language]}
              </p>
              <footer className="flex flex-col items-center">
                <cite className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-spice-600 not-italic">
                  {translations.about.quote.author[language]}
                </cite>
              </footer>
            </blockquote>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute left-1/2 bottom-4 sm:bottom-6 lg:bottom-8 transform -translate-x-1/2 text-center">
        <Link
          to="menu"
          spy={true}
          smooth={true}
          offset={-80}
          duration={800}
          className="text-gray-600 flex flex-col items-center cursor-pointer hover:text-spice-600 transition-colors"
        >
          <span className="text-xs sm:text-sm uppercase tracking-wider mb-1 sm:mb-2">
            {translations.about.cta[language]}
          </span>
          <ChevronDown size={16} className="sm:w-5 sm:h-5 animate-bounce" />
        </Link>
      </div>
    </section>
  );
};

export default AboutSection;