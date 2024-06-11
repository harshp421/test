'use client';
import ContentData from '@/components/shared/ContentData';
import Error from '@/components/shared/Error';
import Loader from '@/components/shared/Loader';
import { useDataState } from '@/context/dataContext';
import { useOptions } from '@/context/optionContext';
import { API_URL, getFieldValueForChapter } from '@/utils/constant';
import { ArrowLeft, Scale } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const SinglePage = () => {

  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const params = useParams();
  const id=params.id as string;
  const router=useRouter();
  const { selectedSearchOption } = useOptions()
  const {setGetJudgements}=useDataState();


  const fetchPost = async (id: string) => {
    setIsLoading(true);
    try {
      const url = `${API_URL}/database/rows/table/${selectedSearchOption.id}/${id}/?user_field_names=true`;
      const resp = await fetch(url, {
        headers: {
          Authorization: `Token d9guJA1em35vOcs3y3ibAYPkaZs8HIJL`,
        },
      });

      if (resp.status === 200) {
        const response = await resp.json();
        setPost(response);
        setError(null);
      } else {
        const errorText = await resp.text();
        setError(errorText);
      }
    } catch (e) {
      setError('Failed to fetch post');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (id) {
      fetchPost(id);
    }
  }, [id]);


//console.log(selectedSearchOption  )
const chapterName=selectedSearchOption.value==='IPC_BNS'?'IPC_Chapter':selectedSearchOption.value==='IEA_BSA'?'IEA_Chapter':'CRPC_Chapter'
  return (
    <div className="bg-slate-100 min-h-screen">
      <div className='sticky w-full top-0 z-50'>
        <div className="w-full h-[8vh]  flex bg-white mt-[3px]  p-5 rounded-b-lg justify-between  ">
          <div className="flex items-center " onClick={() => router.back()}>
            <ArrowLeft className='custome' />  
            <Scale className="custome pl-2"/>
            <h2 className="custome uppercase text-2xl text-center font-bold mx-1 lg:mx-4 lg:text-3xl ">
              Law <span className="font-normal">Finder</span>
            </h2>
          </div>
        </div>
      </div>

      {
        isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <Loader />
          </div>
        ) : error ? <Error error={error} /> :
          post && (
            <>
              <div className='sticky w-full top-[8vh] z-50'>
                <div className=" w-full flex justify-center items-center h-[6vh] lg:h-[8vh] bg-white mb-2">
                  <h2 className="text-xl lg:text-3xl font-bold">
                    {getFieldValueForChapter(post[chapterName])}
                  </h2>
                </div>
              </div>
       
              <ContentData
                data={post}
                isLoading={isLoading}
                error={error}
                selectedOption={selectedSearchOption}
                setGetJudgements={setGetJudgements}
              />

            </>
          )

      }


    </div>
  );
};

export default SinglePage;
