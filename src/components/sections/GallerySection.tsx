import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { Image, X, ChevronDown, Eye, EyeOff } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  description: string;
}

const galleryData: GalleryItem[] = [
  // Original images from gallery pics 2 for bay
  {
    id: "1",
    title: "Traditional Masala Dosa",
    imageUrl: "/gallery%20pics%202%20for%20bay/image(1).jpeg",
    category: "food",
    description: "Our signature crispy dosa served with authentic sambar and chutneys"
  },
  {
    id: "2",
    title: "Main Dining Area",
    imageUrl: "/gallery%20pics%202%20for%20bay/image(2).jpeg",
    category: "restaurant",
    description: "Elegant dining space with traditional South Indian elements"
  },
  {
    id: "3",
    title: "Chef's Special Curry",
    imageUrl: "/gallery%20pics%202%20for%20bay/image(3).jpeg",
    category: "food",
    description: "Aromatic curry prepared with hand-ground spices"
  },
  
  {
    id: "6",
    title: "Private Dining",
    imageUrl: "/gallery%20pics%202%20for%20bay/image(6).jpeg",
    category: "restaurant",
    description: "Intimate dining space for special occasions"
  },
  // Additional images from gallery pics 2 for bay (image 7-30)
  
  {
    id: "8",
    title: "Traditional Curry Selection",
    imageUrl: "/gallery%20pics%202%20for%20bay/image(8).jpeg",
    category: "food",
    description: "Variety of traditional South Indian curries"
  },
  {
    id: "9",
    title: "Restaurant Ambiance",
    imageUrl: "/gallery%20pics%202%20for%20bay/image(9).jpeg",
    category: "restaurant",
    description: "Warm and inviting restaurant atmosphere"
  },
  {
    id: "10",
    title: "Seafood Special",
    imageUrl: "/gallery%20pics%202%20for%20bay/image(10).jpeg",
    category: "food",
    description: "Fresh seafood prepared with traditional spices"
  },
  {
    id: "11",
    title: "Vegetarian Delights",
    imageUrl: "/gallery%20pics%202%20for%20bay/image(11).jpeg",
    category: "food",
    description: "Assorted vegetarian dishes with authentic flavors"
  },
  {
    id: "12",
    title: "Kitchen Excellence",
    imageUrl: "/gallery%20pics%202%20for%20bay/image(12).jpeg",
    category: "restaurant",
    description: "Professional kitchen where culinary magic happens"
  },
  {
    id: "13",
    title: "Traditional Breakfast",
    imageUrl: "/gallery%20pics%202%20for%20bay/image(13).jpeg",
    category: "food",
    description: "Authentic South Indian breakfast items"
  },
  {
    id: "14",
    title: "Spice Collection",
    imageUrl: "/gallery%20pics%202%20for%20bay/image(14).jpeg",
    category: "food",
    description: "Premium spices used in our authentic preparations"
  },
  {
    id: "15",
    title: "Customer Dining Experience",
    imageUrl: "/gallery%20pics%202%20for%20bay/image(15).jpeg",
    category: "restaurant",
    description: "Guests enjoying their dining experience"
  },
  {
    id: "16",
    title: "Festival Special",
    imageUrl: "/gallery%20pics%202%20for%20bay/image(16).jpeg",
    category: "events",
    description: "Special dishes prepared for festival celebrations"
  },
  {
    id: "17",
    title: "Traditional Snacks",
    imageUrl: "/gallery%20pics%202%20for%20bay/image(17).jpeg",
    category: "food",
    description: "Crispy and flavorful traditional snacks"
  },
  {
    id: "18",
    title: "Chef's Presentation",
    imageUrl: "/gallery%20pics%202%20for%20bay/image(18).jpeg",
    category: "food",
    description: "Beautifully presented dishes by our expert chefs"
  },
  {
    id: "19",
    title: "Regional Specialties",
    imageUrl: "/gallery%20pics%202%20for%20bay/image(19).jpeg",
    category: "food",
    description: "Authentic regional dishes from different parts of South India"
  },
  {
    id: "20",
    title: "Dining Comfort",
    imageUrl: "/gallery%20pics%202%20for%20bay/image(20).jpeg",
    category: "restaurant",
    description: "Comfortable seating arrangement for all guests"
  },
  {
    id: "21",
    title: "Signature Platter",
    imageUrl: "/gallery%20pics%202%20for%20bay/image(21).jpeg",
    category: "food",
    description: "Our signature mixed platter with variety of dishes"
  },
  {
    id: "22",
    title: "Traditional Preparation",
    imageUrl: "/gallery%20pics%202%20for%20bay/image(22).jpeg",
    category: "food",
    description: "Traditional cooking methods preserved through generations"
  },
  {
    id: "23",
    title: "Sweet Delicacies",
    imageUrl: "/gallery%20pics%202%20for%20bay/image(23).jpeg",
    category: "food",
    description: "Traditional South Indian sweets and desserts"
  },
  {
    id: "24",
    title: "Family Dining",
    imageUrl: "/gallery%20pics%202%20for%20bay/image(24).jpeg",
    category: "restaurant",
    description: "Perfect setting for family gatherings and celebrations"
  },
  {
    id: "25",
    title: "Authentic Flavors",
    imageUrl: "/gallery%20pics%202%20for%20bay/image(25).jpeg",
    category: "food",
    description: "Dishes that capture the essence of South Indian cuisine"
  },
  {
    id: "26",
    title: "Restaurant Exterior",
    imageUrl: "/gallery%20pics%202%20for%20bay/image(26).jpeg",
    category: "restaurant",
    description: "Welcoming exterior of our restaurant"
  },
  {
    id: "27",
    title: "Special Occasion Menu",
    imageUrl: "/gallery%20pics%202%20for%20bay/image(27).jpeg",
    category: "food",
    description: "Special dishes prepared for memorable occasions"
  },
  {
    id: "28",
    title: "Cultural Atmosphere",
    imageUrl: "/gallery%20pics%202%20for%20bay/image(28).jpeg",
    category: "restaurant",
    description: "Restaurant decorated with traditional South Indian elements"
  },
  {
    id: "29",
    title: "Lunch Special",
    imageUrl: "/gallery%20pics%202%20for%20bay/image(29).jpeg",
    category: "food",
    description: "Complete lunch menu with traditional accompaniments"
  },
  {
    id: "30",
    title: "Evening Dining",
    imageUrl: "/gallery%20pics%202%20for%20bay/image(30).jpeg",
    category: "restaurant",
    description: "Beautiful evening ambiance for dinner"
  },
  // All images from gallery pics for bay
  {
    id: "31",
    title: "Aloo Paratha",
    imageUrl: "/gallery%20pics%20for%20bay/aloo%20paratha%20pic.jpg",
    category: "food",
    description: "Stuffed potato flatbread served with yogurt and pickle"
  },
  {
    id: "32",
    title: "Aloo Chana Chaat",
    imageUrl: "/gallery%20pics%20for%20bay/Aloo-Chana-Chaat-pic.jpg",
    category: "food",
    description: "Spicy chickpea and potato street food"
  },
  {
    id: "33",
    title: "Aloo Gobi",
    imageUrl: "/gallery%20pics%20for%20bay/aloo-gobi%20pic.jpg",
    category: "food",
    description: "Cauliflower and potato curry with aromatic spices"
  },
  {
    id: "34",
    title: "Aloo Palak",
    imageUrl: "/gallery%20pics%20for%20bay/Aloo-palak%20pic.jpg",
    category: "food",
    description: "Spinach and potato curry rich in iron and flavor"
  },
  {
    id: "35",
    title: "Beef Milagu",
    imageUrl: "/gallery%20pics%20for%20bay/beef%20milagu.png",
    category: "food",
    description: "Spicy pepper beef curry from Kerala"
  },
  {
    id: "36",
    title: "Cauliflower Special",
    imageUrl: "/gallery%20pics%20for%20bay/cauliflower%20pictures.jpg",
    category: "food",
    description: "Roasted cauliflower with special spice blend"
  },
  {
    id: "37",
    title: "Chana Masala",
    imageUrl: "/gallery%20pics%20for%20bay/chana%20masala%20pic.jpg",
    category: "food",
    description: "Chickpea curry in rich tomato-onion gravy"
  },
  {
    id: "38",
    title: "Chettinad Chicken",
    imageUrl: "/gallery%20pics%20for%20bay/chettinad-chicken-%20pic.jpeg",
    category: "food",
    description: "Authentic Chettinad style spicy chicken"
  },
  {
    id: "39",
    title: "Chettinad Mutton Kuzhambu",
    imageUrl: "/gallery%20pics%20for%20bay/Chettinad-Mutton-Kuzhambu%20pic.jpg",
    category: "food",
    description: "Traditional Chettinad mutton curry"
  },
  {
    id: "40",
    title: "Chicken 65",
    imageUrl: "/gallery%20pics%20for%20bay/chicken%2065%20picture.JPG",
    category: "food",
    description: "Crispy fried chicken with South Indian spices"
  },


  {
    id: "43",
    title: "Chicken Gongura",
    imageUrl: "/gallery%20pics%20for%20bay/chicken%20gongura%20pic.jpg",
    category: "food",
    description: "Tangy chicken curry with sorrel leaves"
  },
  {
    id: "44",
    title: "Chicken Gravy",
    imageUrl: "/gallery%20pics%20for%20bay/chicken%20gravy%20pic.webp",
    category: "food",
    description: "Rich and creamy chicken curry"
  },
  {
    id: "45",
    title: "Chicken Special",
    imageUrl: "/gallery%20pics%20for%20bay/chicken%20pic.webp",
    category: "food",
    description: "Chef's special chicken preparation"
  },
  {
    id: "46",
    title: "Chicken Tikka Masala",
    imageUrl: "/gallery%20pics%20for%20bay/chicken%20tikka%20masala%20pic.jpg",
    category: "food",
    description: "Grilled chicken in creamy tomato sauce"
  },
  {
    id: "47",
    title: "Chicken with Bone",
    imageUrl: "/gallery%20pics%20for%20bay/chicken%20with%20bone.jpg",
    category: "food",
    description: "Traditional bone-in chicken curry"
  },

  {
    id: "49",
    title: "Chicken Kuzhambu",
    imageUrl: "/gallery%20pics%20for%20bay/Chicken-kuzhambu-recipe-chicken-kulambu%20pic.jpg",
    category: "food",
    description: "Traditional Tamil chicken kuzhambu"
  },
  {
    id: "50",
    title: "Dal Paneer",
    imageUrl: "/gallery%20pics%20for%20bay/dal-paneer%20pic.jpg",
    category: "food",
    description: "Lentil curry with cottage cheese"
  },
  {
    id: "51",
    title: "Eral Fry",
    imageUrl: "/gallery%20pics%20for%20bay/eral%20fry.jpg",
    category: "food",
    description: "Spicy prawns stir-fry"
  },
  {
    id: "52",
    title: "Eral Milagu",
    imageUrl: "/gallery%20pics%20for%20bay/eral%20milagu%20pic.jpg",
    category: "food",
    description: "Pepper prawns curry"
  },
  {
    id: "53",
    title: "Eral Thoku",
    imageUrl: "/gallery%20pics%20for%20bay/eral%20thoku.jpg",
    category: "food",
    description: "Dry prawns preparation with spices"
  },
  {
    id: "54",
    title: "Eral Prawn Pepper Fry",
    imageUrl: "/gallery%20pics%20for%20bay/eral-prawn-pepper-fry%20pic.jpg",
    category: "food",
    description: "Spicy pepper prawns fry"
  },
  {
    id: "55",
    title: "Fish Kulambu",
    imageUrl: "/gallery%20pics%20for%20bay/fish%20kulambu%20pic.jpg",
    category: "food",
    description: "Traditional Tamil fish curry"
  },
  {
    id: "56",
    title: "Fish Molee",
    imageUrl: "/gallery%20pics%20for%20bay/Fish-Molee%20pic.jpg",
    category: "food",
    description: "Kerala style fish curry in coconut milk"
  },
  {
    id: "57",
    title: "Gongura Mutton",
    imageUrl: "/gallery%20pics%20for%20bay/gongura%20mutton%20pic.webp",
    category: "food",
    description: "Mutton curry with tangy sorrel leaves"
  },
  {
    id: "58",
    title: "Kadai Paneer",
    imageUrl: "/gallery%20pics%20for%20bay/kadai-paneer%20pic.webp",
    category: "food",
    description: "Cottage cheese in spicy tomato gravy"
  },
  {
    id: "59",
    title: "Kari Dosai",
    imageUrl: "/gallery%20pics%20for%20bay/KARI%20DOSAI%20PIC.jpg",
    category: "food",
    description: "Spicy meat dosa with authentic flavors"
  },
  {
    id: "60",
    title: "Kashmiri Mutton",
    imageUrl: "/gallery%20pics%20for%20bay/kashmiri-mutton-2-1.jpg",
    category: "food",
    description: "Rich Kashmiri style mutton curry"
  },
  
  {
    id: "63",
    title: "Kozhi Rasam",
    imageUrl: "/gallery%20pics%20for%20bay/kozhi%20rasam%20pic%201.jpg",
    category: "food",
    description: "Chicken rasam with aromatic spices"
  },
  {
    id: "64",
    title: "Kozhi Varuthathu",
    imageUrl: "/gallery%20pics%20for%20bay/Kozhi-Varuthathu%20PICTURE.webp",
    category: "food",
    description: "Kerala style chicken fry"
  },
  {
    id: "65",
    title: "Kuruma",
    imageUrl: "/gallery%20pics%20for%20bay/kuruma%20pic.webp",
    category: "food",
    description: "Creamy coconut-based curry"
  },
  {
    id: "66",
    title: "Mango Chicken Curry",
    imageUrl: "/gallery%20pics%20for%20bay/Mango-Chicken-Curry%20pic.jpg",
    category: "food",
    description: "Tangy mango chicken curry"
  },


  {
    id: "69",
    title: "Mixed Vegetable Pakoda Special",
    imageUrl: "/gallery%20pics%20for%20bay/mixed%20vegetable%20pakoda.jpg",
    category: "food",
    description: "Special mixed vegetable pakoda"
  },
  
  {
    id: "71",
    title: "Mutton Kurma",
    imageUrl: "/gallery%20pics%20for%20bay/mutton%20kurma%20pic.jpg",
    category: "food",
    description: "Rich and creamy mutton kurma"
  },
  {
    id: "72",
    title: "Mutton Vindaloo",
    imageUrl: "/gallery%20pics%20for%20bay/mutton%20vindaloo%20pic.webp",
    category: "food",
    description: "Spicy Goan style mutton vindaloo"
  },

  {
    id: "76",
    title: "Onion Pakoda",
    imageUrl: "/gallery%20pics%20for%20bay/Onion-pakoda%20pic.jpg",
    category: "food",
    description: "Crispy onion fritters"
  },
  {
    id: "77",
    title: "Palak Paneer",
    imageUrl: "/gallery%20pics%20for%20bay/palak%20paneer%20pic.jpg",
    category: "food",
    description: "Spinach curry with cottage cheese"
  },
  {
    id: "78",
    title: "Paneer Butter Masala",
    imageUrl: "/gallery%20pics%20for%20bay/paneer%20butter%20masala%20pic.jpg",
    category: "food",
    description: "Rich paneer in creamy tomato gravy"
  },
  
  
  {
    id: "82",
    title: "Paruppu Keerai",
    imageUrl: "/gallery%20pics%20for%20bay/paruppu%20keerai%20pic.jpg",
    category: "food",
    description: "Lentils cooked with spinach"
  },
  
  {
    id: "84",
    title: "Pepper Chicken",
    imageUrl: "/gallery%20pics%20for%20bay/pepper%20chicken%20pic.jpg",
    category: "food",
    description: "Spicy black pepper chicken"
  },
  {
    id: "85",
    title: "Pepper Mutton",
    imageUrl: "/gallery%20pics%20for%20bay/PepperMutton%20pic.jpg",
    category: "food",
    description: "Aromatic pepper mutton curry"
  },


  {
    id: "88",
    title: "SET Dosai",
    imageUrl: "/gallery%20pics%20for%20bay/SET%20DOSAI%20%20PIC.jpg",
    category: "food",
    description: "Traditional set dosa"
  },
  {
    id: "89",
    title: "Thakkali Rasam",
    imageUrl: "/gallery%20pics%20for%20bay/thakkali%20rasam%20pic.jpg",
    category: "food",
    description: "Tangy tomato rasam"
  },
  {
    id: "90",
    title: "Vegetable Biryani",
    imageUrl: "/gallery%20pics%20for%20bay/Vegetable-Biryani%20pic.jpg",
    category: "food",
    description: "Aromatic vegetable biryani"
  },
  
  
];

