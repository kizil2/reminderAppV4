const fs = require('fs');
const https = require('https');

const API_TOKEN = 'dec393bb934e4e86841a95715728ca8f';
const BASE_URL = 'https://api.football-data.org/v4';
const PREMIER_LEAGUE_ID = 'PL';

// Helper function to make HTTP requests
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'X-Auth-Token': API_TOKEN,
      },
    };

    https.get(url, options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

async function fetchPremierLeagueData() {
  try {
    
    const competitionData = await makeRequest(`${BASE_URL}/competitions/${PREMIER_LEAGUE_ID}`);

    const teamsData = await makeRequest(`${BASE_URL}/competitions/${PREMIER_LEAGUE_ID}/teams`);

    const allMatchesData = await makeRequest(`${BASE_URL}/competitions/${PREMIER_LEAGUE_ID}/matches`);

    const upcomingMatchesData = await makeRequest(`${BASE_URL}/competitions/${PREMIER_LEAGUE_ID}/matches?status=SCHEDULED`);

    const standingsData = await makeRequest(`${BASE_URL}/competitions/${PREMIER_LEAGUE_ID}/standings`);

    const plData = {
      fetchedAt: new Date().toISOString(),
      season: competitionData.currentSeason,
      competition: {
        id: competitionData.id,
        name: competitionData.name,
        code: competitionData.code,
        type: competitionData.type,
        emblem: competitionData.emblem
      },
      teams: teamsData.teams.map(team => ({
        id: team.id,
        name: team.name,
        shortName: team.shortName,
        tla: team.tla,
        crest: team.crest,
        address: team.address,
        website: team.website,
        founded: team.founded,
        clubColors: team.clubColors,
        venue: team.venue
      })),
      allMatches: {
        count: allMatchesData.count,
        matches: allMatchesData.matches
      },
      upcomingMatches: {
        count: upcomingMatchesData.count,
        matches: upcomingMatchesData.matches
      },
      standings: standingsData.standings
    };

    const outputPath = '../lib/premierLeagueData.json';
    fs.writeFileSync(outputPath, JSON.stringify(plData, null, 2));

    const simplifiedData = {
      fetchedAt: plData.fetchedAt,
      teams: plData.teams.map(team => ({
        id: team.id,
        name: team.name,
        shortName: team.shortName,
        tla: team.tla
      })),
      upcomingMatches: plData.upcomingMatches.matches.slice(0, 10).map(match => ({
        id: match.id,
        homeTeam: match.homeTeam.name,
        awayTeam: match.awayTeam.name,
        date: match.utcDate,
        status: match.status,
        matchday: match.matchday
      }))
    };
    
    fs.writeFileSync('../lib/premierLeagueSimple.json', JSON.stringify(simplifiedData, null, 2));
    console.log('✅ Simplified data also saved to premierLeagueSimple.json');
    
  } catch (error) {
    console.error('❌ Error fetching data:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

fetchPremierLeagueData();
