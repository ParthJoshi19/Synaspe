import { createContext, useContext, useState, ReactNode } from 'react';

interface QueryResultData {
  id: string;
  queryId: string;
  modality: string;
  content: string;
  confidenceScore: number;
  quantumEntanglement: number;
}

interface ResultsContextType {
  results: QueryResultData[];
  setResults: (results: QueryResultData[]) => void;
}

const ResultsContext = createContext<ResultsContextType | undefined>(undefined);

export function ResultsProvider({ children }: { children: ReactNode }) {
  const [results, setResults] = useState<QueryResultData[]>([]);

  return (
    <ResultsContext.Provider value={{ results, setResults }}>
      {children}
    </ResultsContext.Provider>
  );
}

export function useResults() {
  const context = useContext(ResultsContext);
  if (context === undefined) {
    throw new Error('useResults must be used within a ResultsProvider');
  }
  return context;
}