const GallerySection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  
  const textRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const filteredImages = filter === 'all' 
    ? galleryData 
    : galleryData.filter(item => item.category === filter);

  const displayedImages = showAll ? filteredImages : filteredImages.slice(0, 9);

  const categories = ['all', 'food', 'restaurant', 'events'];

  const handleImageError = (imageId: string) => {
    setImageErrors(prev => new Set([...prev, imageId]));
  };

  const ImageComponent = ({ item, className, ...props }: { item: GalleryItem; className?: string; [key: string]: any }) => {
    const hasError = imageErrors.has(item.id);
    
    if (hasError) {
      return (
        <div className={`${className} bg-gray-200 flex items-center justify-center`}>
          <div className="text-center p-4">
            <Image className="mx-auto mb-2 text-gray-400" size={32} />
            <p className="text-gray-500 text-sm">{item.title}</p>
          </div>
        </div>
      );
    }

    return (
      <img 
        src={item.imageUrl} 
        alt={item.title}
        className={className}
        onError={() => handleImageError(item.id)}
        loading="lazy"
        {...props}
      />
    );
  };

  return (
    <section id="gallery" className="relative py-24" style={{ backgroundColor: '#ffd647' }}>
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div ref={textRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center mb-4"
          >
            <Image className="mr-2 text-spice-600" size={20} />
            <span className="uppercase tracking-widest text-sm text-spice-600">Our Visual Journey</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Our Gallery
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Take a visual journey through our restaurant, cuisine, and cultural events
          </motion.p>
        </div>

        {/* Filter Buttons */}
        <motion.div 
          className="flex justify-center flex-wrap gap-4 my-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => {
                setFilter(category);
                setShowAll(false);
              }}
              className={`px-6 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                filter === category 
                  ? 'bg-spice-600 text-white shadow' 
                  : 'bg-cream-200 text-gray-700 hover:bg-spice-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div 
          ref={galleryRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-6"
          layout
        >
          <AnimatePresence>
            {displayedImages.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                onClick={() => setSelectedImage(item)}
                className="cursor-pointer group"
              >
                <div className="relative overflow-hidden rounded-lg shadow-md aspect-square">
                  <ImageComponent
                    item={item}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <div className="text-center p-2">
                      <h3 className="text-white font-display text-xs sm:text-sm md:text-base mb-1">{item.title}</h3>
                      <p className="text-white/80 text-xs hidden sm:block">{item.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More/Less Button */}
        {filteredImages.length > 9 && (
          <motion.div 
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <motion.button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 bg-spice-600 text-white rounded-full font-medium hover:bg-spice-700 transition-colors flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showAll ? (
                <>
                  <EyeOff size={18} />
                  View Less
                </>
              ) : (
                <>
                  <Eye size={18} />
                  View More ({filteredImages.length - 9} more items)
                </>
              )}
            </motion.button>
          </motion.div>
        )}

        {/* Scroll Down Indicator - positioned after gallery */}
        <motion.div 
          className="text-center mt-16 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          layout
        >
          <div className="scroll-indicator mx-auto mb-4">
            <div className="scroll-indicator-progress" />
          </div>
          <Link
            to="contact"
            spy={true}
            smooth={true}
            offset={-80}
            duration={800}
            className="text-gray-600 flex flex-col items-center cursor-pointer hover:text-spice-600 transition-colors mx-auto w-fit"
          >
            <span className="text-sm uppercase tracking-wider mb-2">Book Your Experience</span>
            <ChevronDown size={20} />
          </Link>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  className="absolute top-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 transition-all z-10"
                  onClick={() => setSelectedImage(null)}
                >
                  <X size={24} />
                </button>
                <ImageComponent
                  item={selectedImage}
                  className="w-full max-h-[70vh] object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-display mb-2">{selectedImage.title}</h3>
                  <p className="text-gray-600">{selectedImage.description}</p>
                  <span className="text-sm text-gray-500 mt-2 block capitalize">
                    Category: {selectedImage.category}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GallerySection;