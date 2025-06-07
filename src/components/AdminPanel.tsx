import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Users, 
  Mail, 
  Phone, 
  MessageSquare, 
  CheckCircle, 
  XCircle, 
  Eye,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';
import { contactService, type Reservation, type ContactMessage } from '../lib/supabase';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'reservations' | 'messages'>('reservations');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [reservationsData, messagesData] = await Promise.all([
        contactService.getReservations(),
        contactService.getContactMessages()
      ]);
      setReservations(reservationsData);
      setMessages(messagesData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateReservationStatus = async (id: string, status: Reservation['status']) => {
    try {
      await contactService.updateReservationStatus(id, status);
      setReservations(prev => 
        prev.map(res => res.id === id ? { ...res, status } : res)
      );
    } catch (error) {
      console.error('Error updating reservation:', error);
    }
  };

  const updateMessageStatus = async (id: string, status: ContactMessage['status']) => {
    try {
      await contactService.updateContactMessageStatus(id, status);
      setMessages(prev => 
        prev.map(msg => msg.id === id ? { ...msg, status } : msg)
      );
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  const filteredReservations = filter === 'all' 
    ? reservations 
    : reservations.filter(res => res.status === filter);

  const filteredMessages = filter === 'all' 
    ? messages 
    : messages.filter(msg => msg.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': case 'new': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': case 'read': return 'bg-blue-100 text-blue-800';
      case 'completed': case 'replied': return 'bg-green-100 text-green-800';
      case 'cancelled': case 'archived': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-spice-600 text-white p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-display font-bold">Restaurant Admin Panel</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={loadData}
                className="p-2 hover:bg-spice-700 rounded-lg transition-colors"
                disabled={loading}
              >
                <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-spice-700 rounded-lg transition-colors"
              >
                <XCircle size={20} />
              </button>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => setActiveTab('reservations')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'reservations' 
                  ? 'bg-white text-spice-600' 
                  : 'bg-spice-700 text-white hover:bg-spice-800'
              }`}
            >
              <Calendar size={16} className="inline mr-2" />
              Reservations ({reservations.length})
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'messages' 
                  ? 'bg-white text-spice-600' 
                  : 'bg-spice-700 text-white hover:bg-spice-800'
              }`}
            >
              <MessageSquare size={16} className="inline mr-2" />
              Messages ({messages.length})
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="p-4 border-b bg-gray-50">
          <div className="flex items-center gap-4">
            <Filter size={16} className="text-gray-600" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm"
            >
              <option value="all">All Status</option>
              {activeTab === 'reservations' ? (
                <>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </>
              ) : (
                <>
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                  <option value="archived">Archived</option>
                </>
              )}
            </select>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw size={32} className="animate-spin text-spice-600" />
            </div>
          ) : activeTab === 'reservations' ? (
            <div className="space-y-4">
              {filteredReservations.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No reservations found</p>
              ) : (
                filteredReservations.map((reservation) => (
                  <div key={reservation.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{reservation.name}</h3>
                        <p className="text-gray-600">{reservation.email}</p>
                        {reservation.phone && (
                          <p className="text-gray-600 flex items-center gap-1">
                            <Phone size={14} />
                            {reservation.phone}
                          </p>
                        )}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(reservation.status || 'pending')}`}>
                        {reservation.status || 'pending'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-500" />
                        <span className="text-sm">{reservation.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-gray-500" />
                        <span className="text-sm">{reservation.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-gray-500" />
                        <span className="text-sm">{reservation.guests} guests</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(reservation.created_at!).toLocaleDateString()}
                      </div>
                    </div>

                    {reservation.special_requests && (
                      <div className="mb-3">
                        <p className="text-sm text-gray-600">
                          <strong>Special Requests:</strong> {reservation.special_requests}
                        </p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button
                        onClick={() => updateReservationStatus(reservation.id!, 'confirmed')}
                        className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                        disabled={reservation.status === 'confirmed'}
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => updateReservationStatus(reservation.id!, 'completed')}
                        className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                        disabled={reservation.status === 'completed'}
                      >
                        Complete
                      </button>
                      <button
                        onClick={() => updateReservationStatus(reservation.id!, 'cancelled')}
                        className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
                        disabled={reservation.status === 'cancelled'}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredMessages.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No messages found</p>
              ) : (
                filteredMessages.map((message) => (
                  <div key={message.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{message.name}</h3>
                        <p className="text-gray-600">{message.email}</p>
                        {message.subject && (
                          <p className="text-sm text-gray-500">Subject: {message.subject}</p>
                        )}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(message.status || 'new')}`}>
                        {message.status || 'new'}
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-gray-700">{message.message}</p>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {new Date(message.created_at!).toLocaleDateString()}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateMessageStatus(message.id!, 'read')}
                          className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                          disabled={message.status === 'read'}
                        >
                          Mark Read
                        </button>
                        <button
                          onClick={() => updateMessageStatus(message.id!, 'replied')}
                          className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                          disabled={message.status === 'replied'}
                        >
                          Mark Replied
                        </button>
                        <button
                          onClick={() => updateMessageStatus(message.id!, 'archived')}
                          className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition-colors"
                          disabled={message.status === 'archived'}
                        >
                          Archive
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminPanel;