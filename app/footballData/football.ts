export interface Team {
  id: string;
  name: string;
  shortName: string;
  color: string;
}

export interface Match {
  id: string;
  homeTeam: string; 
  awayTeam: string; 
  date: string; 
  venue: string;
  week: number;
}

export const SUPER_LIG_TEAMS: Team[] = [
{ id: "gs", name: "Galatasaray", shortName: "GS", color: "#FDB913" },
{ id: "fb", name: "Fenerbahçe", shortName: "FB", color: "#0C1C4A" },
{ id: "bjk", name: "Beşiktaş", shortName: "BJK", color: "#000000" },
{ id: "ts", name: "Trabzonspor", shortName: "TS", color: "#781214" },
{ id: "adana", name: "Adana Demirspor", shortName: "ADS", color: "#1E90FF" },
{ id: "alanya", name: "Alanyaspor", shortName: "ALA", color: "#FF6600" },
{ id: "ankara", name: "MKE Ankaragücü", shortName: "ANK", color: "#FFD700" },
{ id: "antalya", name: "Antalyaspor", shortName: "ANT", color: "#E32636" },
{ id: "basak", name: "Başakşehir", shortName: "IBFK", color: "#15316B" },
{ id: "gaziantep", name: "Gaziantep FK", shortName: "GFK", color: "#D50032" },
{ id: "hatay", name: "Hatayspor", shortName: "HAT", color: "#800000" },
{ id: "istanbulspor", name: "İstanbulspor", shortName: "IST", color: "#FFD700" },
{ id: "kasimpasa", name: "Kasımpaşa", shortName: "KAS", color: "#003399" },
{ id: "kayseri", name: "Kayserispor", shortName: "KAY", color: "#FFCC00" },
{ id: "konyaspor", name: "Konyaspor", shortName: "KON", color: "#006A44" },
{ id: "rizespor", name: "Çaykur Rizespor", shortName: "RIZ", color: "#008000" },
{ id: "samsun", name: "Samsunspor", shortName: "SAM", color: "#FF0000" },
{ id: "sivasspor", name: "Sivasspor", shortName: "SIV", color: "#FF0000" },
{ id: "karagumruk", name: "Fatih Karagümrük", shortName: "FKS", color: "#E41B17" },
{ id: "kocaeli", name: "Kocaelispor", shortName: "KOC", color: "#006400" }
];

//gerçek bilgiyle güncellenicek (google api?)
import fixtures from './fixtures.json';
export const SUPER_LIG_FIXTURES: Match[] = fixtures;

export const FOLLOWED_TEAMS_KEY = "followed_teams";

import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getFollowedTeams(): Promise<string[]> {
  const data = await AsyncStorage.getItem(FOLLOWED_TEAMS_KEY);
  return data ? JSON.parse(data) : [];
}

export async function setFollowedTeams(teamIds: string[]): Promise<void> {
  await AsyncStorage.setItem(FOLLOWED_TEAMS_KEY, JSON.stringify(teamIds));
}
