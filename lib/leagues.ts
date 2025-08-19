const API_TOKEN = 'dec393bb934e4e86841a95715728ca8f';
const BASE_URL = 'https://api.football-data.org/v4';

export interface Team {
  id: string;
  name: string;
  shortName: string;
  color: string;
  league: string;
  leagueFullName: string;
  country: string;
  flag: string;
}

export interface League {
  id: string;
  name: string;
  fullName: string;
  country: string;
  flag: string;
  apiCode: string;
}

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
  competition: {
    id: number;
    name: string;
    code: string;
  };
}

export interface FootballDataResponse {
  matches: FootballDataMatch[];
}

export const LEAGUES: League[] = [
  {
    id: 'premier-league',
    name: 'Premier League',
    fullName: 'Premier League',
    country: 'England',
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    apiCode: 'PL'
  },
  {
    id: 'bundesliga',
    name: 'Bundesliga',
    fullName: 'Bundesliga',
    country: 'Germany',
    flag: '🇩🇪',
    apiCode: 'BL1'
  }
  ,{
    id: 'ligue-1',
    name: 'Ligue 1',
    fullName: 'Ligue 1',
    country: 'France',
    flag: '🇫🇷',
    apiCode: 'FL1'
  },
  {
    id: 'serie-a',
    name: 'Serie A',
    fullName: 'Serie A',
    country: 'Italy',
    flag: '🇮🇹',
    apiCode: 'SA'
  },
  {
    id: 'primera-division',
    name: 'Primera Division',
    fullName: 'Primera Division',
    country: 'Spain',
    flag: '🇪🇸',
    apiCode: 'PD'
  }
];

