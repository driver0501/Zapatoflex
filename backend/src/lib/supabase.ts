import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
    console.warn('⚠️ Advertencia: SUPABASE_URL o SUPABASE_KEY no están configuradas en .env');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
