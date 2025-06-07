import React from 'react';
import { Mail, Phone, Clock, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const ScrollHideContactHeader = () => {
  const [isVisible, setIsVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`hidden lg:flex justify-between items-center px-6 py-2 bg-[#3d2c12] text-white text-sm transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } fixed top-0 left-0 right-0 z-40`}
    >
      {/* Left side - Contact Info */}
      <div className="flex flex-wrap gap-x-6 items-center">
        <div className="flex items-center gap-2">
          <Mail size={14} />
          <span className="hidden xl:inline">Mail Us:</span>
          <a href="mailto:info@rajabhogam.com" className="hover:underline">
            info@bayleaf.com
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Phone size={14} />
          <span className="hidden xl:inline">Call for reservation:</span>
          <a href="tel:+918807799222" className="hover:underline">
            +91 8807799222
          </a>
        </div>
      </div>

      {/* Right side - Hours and Social */}
      <div className="flex flex-wrap gap-x-4 items-center">
        <div className="flex items-center gap-2">
          <Clock size={14} />
          <span className="hidden xl:inline">Opening Hours:</span>
          11:30 AM – 2:30 PM / 5:30 PM - 10:00 PM
        </div>
        <div className="flex items-center gap-3 ml-4">
          <a href="https://www.facebook.com/share/15ZqHPsWyt/?mibextid=wwXIfr" aria-label="Facebook" className="hover:text-yellow-400">
            <Facebook size={16} />
          </a>
          <a href="https://www.instagram.com/bayleafsingen?igsh=Yjg4YWR3YzNveTZq&utm_source=qr" aria-label="Instagram" className="hover:text-yellow-400">
            <Instagram size={16} />
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-yellow-400">
            <Twitter size={16} />
          </a>
          <a href="#" aria-label="YouTube" className="hover:text-yellow-400">
            <Youtube size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ScrollHideContactHeader;