export const ALL_TEAMS: Team[] = [
  //fransa
  { id: "angers", name: "Angers SCO", shortName: "ANG", color: "#000000", league: "Ligue 1", leagueFullName: "Ligue 1", country: "France", flag: "🇫🇷" },
  { id: "auxerre", name: "AJ Auxerre", shortName: "AJA", color: "#0055A4", league: "Ligue 1", leagueFullName: "Ligue 1", country: "France", flag: "🇫🇷" },
  { id: "brest", name: "Stade Brestois 29", shortName: "BRE", color: "#E30613", league: "Ligue 1", leagueFullName: "Ligue 1", country: "France", flag: "🇫🇷" },
  { id: "clermont", name: "Clermont Foot 63", shortName: "CLF", color: "#002B5C", league: "Ligue 1", leagueFullName: "Ligue 1", country: "France", flag: "🇫🇷" },
  { id: "le-havre", name: "Le Havre AC", shortName: "HAC", color: "#1C4E80", league: "Ligue 1", leagueFullName: "Ligue 1", country: "France", flag: "🇫🇷" },
  { id: "lens", name: "RC Lens", shortName: "RCL", color: "#FFD600", league: "Ligue 1", leagueFullName: "Ligue 1", country: "France", flag: "🇫🇷" },
  { id: "lille", name: "Lille OSC", shortName: "LOSC", color: "#E41B23", league: "Ligue 1", leagueFullName: "Ligue 1", country: "France", flag: "🇫🇷" },
  { id: "lorient", name: "FC Lorient", shortName: "FCL", color: "#FF6600", league: "Ligue 1", leagueFullName: "Ligue 1", country: "France", flag: "🇫🇷" },
  { id: "lyon", name: "Olympique Lyonnais", shortName: "OL", color: "#E2231A", league: "Ligue 1", leagueFullName: "Ligue 1", country: "France", flag: "🇫🇷" },
  { id: "marseille", name: "Olympique Marseille", shortName: "OM", color: "#009EE0", league: "Ligue 1", leagueFullName: "Ligue 1", country: "France", flag: "🇫🇷" },
  { id: "metz", name: "FC Metz", shortName: "FCM", color: "#7A263A", league: "Ligue 1", leagueFullName: "Ligue 1", country: "France", flag: "🇫🇷" },
  { id: "monaco", name: "AS Monaco", shortName: "ASM", color: "#ED1C24", league: "Ligue 1", leagueFullName: "Ligue 1", country: "France", flag: "🇫🇷" },
  { id: "montpellier", name: "Montpellier HSC", shortName: "MHSC", color: "#0055A4", league: "Ligue 1", leagueFullName: "Ligue 1", country: "France", flag: "🇫🇷" },
  { id: "nantes", name: "FC Nantes", shortName: "FCN", color: "#FFE600", league: "Ligue 1", leagueFullName: "Ligue 1", country: "France", flag: "🇫🇷" },
  { id: "nice", name: "OGC Nice", shortName: "OGCN", color: "#E01A4F", league: "Ligue 1", leagueFullName: "Ligue 1", country: "France", flag: "🇫🇷" },
  { id: "psg", name: "Paris Saint-Germain", shortName: "PSG", color: "#004170", league: "Ligue 1", leagueFullName: "Ligue 1", country: "France", flag: "🇫🇷" },
  { id: "reims", name: "Stade de Reims", shortName: "SDR", color: "#E30613", league: "Ligue 1", leagueFullName: "Ligue 1", country: "France", flag: "🇫🇷" },
  { id: "rennes", name: "Stade Rennais", shortName: "SRFC", color: "#D90429", league: "Ligue 1", leagueFullName: "Ligue 1", country: "France", flag: "🇫🇷" },
  { id: "st-etienne", name: "AS Saint-Étienne", shortName: "ASSE", color: "#22B14C", league: "Ligue 1", leagueFullName: "Ligue 1", country: "France", flag: "🇫🇷" },
  { id: "strasbourg", name: "RC Strasbourg Alsace", shortName: "RCSA", color: "#0055A4", league: "Ligue 1", leagueFullName: "Ligue 1", country: "France", flag: "🇫🇷" },
  { id: "toulouse", name: "Toulouse FC", shortName: "TFC", color: "#512D6D", league: "Ligue 1", leagueFullName: "Ligue 1", country: "France", flag: "🇫🇷" },

  //italya
  { id: "atalanta", name: "Atalanta BC", shortName: "ATA", color: "#1D1E2C", league: "Serie A", leagueFullName: "Serie A", country: "Italy", flag: "🇮🇹" },
  { id: "bologna", name: "Bologna FC 1909", shortName: "BOL", color: "#D80018", league: "Serie A", leagueFullName: "Serie A", country: "Italy", flag: "🇮🇹" },
  { id: "cagliari", name: "Cagliari Calcio", shortName: "CAG", color: "#004488", league: "Serie A", leagueFullName: "Serie A", country: "Italy", flag: "🇮🇹" },
  { id: "empoli", name: "Empoli FC", shortName: "EMP", color: "#0071CE", league: "Serie A", leagueFullName: "Serie A", country: "Italy", flag: "🇮🇹" },
  { id: "fiorentina", name: "ACF Fiorentina", shortName: "FIO", color: "#682A8D", league: "Serie A", leagueFullName: "Serie A", country: "Italy", flag: "🇮🇹" },
  { id: "genoa", name: "Genoa CFC", shortName: "GEN", color: "#D80018", league: "Serie A", leagueFullName: "Serie A", country: "Italy", flag: "🇮🇹" },
  { id: "inter", name: "Inter Milan", shortName: "INT", color: "#005CA9", league: "Serie A", leagueFullName: "Serie A", country: "Italy", flag: "🇮🇹" },
  { id: "juventus", name: "Juventus", shortName: "JUV", color: "#000000", league: "Serie A", leagueFullName: "Serie A", country: "Italy", flag: "🇮🇹" },
  { id: "lazio", name: "SS Lazio", shortName: "LAZ", color: "#A7C6ED", league: "Serie A", leagueFullName: "Serie A", country: "Italy", flag: "🇮🇹" },
  { id: "lecce", name: "US Lecce", shortName: "LEC", color: "#FFDD00", league: "Serie A", leagueFullName: "Serie A", country: "Italy", flag: "🇮🇹" },
  { id: "milan", name: "AC Milan", shortName: "ACM", color: "#FF0000", league: "Serie A", leagueFullName: "Serie A", country: "Italy", flag: "🇮🇹" },
  { id: "monza", name: "AC Monza", shortName: "MON", color: "#FF0033", league: "Serie A", leagueFullName: "Serie A", country: "Italy", flag: "🇮🇹" },
  { id: "napoli", name: "SSC Napoli", shortName: "NAP", color: "#0076BE", league: "Serie A", leagueFullName: "Serie A", country: "Italy", flag: "🇮🇹" },
  { id: "roma", name: "AS Roma", shortName: "ROM", color: "#8E1A1A", league: "Serie A", leagueFullName: "Serie A", country: "Italy", flag: "🇮🇹" },
  { id: "salernitana", name: "US Salernitana 1919", shortName: "SAL", color: "#800000", league: "Serie A", leagueFullName: "Serie A", country: "Italy", flag: "🇮🇹" },
  { id: "sampdoria", name: "UC Sampdoria", shortName: "SAM", color: "#005BAA", league: "Serie A", leagueFullName: "Serie A", country: "Italy", flag: "🇮🇹" },
  { id: "sassuolo", name: "US Sassuolo Calcio", shortName: "SAS", color: "#008A45", league: "Serie A", leagueFullName: "Serie A", country: "Italy", flag: "🇮🇹" },
  { id: "torino", name: "Torino FC", shortName: "TOR", color: "#8B1A1A", league: "Serie A", leagueFullName: "Serie A", country: "Italy", flag: "🇮🇹" },
  { id: "udinese", name: "Udinese Calcio", shortName: "UDI", color: "#000000", league: "Serie A", leagueFullName: "Serie A", country: "Italy", flag: "🇮🇹" },
  { id: "verona", name: "Hellas Verona FC", shortName: "VER", color: "#FFD100", league: "Serie A", leagueFullName: "Serie A", country: "Italy", flag: "🇮🇹" },

  //ispanya
  { id: "alaves", name: "Deportivo Alavés", shortName: "ALA", color: "#00529F", league: "Primera Division", leagueFullName: "Primera Division", country: "Spain", flag: "🇪🇸" },
  { id: "almeria", name: "UD Almería", shortName: "ALM", color: "#E30613", league: "Primera Division", leagueFullName: "Primera Division", country: "Spain", flag: "🇪🇸" },
  { id: "athletic", name: "Athletic Club", shortName: "ATH", color: "#EE2737", league: "Primera Division", leagueFullName: "Primera Division", country: "Spain", flag: "🇪🇸" },
  { id: "atletico", name: "Atlético Madrid", shortName: "ATM", color: "#D80920", league: "Primera Division", leagueFullName: "Primera Division", country: "Spain", flag: "🇪🇸" },
  { id: "barcelona", name: "FC Barcelona", shortName: "FCB", color: "#A50044", league: "Primera Division", leagueFullName: "Primera Division", country: "Spain", flag: "🇪🇸" },
  { id: "betis", name: "Real Betis", shortName: "BET", color: "#43B02A", league: "Primera Division", leagueFullName: "Primera Division", country: "Spain", flag: "🇪🇸" },
  { id: "cadiz", name: "Cádiz CF", shortName: "CAD", color: "#F7D708", league: "Primera Division", leagueFullName: "Primera Division", country: "Spain", flag: "🇪🇸" },
  { id: "celta", name: "Celta Vigo", shortName: "CEL", color: "#A7D3F5", league: "Primera Division", leagueFullName: "Primera Division", country: "Spain", flag: "🇪🇸" },
  { id: "getafe", name: "Getafe CF", shortName: "GET", color: "#003399", league: "Primera Division", leagueFullName: "Primera Division", country: "Spain", flag: "🇪🇸" },
  { id: "girona", name: "Girona FC", shortName: "GIR", color: "#E30613", league: "Primera Division", leagueFullName: "Primera Division", country: "Spain", flag: "🇪🇸" },
  { id: "granada", name: "Granada CF", shortName: "GRA", color: "#E30613", league: "Primera Division", leagueFullName: "Primera Division", country: "Spain", flag: "🇪🇸" },
  { id: "las-palmas", name: "UD Las Palmas", shortName: "LPA", color: "#FFDE00", league: "Primera Division", leagueFullName: "Primera Division", country: "Spain", flag: "🇪🇸" },
  { id: "mallorca", name: "RCD Mallorca", shortName: "MLL", color: "#D6001C", league: "Primera Division", leagueFullName: "Primera Division", country: "Spain", flag: "🇪🇸" },
  { id: "osasuna", name: "CA Osasuna", shortName: "OSA", color: "#D6001C", league: "Primera Division", leagueFullName: "Primera Division", country: "Spain", flag: "🇪🇸" },
  { id: "rayo", name: "Rayo Vallecano", shortName: "RAY", color: "#E30613", league: "Primera Division", leagueFullName: "Primera Division", country: "Spain", flag: "🇪🇸" },
  { id: "real-madrid", name: "Real Madrid", shortName: "RMA", color: "#FEBE10", league: "Primera Division", leagueFullName: "Primera Division", country: "Spain", flag: "🇪🇸" },
  { id: "real-sociedad", name: "Real Sociedad", shortName: "RSO", color: "#0056A7", league: "Primera Division", leagueFullName: "Primera Division", country: "Spain", flag: "🇪🇸" },
  { id: "sevilla", name: "Sevilla FC", shortName: "SEV", color: "#D1001C", league: "Primera Division", leagueFullName: "Primera Division", country: "Spain", flag: "🇪🇸" },
  { id: "valencia", name: "Valencia CF", shortName: "VAL", color: "#F9A01B", league: "Primera Division", leagueFullName: "Primera Division", country: "Spain", flag: "🇪🇸" },
  { id: "valladolid", name: "Real Valladolid", shortName: "VLL", color: "#660099", league: "Primera Division", leagueFullName: "Primera Division", country: "Spain", flag: "🇪🇸" },
  { id: "villarreal", name: "Villarreal CF", shortName: "VIL", color: "#FFF200", league: "Primera Division", leagueFullName: "Primera Division", country: "Spain", flag: "🇪🇸" },

  //ingiltere
  { id: "arsenal", name: "Arsenal", shortName: "ARS", color: "#EF0107", league: "Premier League", leagueFullName: "Premier League", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { id: "aston-villa", name: "Aston Villa", shortName: "AVL", color: "#95BFE5", league: "Premier League", leagueFullName: "Premier League", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { id: "bournemouth", name: "AFC Bournemouth", shortName: "BOU", color: "#DA020E", league: "Premier League", leagueFullName: "Premier League", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { id: "brentford", name: "Brentford", shortName: "BRE", color: "#e30613", league: "Premier League", leagueFullName: "Premier League", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { id: "brighton", name: "Brighton & Hove Albion", shortName: "BHA", color: "#0057B7", league: "Premier League", leagueFullName: "Premier League", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { id: "burnley", name: "Burnley", shortName: "BUR", color: "#6C1D45", league: "Premier League", leagueFullName: "Premier League", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { id: "chelsea", name: "Chelsea", shortName: "CHE", color: "#034694", league: "Premier League", leagueFullName: "Premier League", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { id: "crystal-palace", name: "Crystal Palace", shortName: "CRY", color: "#1B458F", league: "Premier League", leagueFullName: "Premier League", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { id: "everton", name: "Everton", shortName: "EVE", color: "#003399", league: "Premier League", leagueFullName: "Premier League", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { id: "fulham", name: "Fulham", shortName: "FUL", color: "#CC0000", league: "Premier League", leagueFullName: "Premier League", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { id: "leeds", name: "Leeds United", shortName: "LEE", color: "#FFCD00", league: "Premier League", leagueFullName: "Premier League", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { id: "liverpool", name: "Liverpool", shortName: "LIV", color: "#C8102E", league: "Premier League", leagueFullName: "Premier League", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { id: "manchester-city", name: "Manchester City", shortName: "MCI", color: "#6CABDD", league: "Premier League", leagueFullName: "Premier League", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { id: "manchester-united", name: "Manchester United", shortName: "MUN", color: "#FFF200", league: "Premier League", leagueFullName: "Premier League", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { id: "newcastle-united", name: "Newcastle United", shortName: "NEW", color: "#241F20", league: "Premier League", leagueFullName: "Premier League", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { id: "nottingham-forest", name: "Nottingham Forest", shortName: "NFO", color: "#DD0000", league: "Premier League", leagueFullName: "Premier League", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { id: "sunderland", name: "Sunderland", shortName: "SUN", color: "#EB172B", league: "Premier League", leagueFullName: "Premier League", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { id: "tottenham", name: "Tottenham Hotspur", shortName: "TOT", color: "#132257", league: "Premier League", leagueFullName: "Premier League", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { id: "west-ham", name: "West Ham United", shortName: "WHU", color: "#7A263A", league: "Premier League", leagueFullName: "Premier League", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { id: "wolverhampton", name: "Wolverhampton Wanderers", shortName: "WOL", color: "#FDB913", league: "Premier League", leagueFullName: "Premier League", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },

  //almanya
  { id: "union-berlin", name: "1. FC Union Berlin", shortName: "FCU", color: "#E3000F", league: "Bundesliga", leagueFullName: "Bundesliga", country: "Germany", flag: "🇩🇪" },
  { id: "mainz-05", name: "1. FSV Mainz 05", shortName: "M05", color: "#C4122E", league: "Bundesliga", leagueFullName: "Bundesliga", country: "Germany", flag: "🇩🇪" },
  { id: "fc-koln", name: "1. FC Köln", shortName: "KOE", color: "#ED1C24", league: "Bundesliga", leagueFullName: "Bundesliga", country: "Germany", flag: "🇩🇪" },
  { id: "bayer-leverkusen", name: "Bayer 04 Leverkusen", shortName: "B04", color: "#E32221", league: "Bundesliga", leagueFullName: "Bundesliga", country: "Germany", flag: "🇩🇪" },
  { id: "borussia-dortmund", name: "Borussia Dortmund", shortName: "BVB", color: "#FDE100", league: "Bundesliga", leagueFullName: "Bundesliga", country: "Germany", flag: "🇩🇪" },
  { id: "borussia-monchengladbach", name: "Borussia Mönchengladbach", shortName: "BMG", color: "#00B04F", league: "Bundesliga", leagueFullName: "Bundesliga", country: "Germany", flag: "🇩🇪" },
  { id: "eintracht-frankfurt", name: "Eintracht Frankfurt", shortName: "SGE", color: "#E1000F", league: "Bundesliga", leagueFullName: "Bundesliga", country: "Germany", flag: "🇩🇪" },
  { id: "fc-augsburg", name: "FC Augsburg", shortName: "FCA", color: "#BA3733", league: "Bundesliga", leagueFullName: "Bundesliga", country: "Germany", flag: "🇩🇪" },
  { id: "bayern-munich", name: "FC Bayern München", shortName: "FCB", color: "#DC052D", league: "Bundesliga", leagueFullName: "Bundesliga", country: "Germany", flag: "🇩🇪" },
  { id: "fc-heidenheim", name: "1. FC Heidenheim 1846", shortName: "FCH", color: "#E32221", league: "Bundesliga", leagueFullName: "Bundesliga", country: "Germany", flag: "🇩🇪" },
  { id: "fc-st-pauli", name: "FC St. Pauli", shortName: "STP", color: "#8B4513", league: "Bundesliga", leagueFullName: "Bundesliga", country: "Germany", flag: "🇩🇪" },
  { id: "hamburger-sv", name: "Hamburger SV", shortName: "HSV", color: "#003087", league: "Bundesliga", leagueFullName: "Bundesliga", country: "Germany", flag: "🇩🇪" },
  { id: "rb-leipzig", name: "RB Leipzig", shortName: "RBL", color: "#DD0741", league: "Bundesliga", leagueFullName: "Bundesliga", country: "Germany", flag: "🇩🇪" },
  { id: "sc-freiburg", name: "SC Freiburg", shortName: "SCF", color: "#e34f33", league: "Bundesliga", leagueFullName: "Bundesliga", country: "Germany", flag: "🇩🇪" },
  { id: "werder-bremen", name: "SV Werder Bremen", shortName: "SVW", color: "#009639", league: "Bundesliga", leagueFullName: "Bundesliga", country: "Germany", flag: "🇩🇪" },
  { id: "tsg-hoffenheim", name: "TSG 1899 Hoffenheim", shortName: "TSG", color: "#1861AC", league: "Bundesliga", leagueFullName: "Bundesliga", country: "Germany", flag: "🇩🇪" },
  { id: "vfb-stuttgart", name: "VfB Stuttgart", shortName: "VFB", color: "#ED1C24", league: "Bundesliga", leagueFullName: "Bundesliga", country: "Germany", flag: "🇩🇪" },
  { id: "vfl-wolfsburg", name: "VfL Wolfsburg", shortName: "WOB", color: "#65B32E", league: "Bundesliga", leagueFullName: "Bundesliga", country: "Germany", flag: "🇩🇪" },
];

export const PREMIER_LEAGUE_TEAMS = ALL_TEAMS.filter(team => team.league === 'Premier League');
export const BUNDESLIGA_TEAMS = ALL_TEAMS.filter(team => team.league === 'Bundesliga');
export const LIGUE1_TEAMS = ALL_TEAMS.filter(team => team.league === 'Ligue 1');
export const SERIEA_TEAMS = ALL_TEAMS.filter(team => team.league === 'Serie A');
export const PRIMERADIVISION_TEAMS = ALL_TEAMS.filter(team => team.league === 'Primera Division');

export async function getFollowedTeams(): Promise<string[]> {
  const { supabase } = await import("./supabase");
  const { data: userData, error: userError } = await supabase.auth.getUser();
  const userId = userData?.user?.id;
  if (!userId) return [];
  const { data, error } = await supabase
    .from('user_teams')
    .select('teams')
    .eq('user_id', userId)
    .maybeSingle();
  if (error || !data) return [];
  return Array.isArray(data.teams) ? data.teams : [];
}

export async function setFollowedTeams(teamIds: string[]): Promise<void> {
  const { supabase } = await import("./supabase");
  const { data: userData, error: userError } = await supabase.auth.getUser();
  const userId = userData?.user?.id;
  if (!userId) return;
  await supabase
    .from('user_teams')
    .upsert({ user_id: userId, teams: teamIds }, { onConflict: 'user_id' });
}

export function getTeamsByLeague(leagueId: string): Team[] {
  const leagueApiCode = LEAGUES.find(l => l.id === leagueId)?.apiCode;
  switch (leagueApiCode) {
    case 'PL':
      return PREMIER_LEAGUE_TEAMS;
    case 'BL1':
      return BUNDESLIGA_TEAMS;
    case 'FL1':
      return LIGUE1_TEAMS;
    case 'SA':
      return SERIEA_TEAMS;
    case 'PD':
      return PRIMERADIVISION_TEAMS;
    default:
      return [];
  }
}

export async function fetchLeagueMatches(leagueCode: string): Promise<FootballDataMatch[]> {
  try {
    const response = await fetch(`${BASE_URL}/competitions/${leagueCode}/matches?status=SCHEDULED`, {
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
    console.error(`Error fetching ${leagueCode} matches:`, error);
    return [];
  }
}

export async function fetchAllLeaguesMatches(): Promise<FootballDataMatch[]> {
  try {
    const allMatches = await Promise.allSettled(
      LEAGUES.map(league => fetchLeagueMatches(league.apiCode))
    );

    const successfulMatches = allMatches
      .filter((result): result is PromiseFulfilledResult<FootballDataMatch[]> => 
        result.status === 'fulfilled'
      )
      .flatMap(result => result.value);

    const sortedMatches = successfulMatches.sort(
      (a, b) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime()
    );

    if (sortedMatches.length > 0) {
      const bundesligaMatches = sortedMatches.filter(m => m.competition.code === 'BL1');
      if (bundesligaMatches.length > 0) {
        bundesligaMatches.slice(0, 3).forEach(match => {
        });
      }
    }
    
    return sortedMatches;
  } catch (error) {
    console.error('Error fetching all leagues matches:', error);
    return [];
  }
}

export function getNextMatchForTeams(matches: FootballDataMatch[], teamNames: string[]): FootballDataMatch | null {
  const upcomingMatches = getUpcomingMatchesForTeams(matches, teamNames);
  return upcomingMatches[0] || null;
}

export function getUpcomingMatchesForTeams(matches: FootballDataMatch[], teamNames: string[], limit: number = 5): FootballDataMatch[] {
  const now = new Date();

  const normalizeTeamName = (name: string) => 
    name.toLowerCase()
      .replace(/fc /g, '')
      .replace(/afc /g, '')
      .replace(/ fc$/g, '')
      .replace(/sv /g, '')
      .replace(/vfl /g, '')
      .replace(/vfb /g, '')
      .replace(/rb /g, '')
      .replace(/bayer 04 /g, 'bayer ')
      .replace(/borussia /g, '')
      .replace(/eintracht /g, '')
      .replace(/united/g, '')
      .replace(/city/g, '')
      .replace(/münchen/g, 'munich')
      .replace(/mönchengladbach/g, 'gladbach')
      .replace(/&/g, 'and')
      .replace(/\s+/g, ' ')
      .trim();

  const teamMappings: { [key: string]: string[] } = {
    'leeds': ['leeds', 'united', 'lufc', 'lee'],
    'sunderland': ['sunderland', 'safc', 'sun'],
    'burnley': ['burnley', 'bur', 'clarets'],
    'bayern-munich': ['bayern', 'munich', 'fcb'],
    'borussia-dortmund': ['dortmund', 'bvb'],
    'rb-leipzig': ['leipzig', 'rbl'],
    'bayer-leverkusen': ['leverkusen', 'bayer'],
    'borussia-monchengladbach': ['gladbach', 'bmg', 'mönchengladbach'],
    'eintracht-frankfurt': ['frankfurt', 'sge'],
    'vfb-stuttgart': ['stuttgart', 'vfb'],
    'werder-bremen': ['bremen', 'werder', 'svw'],
    'vfl-wolfsburg': ['wolfsburg', 'vfl', 'wob'],
    'fc-augsburg': ['augsburg', 'fca'],
    'mainz-05': ['mainz', 'm05', 'fsv'],
    'union-berlin': ['union', 'berlin', 'fcu'],
    'sc-freiburg': ['freiburg', 'scf', 'sc'],
    'tsg-hoffenheim': ['hoffenheim', 'tsg', '1899'],
    'fc-koln': ['köln', 'koln', 'cologne', 'koe'],
    'fc-heidenheim': ['heidenheim', 'fch', '1846'],
    'fc-st-pauli': ['st. pauli', 'pauli', 'stp'],
    'hamburger-sv': ['hamburg', 'hsv', 'hamburger']
  };
  
  const upcomingMatches = matches
    .filter(match => {
      const matchDate = new Date(match.utcDate);
      const homeTeamMatches = teamNames.some(teamId => {
        if (match.homeTeam.tla && match.homeTeam.tla.toLowerCase() === teamId.toLowerCase()) return true;
        const normalizedHome = normalizeTeamName(match.homeTeam.name);
        const normalizedHomeShort = normalizeTeamName(match.homeTeam.shortName);
        const mappingMatch = teamMappings[teamId] && teamMappings[teamId].some(alias =>
          normalizedHome === alias || normalizedHomeShort === alias
        );
        return !!mappingMatch;
      });

      const awayTeamMatches = teamNames.some(teamId => {
        if (match.awayTeam.tla && match.awayTeam.tla.toLowerCase() === teamId.toLowerCase()) return true;
        const normalizedAway = normalizeTeamName(match.awayTeam.name);
        const normalizedAwayShort = normalizeTeamName(match.awayTeam.shortName);
        const mappingMatch = teamMappings[teamId] && teamMappings[teamId].some(alias =>
          normalizedAway === alias || normalizedAwayShort === alias
        );
        return !!mappingMatch;
      });

      return matchDate > now && (homeTeamMatches || awayTeamMatches) &&
             (match.status === 'TIMED' || match.status === 'SCHEDULED');
    })
    .sort((a, b) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime())
    .slice(0, limit);

  return upcomingMatches;
}

export function getLeagueBadgeForMatch(match: FootballDataMatch): { name: string; flag: string; color: string } {
  const league = LEAGUES.find(l => l.apiCode === match.competition.code);
  if (league) {
    const leagueColors: { [key: string]: string } = {
      'PL': '#3C1053',
      'BL1': '#D20515'
    };
    
    return {
      name: league.name,
      flag: league.flag,
      color: leagueColors[league.apiCode] || '#666'
    };
  }

  return {
    name: match.competition.name,
    flag: '⚽',
    color: '#666'
  };
}
