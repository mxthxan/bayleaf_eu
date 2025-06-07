import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Menu, X, Utensils, Globe, Settings } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../context/translations';
import AdminPanel from './AdminPanel';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactHeaderVisible, setContactHeaderVisible] = useState(true);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navItems = [
    { id: 'home', label: translations.navbar.home[language] },
    { id: 'about', label: translations.navbar.about[language] },
    { id: 'menu', label: translations.navbar.menu[language] },
    { id: 'gallery', label: translations.navbar.gallery[language] },
    { id: 'contact', label: translations.navbar.contact[language] },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      
      // Update scrolled state
      if (offset > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Update contact header visibility state (only on large screens)
      const isLargeScreen = window.innerWidth >= 1024;
      if (isLargeScreen) {
        if (offset > 100) {
          setContactHeaderVisible(false);
        } else {
          setContactHeaderVisible(true);
        }
      } else {
        setContactHeaderVisible(false);
      }
    };

    const handleResize = () => {
      // Update contact header visibility on resize
      const isLargeScreen = window.innerWidth >= 1024;
      if (!isLargeScreen) {
        setContactHeaderVisible(false);
      } else if (window.scrollY <= 100) {
        setContactHeaderVisible(true);
      }
    };

    // Admin panel keyboard shortcut
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setShowAdminPanel(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    
    // Initial check
    handleScroll();
    handleResize();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <nav 
        className={`fixed left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'nav-scrolled py-2' : 'py-4 bg-transparent'
        } ${contactHeaderVisible ? 'lg:top-[40px]' : 'lg:top-0'} top-0`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link
              to="home"
              spy={true}
              smooth={true}
              offset={contactHeaderVisible ? -120 : -80}
              duration={100}
              className="flex items-center cursor-pointer"
            >
              <div className="bg-white p-2 rounded-full mr-2">
                <Utensils size={24} className="text-spice-500" />
              </div>
              <span className={`font-display text-xl md:text-2xl font-bold ${scrolled ? 'text-spice-800' : 'text-white'}`}>
                Singen
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.id}
                  spy={true}
                  smooth={true}
                  offset={contactHeaderVisible ? -120 : -80}
                  duration={100}
                  className={`font-medium cursor-pointer hover:text-spice-500 transition-colors ${
                    scrolled ? 'text-gray-800' : 'text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Language Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleLanguage('en')}
                  className={`flex items-center px-3 py-1 rounded-md transition-colors ${
                    language === 'en' 
                      ? 'bg-spice-500 text-white' 
                      : scrolled ? 'text-gray-800' : 'text-white'
                  } hover:text-spice-500 ${language !== 'en' && 'hover:bg-gray-100'}`}
                >
                  <span className="font-medium">EN</span>
                </button>
                
                <button
                  onClick={() => toggleLanguage('de')}
                  className={`flex items-center px-3 py-1 rounded-md transition-colors ${
                    language === 'de' 
                      ? 'bg-spice-500 text-white' 
                      : scrolled ? 'text-gray-800' : 'text-white'
                  } hover:text-spice-500 ${language !== 'de' && 'hover:bg-gray-100'}`}
                >
                  <span className="font-medium">DE</span>
                </button>
              </div>

              {/* Admin Button (hidden, accessible via Ctrl+Shift+A) */}
              <button
                onClick={() => setShowAdminPanel(true)}
                className={`p-2 rounded-md transition-colors opacity-20 hover:opacity-100 ${
                  scrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                }`}
                title="Admin Panel (Ctrl+Shift+A)"
              >
                <Settings size={16} />
              </button>
              
              <a 
                href="#booking" 
                className="btn-primary text-sm"
              >
                {translations.navbar.bookTable[language]}
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle mobile menu"
            >
              {isOpen ? (
                <X size={24} className={scrolled ? 'text-gray-800' : 'text-white'} />
              ) : (
                <Menu size={24} className={scrolled ? 'text-gray-800' : 'text-white'} />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-4 transition-all duration-300 ease-in-out">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.id}
                    spy={true}
                    smooth={true}
                    offset={-80}
                    duration={0}
                    className="font-medium text-gray-800 hover:text-spice-500 transition-colors py-2"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {/* Language Buttons for Mobile */}
                <div className="flex space-x-2 py-2">
                  <button
                    onClick={() => toggleLanguage('en')}
                    className={`flex items-center px-3 py-1 rounded-md ${
                      language === 'en' ? 'bg-spice-500 text-white' : 'text-gray-800'
                    } hover:text-spice-500 ${language !== 'en' && 'hover:bg-gray-100'} transition-colors`}
                  >
                    <span className="font-medium">EN</span>
                  </button>
                  
                  <button
                    onClick={() => toggleLanguage('de')}
                    className={`flex items-center px-3 py-1 rounded-md ${
                      language === 'de' ? 'bg-spice-500 text-white' : 'text-gray-800'
                    } hover:text-spice-500 ${language !== 'de' && 'hover:bg-gray-100'} transition-colors`}
                  >
                    <span className="font-medium">DE</span>
                  </button>
                </div>

                {/* Mobile Admin Button */}
                <button
                  onClick={() => {
                    setShowAdminPanel(true);
                    closeMenu();
                  }}
                  className="flex items-center text-gray-800 hover:text-spice-500 transition-colors py-2 opacity-50"
                >
                  <Settings size={16} className="mr-2" />
                  Admin Panel
                </button>
                
                <a 
                  href="#booking" 
                  className="btn-primary text-center"
                  onClick={closeMenu}
                >
                  {translations.navbar.bookTable[language]}
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Admin Panel */}
      <AdminPanel 
        isOpen={showAdminPanel} 
        onClose={() => setShowAdminPanel(false)} 
      />
    </>
  );
};

export default Navbar;