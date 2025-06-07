/*
  # Fix RLS policy for reservations table

  1. Security Updates
    - Drop existing INSERT policy for reservations table
    - Create new INSERT policy that properly allows anonymous users to submit reservations
    - Ensure the policy allows both anonymous (anon) and authenticated users to insert reservations

  2. Policy Details
    - Policy name: "Allow public reservation submissions"
    - Allows INSERT operations for both anon and authenticated roles
    - No restrictions on the data being inserted (public form submissions)
*/

-- Drop the existing INSERT policy if it exists
DROP POLICY IF EXISTS "Anyone can submit reservations" ON reservations;

-- Create a new INSERT policy that allows anonymous users to submit reservations
CREATE POLICY "Allow public reservation submissions"
  ON reservations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Ensure the existing SELECT and UPDATE policies remain intact
-- (These should already exist based on the schema, but we'll recreate them to be safe)

-- Drop and recreate SELECT policy
DROP POLICY IF EXISTS "Authenticated users can view all reservations" ON reservations;
CREATE POLICY "Authenticated users can view all reservations"
  ON reservations
  FOR SELECT
  TO authenticated
  USING (true);

-- Drop and recreate UPDATE policy  
DROP POLICY IF EXISTS "Authenticated users can update reservations" ON reservations;
CREATE POLICY "Authenticated users can update reservations"
  ON reservations
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);