'use client'
import NextPrevbutton from "@/components/home/NextPrevbutton";
import OptionSelectable from "@/components/home/OptionSelectable";
import ContentData from "@/components/shared/ContentData";
import Header from "@/components/shared/Header";
import { useDataState } from "@/context/dataContext";
import { useOptions } from "@/context/optionContext";
import { API_URL } from "@/utils/constant";
import { useEffect, useState } from "react";


export default function Home() {


  const { selectedOption } = useOptions();
  const {
    setData,
    setDataLoading,
    setError,
    setNextUrl,
    setPrevUrl,
    pageNum,
    setTotalRecords,
    data,
    dataLoading,
    error,
    setPageNum,
    nextUrl,
    setGetJudgements,
    currentIndex,
    setCurrentIndex
  } = useDataState();

  // const [currentIndex, setCurrentIndex] = useState(+cIndex);
  const getDataBsedOnTableNameChange = async () => {
    let retryCount: number = 0;
    const maxRetries = 5;

    const exponentialBackoff = async (retryCount: number) => {
      const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
      console.log(`Rate limit hit, retrying after ${delay}ms...`);
      return new Promise(resolve => setTimeout(resolve, delay));
    };

    setDataLoading(true);
    while (retryCount < maxRetries) {
      try {
        const url = `${API_URL}/database/rows/table/${selectedOption.id}/?user_field_names=true&page=${pageNum}&size=10`;
        const resp = await fetch(url, {
          headers: {
            Authorization: `Token d9guJA1em35vOcs3y3ibAYPkaZs8HIJL`,
          },
        });

        if (resp.status === 200) {
          const response = await resp.json();
          setData(response.results);
          setError(null);
          setNextUrl(response.next);
          setPrevUrl(response.previous);
          setTotalRecords(response.count);
          break;
        } else {
          const errorText = await resp.text();
          const error = JSON.parse(errorText);
          console.log('error', error);

          if (error.error === 'RATE_LIMIT_EXCEEDED') {
            if (retryCount < maxRetries - 1) { // retryCount should be less than maxRetries - 1 to allow the last retry
              retryCount++;
              await exponentialBackoff(retryCount);
            } else {
              setError('Max retry limit reached. ' + error.error);

              break;
            }
          } else {
            setError(error.error || 'Unknown error occurred.');

            break;
          }
        }
      } catch (e) {
        setError((e as Error).message + ' Please Check Your Internet Connection');

        break;
      }
    }
    setDataLoading(false);
  };

  useEffect(() => {

    if (selectedOption) {
      setData([]);
      setNextUrl(null);
      setPrevUrl(null);
      getDataBsedOnTableNameChange();
    }

  }, [selectedOption]);

  useEffect(() => {
    getDataBsedOnTableNameChange();
  }
    , [pageNum]);

  const changeCurrentIndex = (types: 'up' | 'down') => {

    if (types === 'up' && currentIndex < data.length) {
      setCurrentIndex((currentIndex: number) => currentIndex + 1);
      
      if (currentIndex === data.length - 1 && nextUrl) {
        if (nextUrl != null)
          setPageNum(prevPage => prevPage + 1)
          setCurrentIndex(0)
      }
    }
    if (types === 'down' && currentIndex != -1) {
      setCurrentIndex((currentIndex: number) => currentIndex - 1);
      if (currentIndex === 0) {
        setPageNum(prevPage => prevPage - 1)
        setCurrentIndex(data.length - 1)
      }
    }
  };
  return (
    <main className="flex  flex-col items-center justify-between ">
      <div className="sticky w-full top-0 z-50 ">
        <Header />
        <NextPrevbutton
          changeIndex={changeCurrentIndex}
          data={data[currentIndex]}
          currentIndex={currentIndex}
          pageNum={pageNum}
          totalData={data}
          selectedOption={selectedOption}
        />
      </div>
      <OptionSelectable />

      <ContentData
        data={data[currentIndex]}
        isLoading={dataLoading}
        error={error}
        selectedOption={selectedOption}
        setGetJudgements={setGetJudgements}
      />

    </main>
  );
}
