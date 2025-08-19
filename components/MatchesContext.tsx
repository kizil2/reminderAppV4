import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchAllLeaguesMatches, FootballDataMatch } from "../lib/leagues";

interface MatchesContextType {
  matches: FootballDataMatch[];
  loading: boolean;
  refresh: () => Promise<void>;
}

const MatchesContext = createContext<MatchesContextType>({
  matches: [],
  loading: true,
  refresh: async () => {},
});

export const MatchesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [matches, setMatches] = useState<FootballDataMatch[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMatches = async () => {
    setLoading(true);
    try {
      const data = await fetchAllLeaguesMatches();
      setMatches(data);
    } catch (e) {
      setMatches([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMatches();
  }, []);

  return (
    <MatchesContext.Provider value={{ matches, loading, refresh: loadMatches }}>
      {children}
    </MatchesContext.Provider>
  );
};

export const useMatches = () => useContext(MatchesContext);
