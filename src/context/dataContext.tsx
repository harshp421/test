// 'use client';
// import React, { createContext, useContext, useEffect, useState } from 'react';

// interface DataContextType {
//     data: any[];
//     setData: any;
//     dataLoading: boolean;
//     setDataLoading: (dataLoading: boolean) => void;
//     error: string | null;
//     setError: (error: string | null) => void;
//     isDataFetching: boolean; // New state
//     setIsDataFetching: any; // New state
//     nextUrl: string | null;
//     setNextUrl: (nextUrl: string | null) => void;
//     prevUrl: string | null;
//     setPrevUrl: (prevUrl: string | null) => void;
//     pageNum: number;
//     setPageNum: React.Dispatch<React.SetStateAction<number>>;
//     totalRecords: number;
//     setTotalRecords: React.Dispatch<React.SetStateAction<number>>;
//     getJudgements: boolean;
//     setGetJudgements: React.Dispatch<React.SetStateAction<boolean>>;
//     rssOption: RssOption;
//     setRssOption: React.Dispatch<React.SetStateAction<RssOption>>;
// }

// type RssOption = {
//     value: string;
//     label: string;
// }

// const DataContext = createContext<DataContextType | undefined>(undefined);
// export const rssOprion: RssOption[] = [
//     { value: 'mostrecent', label: 'Most Resent' },
//     { value: 'leastrecent', label: 'least Resent' },
// ]

// export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     const [data, setData] = useState<any[]>([]);
  
//     const [dataLoading, setDataLoading] = useState(true);
//     const [error, setError] = useState<null | string>(null);
//     const [nextUrl, setNextUrl] = useState<string | null>(null);
//     const [prevUrl, setPrevUrl] = useState<string | null>(null);
//     const [isDataFetching, setIsDataFetching] = useState(true); // New state
//     const [pageNum, setPageNum] = useState(1);
//     const [totalRecords, setTotalRecords] = useState(0);
//     const [getJudgements, setGetJudgements] = useState<boolean>(false);
//     const [rssOption, setRssOption] = useState<RssOption>(rssOprion[0]);

//     useEffect(() => {
//         const storedPage = localStorage.getItem('currentPage');
//         console.log(storedPage,"currentPage");
//         if (storedPage) {
//             setPageNum(JSON.parse(storedPage));
//         }

//         const storedRssOption = localStorage.getItem('rssOption');
//         if (storedRssOption) {
//             setRssOption(JSON.parse(storedRssOption));
//         }

//         // const storedIndex = localStorage.getItem('currentIndex');
//         // if (storedIndex) {
//         //     setCurrentIndex(JSON.parse(storedIndex));
//         // }


//     }, []); // Empty dependency array means this effect runs once on mount


//     useEffect(() => {
//         localStorage.setItem('rssOption', JSON.stringify(rssOption))
//     }, [rssOption])
//     useEffect(() => {
//         localStorage.setItem('currentPage', JSON.stringify(pageNum));
//     }
//         , [pageNum]);

//    // useEffect(() => {
//     //     localStorage.setItem('currentIndex', JSON.stringify(currentIndex));
//     // }
//     //     , [currentIndex]);

//     return (
//         <DataContext.Provider value={{
//             data,
//             setData,
//             dataLoading,
//             setDataLoading,
//             error,
//             setError,
//             isDataFetching,
//             setIsDataFetching,
//             nextUrl,
//             setNextUrl,
//             prevUrl,
//             setPrevUrl,
//             pageNum,
//             setPageNum,
//             setTotalRecords,
//             totalRecords,
//             getJudgements,
//             setGetJudgements,
//             rssOption,
//             setRssOption
//         }}>
//             {children}
//         </DataContext.Provider>
//     );
// };

// export const useDataState = () => {
//     const context = useContext(DataContext);
//     if (!context) {
//         throw new Error('useDataState must be used within a DataProvider');
//     }
//     return context;
// };


// context/dataContext.tsx

'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface DataContextType {
  data: any[];
  setData: (data: any[]) => void;
  dataLoading: boolean;
  setDataLoading: (dataLoading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  nextUrl: string | null;
  setNextUrl: (nextUrl: string | null) => void;
  prevUrl: string | null;
  setPrevUrl: (prevUrl: string | null) => void;
  pageNum: number;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
  totalRecords: number;
  setTotalRecords: React.Dispatch<React.SetStateAction<number>>;
  getJudgements: boolean;
  setGetJudgements: React.Dispatch<React.SetStateAction<boolean>>;
  rssOption: RssOption;
  setRssOption: React.Dispatch<React.SetStateAction<RssOption>>;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  selectedOption: Option | null;
  setSelectedOption: React.Dispatch<React.SetStateAction<Option | null>>;
}

type Option = {
  value: string;
  label: string;
};

type RssOption = {
  value: string;
  label: string;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const rssOprion: RssOption[] = [
  { value: 'mostrecent', label: 'Most Recent' },
  { value: 'leastrecent', label: 'Least Recent' },
];

const getInitialState = <T, >(key: string, fallbackValue: T): T => {
  if (typeof window !== 'undefined') {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : fallbackValue;
  }
  return fallbackValue;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);
  const [pageNum, setPageNum] = useState(getInitialState('currentPage', 1));
  const [totalRecords, setTotalRecords] = useState(0);
  const [getJudgements, setGetJudgements] = useState<boolean>(false);
  const [rssOption, setRssOption] = useState<RssOption>(getInitialState('rssOption', rssOprion[0]));
  const [currentIndex, setCurrentIndex] = useState(getInitialState('currentIndex', 0));
  const [selectedOption, setSelectedOption] = useState<Option | null>(getInitialState('selectedOption', null));

  useEffect(() => {
    localStorage.setItem('currentPage', JSON.stringify(pageNum));
  }, [pageNum]);

  useEffect(() => {
    localStorage.setItem('rssOption', JSON.stringify(rssOption));
  }, [rssOption]);

  useEffect(() => {
    localStorage.setItem('currentIndex', JSON.stringify(currentIndex));
  }, [currentIndex]);

  useEffect(() => {
    if (selectedOption) {
      localStorage.setItem('selectedOption', JSON.stringify(selectedOption));
    }
  }, [selectedOption]);

  return (
    <DataContext.Provider value={{
      data,
      setData,
      dataLoading,
      setDataLoading,
      error,
      setError,
      nextUrl,
      setNextUrl,
      prevUrl,
      setPrevUrl,
      pageNum,
      setPageNum,
      totalRecords,
      setTotalRecords,
      getJudgements,
      setGetJudgements,
      rssOption,
      setRssOption,
      currentIndex,
      setCurrentIndex,
      selectedOption,
      setSelectedOption,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataState = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataState must be used within a DataProvider');
  }
  return context;
};
