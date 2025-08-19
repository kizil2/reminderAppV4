export async function fetchStandings(leagueCode: string) {
  try {
    const response = await fetch(`${BASE_URL}/competitions/${leagueCode}/standings`, {
      headers: {
        'X-Auth-Token': API_TOKEN,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.standings?.[0]?.table || [];
  } catch (error) {
    console.error('Error fetching standings:', error);
    return [];
  }
}
const API_TOKEN = 'dec393bb934e4e86841a95715728ca8f';
const BASE_URL = 'https://api.football-data.org/v4';

const PREMIER_LEAGUE_ID = 'PL';

export interface FootballDataMatch {
  id: number;
  homeTeam: {
    id: number;
    name: string;
    shortName: string;
    tla: string;
  };
  awayTeam: {
    id: number;
    name: string;
    shortName: string;
    tla: string;
  };
  utcDate: string;
  status: string;
  matchday: number;
  score: {
    fullTime: {
      home: number | null;
      away: number | null;
    };
  };
}

export interface FootballDataResponse {
  matches: FootballDataMatch[];
}

export async function fetchPremierLeagueFixtures(): Promise<FootballDataMatch[]> {
  try {
    const response = await fetch(`${BASE_URL}/competitions/${PREMIER_LEAGUE_ID}/matches`, {
      headers: {
        'X-Auth-Token': API_TOKEN,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: FootballDataResponse = await response.json();
    return data.matches;
  } catch (error) {
    console.error('Error fetching fixtures:', error);
    return [];
  }
}

export async function fetchUpcomingMatches(): Promise<FootballDataMatch[]> {
  try {
    const response = await fetch(`${BASE_URL}/competitions/${PREMIER_LEAGUE_ID}/matches?status=SCHEDULED`, {
      headers: {
        'X-Auth-Token': API_TOKEN,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: FootballDataResponse = await response.json();
    
    const now = new Date();
    const futureMatches = data.matches.filter(match => 
      new Date(match.utcDate) > now
    );
    
    return futureMatches;
  } catch (error) {
    console.error('Error fetching upcoming matches:', error);
    return [];
  }
}

export async function fetchTeamsByLeague(): Promise<any[]> {
  try {
    const response = await fetch(`${BASE_URL}/competitions/${PREMIER_LEAGUE_ID}/teams`, {
      headers: {
        'X-Auth-Token': API_TOKEN,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.teams;
  } catch (error) {
    console.error('Error fetching teams:', error);
    return [];
  }
}

export function convertApiMatchToAppMatch(apiMatch: FootballDataMatch) {
  return {
    id: apiMatch.id.toString(),
    homeTeam: apiMatch.homeTeam.shortName.toLowerCase().replace(/\s+/g, ''),
    awayTeam: apiMatch.awayTeam.shortName.toLowerCase().replace(/\s+/g, ''),
    date: apiMatch.utcDate,
    venue: 'TBD',
    week: apiMatch.matchday,
    status: apiMatch.status,
  };
}

export function getNextMatchForTeams(matches: FootballDataMatch[], teamNames: string[]): FootballDataMatch | null {
  const now = new Date();
  
  const normalizeTeamName = (name: string) => 
    name.toLowerCase()
      .replace(/fc/g, '')
      .replace(/afc/g, '')
      .replace(/united/g, '')
      .replace(/city/g, '')
      .replace(/&/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  
  const upcomingMatches = matches
    .filter(match => {
      const matchDate = new Date(match.utcDate);
      
      const homeTeamMatches = teamNames.some(team => {
        const normalizedTeam = normalizeTeamName(team);
        const normalizedHome = normalizeTeamName(match.homeTeam.name);
        const normalizedHomeShort = normalizeTeamName(match.homeTeam.shortName);
        
        return normalizedHome.includes(normalizedTeam) || 
               normalizedTeam.includes(normalizedHome) ||
               normalizedHomeShort.includes(normalizedTeam) ||
               normalizedTeam.includes(normalizedHomeShort) ||
               match.homeTeam.tla.toLowerCase() === team.toLowerCase();
      });
      
      const awayTeamMatches = teamNames.some(team => {
        const normalizedTeam = normalizeTeamName(team);
        const normalizedAway = normalizeTeamName(match.awayTeam.name);
        const normalizedAwayShort = normalizeTeamName(match.awayTeam.shortName);
        
        return normalizedAway.includes(normalizedTeam) || 
               normalizedTeam.includes(normalizedAway) ||
               normalizedAwayShort.includes(normalizedTeam) ||
               normalizedTeam.includes(normalizedAwayShort) ||
               match.awayTeam.tla.toLowerCase() === team.toLowerCase();
      });
      
      return matchDate > now && (homeTeamMatches || awayTeamMatches) && 
             (match.status === 'TIMED' || match.status === 'SCHEDULED');
    })
    .sort((a, b) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime());

  return upcomingMatches[0] || null;
}
