import { supabase } from './supabaseClient';

// TODO: replace table name / columns with your actual Supabase schema.
const TABLE = 'impact_stories';

export async function listImpactStories() {
  const { data, error } = await supabase.from(TABLE).select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function getPlatformStats() {
  // TODO: replace with a real aggregate query / RPC call.
  const { data, error } = await supabase.from('platform_stats').select('*').single();
  if (error) throw error;
  return data;
}
