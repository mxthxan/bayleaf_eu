import React from 'react';
import { Link } from 'react-scroll';
import { 
  Utensils, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Facebook, 
  Instagram, 
  Twitter 
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Restaurant Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-white p-2 rounded-full mr-2">
                <Utensils size={20} className="text-spice-500" />
              </div>
              <span className="font-display text-xl font-bold">Bay Leaf</span>
            </div>
            <p className="text-gray-400 mb-4">
              Authentic South Indian cuisine in the heart of Germany. 
              Experience the rich flavors and traditions of South India.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/15ZqHPsWyt/?mibextid=wwXIfr" className="text-white hover:text-spice-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/bayleafsingen?igsh=Yjg4YWR3YzNveTZq&utm_source=qr" className="text-white hover:text-spice-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-spice-400 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['home', 'about', 'menu', 'gallery', 'contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={item}
                    spy={true}
                    smooth={true}
                    offset={-80}
                    duration={800}
                    className="text-gray-400 hover:text-spice-400 transition-colors cursor-pointer"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-spice-400 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                August-Ruf-Straße 16, 78224 Singen (Hohentwiel)
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-spice-400 mr-2 flex-shrink-0" />
                <span className="text-gray-400">+49 179 423 2002</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-spice-400 mr-2 flex-shrink-0" />
                <span className="text-gray-400">info@bay-leaf.eu</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="font-display text-lg font-bold mb-4">Opening Hours</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Clock size={18} className="text-spice-400 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400">Tuesday to Sunday</p>
                  <p className="text-white">11:30 AM – 2:30 PM / 5:30 PM - 10:00 PM</p>
                  <p className="text-white">Closed on Mondays</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Bay Leaf. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-spice-400 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-spice-400 text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-spice-400 text-sm transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;