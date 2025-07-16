import { supabaseAdmin } from './supabase';
import { NextResponse } from 'next/server';

export function getSupabaseAdmin() {
  if (!supabaseAdmin) {
    throw new Error('Supabase admin client is not initialized. Make sure SUPABASE_SERVICE_ROLE_KEY is set.');
  }
  return supabaseAdmin;
}

export function handleSupabaseAdminError() {
  return NextResponse.json(
    { error: 'Configuration serveur incorrecte' },
    { status: 500 }
  );
}
