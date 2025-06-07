import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status?: 'new' | 'read' | 'replied' | 'archived';
  created_at?: string;
}

export interface Reservation {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  date: string;
  time: string;
  guests: number;
  special_requests?: string;
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  created_at?: string;
}

// Database functions
export const contactService = {
  // Submit a contact message
  async submitContactMessage(message: Omit<ContactMessage, 'id' | 'created_at' | 'status'>) {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([message])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Submit a reservation
  async submitReservation(reservation: Omit<Reservation, 'id' | 'created_at' | 'status'>) {
    const { data, error } = await supabase
      .from('reservations')
      .insert([reservation])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get all contact messages (for admin use)
  async getContactMessages() {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Get all reservations (for admin use)
  async getReservations() {
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Update reservation status
  async updateReservationStatus(id: string, status: Reservation['status']) {
    const { data, error } = await supabase
      .from('reservations')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update contact message status
  async updateContactMessageStatus(id: string, status: ContactMessage['status']) {
    const { data, error } = await supabase
      .from('contact_messages')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};