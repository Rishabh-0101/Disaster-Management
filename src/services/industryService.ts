import { supabase } from './supabaseClient';

// TODO: replace table name / columns with your actual Supabase schema.
const TABLE = 'industry_partners';

export async function listIndustryPartners() {
  const { data, error } = await supabase.from(TABLE).select('*');
  if (error) throw error;
  return data;
}

export async function getIndustryPartnerById(id: string) {
  const { data, error } = await supabase.from(TABLE).select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}
