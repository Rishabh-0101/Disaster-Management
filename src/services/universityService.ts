import { supabase } from './supabaseClient';

// TODO: replace table name / columns with your actual Supabase schema.
const TABLE = 'universities';

export async function listUniversities() {
  const { data, error } = await supabase.from(TABLE).select('*');
  if (error) throw error;
  return data;
}

export async function getUniversityById(id: string) {
  const { data, error } = await supabase.from(TABLE).select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}
