import React, { useState, useRef } from 'react';
import { Link } from 'react-scroll';
import { Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { contactService, type Reservation } from '../../lib/supabase';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../context/translations';

interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  special_requests: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

const ContactSection: React.FC = () => {
  const { language } = useLanguage();
  const formRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    special_requests: ''
  });

  const [formStatus, setFormStatus] = useState<FormStatus>({
    type: 'idle',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ type: 'loading', message: 'Submitting your reservation...' });

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.date || !formData.time) {
        throw new Error('Please fill in all required fields');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Validate date is not in the past
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        throw new Error('Please select a future date');
      }

      // Prepare reservation data
      const reservationData: Omit<Reservation, 'id' | 'created_at' | 'status'> = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim() || undefined,
        date: formData.date,
        time: formData.time,
        guests: parseInt(formData.guests),
        special_requests: formData.special_requests.trim() || undefined
      };

      // Submit to Supabase
      await contactService.submitReservation(reservationData);

      // Success
      setFormStatus({
        type: 'success',
        message: language === 'en' 
          ? 'Reservation submitted successfully! We will contact you soon to confirm.'
          : 'Reservierung erfolgreich eingereicht! Wir werden Sie bald kontaktieren, um zu bestätigen.'
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '2',
        special_requests: ''
      });

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setFormStatus({ type: 'idle', message: '' });
      }, 5000);

    } catch (error) {
      console.error('Error submitting reservation:', error);
      setFormStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'An error occurred. Please try again.'
      });

      // Auto-hide error message after 5 seconds
      setTimeout(() => {
        setFormStatus({ type: 'idle', message: '' });
      }, 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Get available time slots
  const getTimeSlots = () => {
    const lunchSlots = ['11:30', '12:00', '12:30', '13:00', '13:30', '14:00'];
    const dinnerSlots = ['17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'];
    return [...lunchSlots, ...dinnerSlots];
  };

  const contactInfo = [
    {
      icon: <MapPin size={20} />,
      title: translations.contact.info.address[language],
      content: "August-Ruf-Straße 16, 78224 Singen (Hohentwiel)"
    },
    {
      icon: <Phone size={20} />,
      title: translations.contact.info.phone[language],
      content: "+49 179 423 2002"
    },
    {
      icon: <Mail size={20} />,
      title: translations.contact.info.email[language],
      content: "info@bay-leaf.eu"
    },
    {
      icon: <Clock size={20} />,
      title: translations.contact.info.hours[language],
      content: (
        <>
          {language === 'en' ? 'Tue-Sun: 11:30 AM – 2:30 PM / 5:30 PM - 10:00 PM' : 'Di-So: 11:30 – 14:30 / 17:30 - 22:00'}<br />
          {language === 'en' ? 'Closed on Mondays' : 'Montags geschlossen'}
        </>
      )
    }
  ];

  return (
    <section 
      id="contact" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <img
          src="https://ik.imagekit.io/qcf813yjh/banna%20leaf%20food%20pictures%20(1).webp"
          alt="Banana leaf food background"
          className="absolute w-full h-full object-cover min-h-screen min-w-full"
        />
        <div className="absolute inset-0 bg-gray-900/60 z-0"></div>
      </div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-5xl text-white font-bold text-center mb-4">
            {translations.contact.title[language]}
          </h2>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto text-center mb-12">
            {translations.contact.subtitle[language]}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/95 backdrop-blur p-8 rounded-lg shadow-xl"
          >
            <h3 className="font-display text-2xl mb-6 text-gray-900">
              {translations.contact.form.submit[language]}
            </h3>
            
            {/* Status Message */}
            {formStatus.type !== 'idle' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                  formStatus.type === 'success' 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : formStatus.type === 'error'
                    ? 'bg-red-50 text-red-800 border border-red-200'
                    : 'bg-blue-50 text-blue-800 border border-blue-200'
                }`}
              >
                {formStatus.type === 'loading' && <Loader2 size={20} className="animate-spin" />}
                {formStatus.type === 'success' && <CheckCircle size={20} />}
                {formStatus.type === 'error' && <AlertCircle size={20} />}
                <span className="text-sm">{formStatus.message}</span>
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-1 font-medium">
                    {translations.contact.form.name[language]} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-spice-500 focus:border-transparent"
                    placeholder={language === 'en' ? 'Your full name' : 'Ihr vollständiger Name'}
                    required
                    disabled={formStatus.type === 'loading'}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-1 font-medium">
                    {translations.contact.form.email[language]} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-spice-500 focus:border-transparent"
                    placeholder={language === 'en' ? 'your.email@example.com' : 'ihre.email@beispiel.de'}
                    required
                    disabled={formStatus.type === 'loading'}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-700 mb-1 font-medium">
                  {translations.contact.info.phone[language]} {language === 'en' ? '(Optional)' : '(Optional)'}
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-spice-500 focus:border-transparent"
                  placeholder={language === 'en' ? '+49 123 456 7890' : '+49 123 456 7890'}
                  disabled={formStatus.type === 'loading'}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block text-gray-700 mb-1 font-medium">
                    {translations.contact.form.date[language]} *
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={getMinDate()}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-spice-500 focus:border-transparent"
                    required
                    disabled={formStatus.type === 'loading'}
                  />
                </div>
                
                <div>
                  <label htmlFor="time" className="block text-gray-700 mb-1 font-medium">
                    {translations.contact.form.time[language]} *
                  </label>
                  <select
                    id="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-spice-500 focus:border-transparent"
                    required
                    disabled={formStatus.type === 'loading'}
                  >
                    <option value="">{language === 'en' ? 'Select time' : 'Zeit auswählen'}</option>
                    <optgroup label={language === 'en' ? 'Lunch (11:30 AM - 2:30 PM)' : 'Mittagessen (11:30 - 14:30)'}>
                      {getTimeSlots().slice(0, 6).map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </optgroup>
                    <optgroup label={language === 'en' ? 'Dinner (5:30 PM - 10:00 PM)' : 'Abendessen (17:30 - 22:00)'}>
                      {getTimeSlots().slice(6).map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </optgroup>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="guests" className="block text-gray-700 mb-1 font-medium">
                  {translations.contact.form.guests[language]} *
                </label>
                <select
                  id="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-spice-500 focus:border-transparent"
                  required
                  disabled={formStatus.type === 'loading'}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>
                      {num} {num === 1 
                        ? (language === 'en' ? 'person' : 'Person') 
                        : (language === 'en' ? 'people' : 'Personen')
                      }
                    </option>
                  ))}
                  <option value="11">{language === 'en' ? '10+ people (call us)' : '10+ Personen (rufen Sie uns an)'}</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="special_requests" className="block text-gray-700 mb-1 font-medium">
                  {translations.contact.form.message[language]}
                </label>
                <textarea
                  id="special_requests"
                  value={formData.special_requests}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-spice-500 focus:border-transparent"
                  placeholder={language === 'en' 
                    ? 'Any special requests, dietary requirements, or allergies?' 
                    : 'Besondere Wünsche, Ernährungsanforderungen oder Allergien?'
                  }
                  disabled={formStatus.type === 'loading'}
                ></textarea>
              </div>
              
              <motion.button
                type="submit"
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: formStatus.type === 'loading' ? 1 : 1.02 }}
                whileTap={{ scale: formStatus.type === 'loading' ? 1 : 0.98 }}
                disabled={formStatus.type === 'loading'}
              >
                {formStatus.type === 'loading' && <Loader2 size={20} className="animate-spin" />}
                {formStatus.type === 'loading' 
                  ? (language === 'en' ? 'Submitting...' : 'Wird eingereicht...')
                  : translations.contact.form.submit[language]
                }
              </motion.button>
            </form>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/95 backdrop-blur p-8 rounded-lg shadow-xl"
          >
            <h3 className="font-display text-2xl mb-8 text-gray-900">
              {language === 'en' ? 'Get in Touch' : 'Kontakt aufnehmen'}
            </h3>
            
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <div className="bg-spice-100 p-3 rounded-full mr-4">
                    <span className="text-spice-600">{info.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">{info.title}</h4>
                    <p className="text-gray-600 whitespace-pre-line">{info.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              ref={mapRef}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8"
            >
              <h4 className="font-medium text-gray-900 mb-4">
                {language === 'en' ? 'Find Us' : 'Finden Sie uns'}
              </h4>
              <div className="h-[200px] rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2682.023456696236!2d8.836444776165843!3d47.76159937120448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479a7d35eeee6f1f%3A0xe5111ed81e27db8c!2sBay%20Leaf!5e0!3m2!1sen!2sin!4v1748797783448!5m2!1sen!2sin"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-10">
        <div className="scroll-indicator">
          <div className="scroll-indicator-progress" />
        </div>
        <Link
          to="footer"
          spy={true}
          smooth={true}
          offset={-80}
          duration={800}
          className="text-white/80 flex flex-col items-center cursor-pointer hover:text-white transition-colors"
        >
          <span className="text-sm uppercase tracking-wider mb-2">
            {language === 'en' ? 'Follow Us' : 'Folgen Sie uns'}
          </span>
          <div className="flex space-x-4">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default ContactSection;