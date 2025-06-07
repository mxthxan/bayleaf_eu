import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { Menu, ChevronDown } from 'lucide-react';
import { MenuItem } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../context/translations';

const menuData: MenuItem[] = [
  {
    id: "1",
    name: "Masala Dosa",
    description: "Crispy rice crepe filled with spiced potato filling, served with sambar and coconut chutney.",
    price: 11.95,
    spiceLevel: 2,
    imageUrl: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg",
    category: "mains",
    isVegetarian: true,
    isSpecial: true
  },
  {
    id: "2",
    name: "Idli Sambar",
    description: "Steamed rice cakes served with lentil soup and coconut chutney.",
    price: 9.95,
    spiceLevel: 1,
    imageUrl: "https://images.pexels.com/photos/4331489/pexels-photo-4331489.jpeg",
    category: "starters",
    isVegetarian: true
  },
  {
    id: "3",
    name: "Chicken Chettinad",
    description: "Fiery chicken curry with freshly ground spices in authentic Chettinad style.",
    price: 18.95,
    spiceLevel: 3,
    imageUrl: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg",
    category: "mains",
    isVegetarian: false,
    isSpecial: true
  },
];

const MenuSection: React.FC = () => {
  const { language } = useLanguage();
  const categories = ["all", "starters", "mains", "desserts", "drinks"];
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});

  const textRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const filteredMenu = activeCategory === "all"
    ? menuData
    : menuData.filter(item => item.category === activeCategory);

  const handleToggleExpand = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section id="menu" className="relative py-24" style={{ backgroundColor: '#ffd647' }}>
      <div className="container mx-auto px-4 relative z-10">
        <div ref={textRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center mb-4"
          >
            <Menu className="mr-2 text-spice-600" size={20} />
            <span className="uppercase tracking-widest text-sm text-spice-600">
              {translations.menu.subtitle[language]}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            {translations.menu.title[language]}
          </motion.h2>
        </div>

        <motion.div
          className="flex justify-center flex-wrap gap-4 my-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              className={`px-6 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                activeCategory === category
                  ? 'bg-spice-600 text-white shadow'
                  : 'bg-cream-200 text-gray-700 hover:bg-spice-200'
              }`}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
            </motion.button>
          ))}
        </motion.div>

        <div 
          ref={menuRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence>
            {filteredMenu.map((item, index) => (
              <motion.div
                key={item.id}
                id={`menu-card-${item.id}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md transition-shadow duration-300"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  {item.isVegetarian && (
                    <span className="absolute top-3 left-3 bg-leaf-500 text-white text-xs px-2 py-1 rounded-full">
                      {translations.menu.labels.vegetarian[language]}
                    </span>
                  )}
                  {item.isSpecial && (
                    <span className="absolute top-3 right-3 bg-chili-600 text-white text-xs px-2 py-1 rounded-full">
                      {translations.menu.labels.chefsSpecial[language]}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-display text-lg font-semibold">{item.name}</h3>
                    <span className="text-spice-600 font-medium">€{item.price.toFixed(2)}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">
                    {expandedItems[item.id] ? item.description : item.description.slice(0, 60) + (item.description.length > 60 ? "..." : "")}
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-gray-500">
                      {translations.menu.labels.spiceLevel[language]}:
                    </span>
                    {[...Array(3)].map((_, i) => (
                      <span
                        key={i}
                        className={`w-3 h-3 rounded-full ${
                          i < item.spiceLevel ? 'bg-chili-600' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    className="text-xs text-spice-600 underline focus:outline-none"
                    onClick={() => {
                      handleToggleExpand(item.id);
                      if (!expandedItems[item.id]) {
                        // Scroll to the expanded card after state update
                        setTimeout(() => {
                          const card = document.getElementById(`menu-card-${item.id}`);
                          card?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }, 100);
                      }
                    }}
                  >
                    {expandedItems[item.id]
                      ? (translations.common.viewLess?.[language] || "View Less")
                      : (translations.common.viewMore?.[language] || "View More")}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link
            to="booking"
            spy={true}
            smooth={true}
            offset={-80}
            duration={800}
            className="btn-primary mr-4"
          >
            {translations.hero.bookTable[language]}
          </Link>
          <Link
            to="contact"
            spy={true}
            smooth={true}
            offset={-80}
            duration={800}
            className="btn-outline"
          >
            {translations.menu.viewFullMenu[language]}
          </Link>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-10">
          <div className="scroll-indicator">
            <div className="scroll-indicator-progress" />
          </div>
          <Link
            to="reviews"
            spy={true}
            smooth={true}
            offset={-80}
            duration={800}
            className="text-gray-600 flex flex-col items-center cursor-pointer hover:text-spice-600 transition-colors"
          >
            <span className="text-sm uppercase tracking-wider mb-2">
              {translations.common.continue[language]}
            </span>
            <ChevronDown size={20} />
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              className="bg-white rounded-xl overflow-hidden max-w-2xl w-full"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={e => e.stopPropagation()}
            >
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-display mb-2">{selectedItem.name}</h3>
                <p className="text-gray-600 mb-4">{selectedItem.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-medium text-spice-600">
                    €{selectedItem.price.toFixed(2)}
                  </span>
                  <button 
                    className="btn-primary" 
                    onClick={() => setSelectedItem(null)}
                  >
                    {translations.common.close[language]}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MenuSection;