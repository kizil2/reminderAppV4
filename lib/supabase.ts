import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://uproogspuvdgjqemifvn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwcm9vZ3NwdXZkZ2pxZW1pZnZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0OTAwNzcsImV4cCI6MjA3MTA2NjA3N30.jpHLgV0BVP7zTkPw5C9W_8qazqsYYNRnHyxEBu0nxd0';
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function getUserTeams(userId: string): Promise<string[]> {
	const { data, error } = await supabase
		.from('user_teams')
		.select('teams')
		.eq('user_id', userId)
		.maybeSingle();
	if (error || !data) return [];
	return Array.isArray(data.teams) ? data.teams : [];
}

export async function setUserTeams(userId: string, teams: string[]): Promise<void> {
	const { data, error, status, statusText } = await supabase
		.from('user_teams')
		.upsert({ user_id: userId, teams }, { onConflict: 'user_id' });
	console.log('[setUserTeams] upsert response:', { data, error, status, statusText, userId, teams });
	if (error) {
		console.error('[setUserTeams] Supabase error:', error);
		throw error;
	}
}
