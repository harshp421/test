// 'use client'
// import { Suspense, useEffect, useState } from 'react';
// import { ArrowLeft, Menu, Scale } from 'lucide-react';
// import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
// import { Button } from '@/components/ui/button';
// import { useSearchParams } from 'next/navigation';
// import { rssOprion, useDataState } from '@/context/dataContext';
// import { options, useOptions } from '@/context/optionContext';
// import { API_URL } from '@/utils/constant';
// import Link from 'next/link';
// import SearchBar from '@/components/shared/SearchBar';
// import Loader from '@/components/shared/Loader';
// import Error from '@/components/shared/Error';
// import SearchResultList from '@/components/shared/SearchResultList';
// import { Switch } from '@/components/ui/switch';



// const SearchPage = () => {
//   const searchParams = useSearchParams();
//   const { getJudgements, setGetJudgements, rssOption, setRssOption } = useDataState();
//   const query = searchParams.get('q');


//   const [results, setResults] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<null | string>(null);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [nextUrl, setNextUrl] = useState<string | null>(null);
//   const [isLoadingMore, setIsLoadingMore] = useState(false);

//   const { selectedSearchOption, setSelectedSearchOption } = useOptions();
//   const handleClose = () => {
//     setDrawerOpen(false);
//   };
//   const [rssItems, setRssItems] = useState<any>([]);
//   const [rssError, setRssError] = useState<null | string>(null);
//   const [isRssLoading, setIsRssLoading] = useState(false);
//   const [rssresponce, setRssResponce] = useState<any>([]);



//   const fetchRSSFeed = async (query: string ) => {
//     setIsRssLoading(true);
//     try {
//       const feedUrl = `/api/rss?search=${query} &q=${getJudgements} &sort=${rssOption.value}`;
//     // const feedUrl= `https://indiankanoon.org/feeds/search/section 1  doctypes:  sortby:mostrecent  /`
//      const response = await fetch(feedUrl);
//       const data = await response.json();
//       const feed=await data.data;
//       console.log(feed, "text")
//       setRssResponce(feed.rss.channel[0])
//       setRssItems(feed.rss.channel[0].item);
//       setRssError(null);
//     } catch (e) {
//       console.log(e, "error");
//       setRssError('Failed to fetch RSS feed');
//     }
//     setIsRssLoading(false);
//   };

//   const fetchSearchResults = async (query: string, url?: string) => {
//     if (url) {
//       setIsLoadingMore(true);
//     } else {
//       setIsLoading(true);
//       setNextUrl(null);
//     }

//     //  const filterFormula = generateFilterFormula(selectedSearchOption.value, query);
//     try {
//       const apiUrl = url || `${API_URL}/database/rows/table/${selectedSearchOption.id}/?user_field_names=true&search=${query}&size=20`;
//       const resp = await fetch(apiUrl, {
//         headers: {
//           Authorization: `Token d9guJA1em35vOcs3y3ibAYPkaZs8HIJL`, // Replace with your Baserow API key
//         },
//       });

//       if (resp.status === 200) {
//         const response = await resp.json();
//         setResults(prevResults => (url ? [...prevResults, ...response.results] : response.results)); // Adjust if Baserow response structure is different
//         setNextUrl(response.next);
//         setError(null);
//       } else {
//         const errorText = await resp.text();
//         setError(errorText);
//       }
//     } catch (e) {
//       setError('Failed to fetch search results');
//     }

//     if (url) {
//       setIsLoadingMore(false);
//     } else {
//       setIsLoading(false);
//     }
//   };

//   const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const selected = rssOprion.find(option => option.value === event.target.value);
//     if (selected) {
//       setRssOption(selected)
//     }
//   }
//   const handleExploreMore = () => {
//     if (nextUrl) {
//       fetchSearchResults(query!, nextUrl);
//     }
//   };
//   const [mounted, setMounted] = useState(false);
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   useEffect(() => {
//     if (query) {
//       fetchSearchResults(query);
//       fetchRSSFeed(query);
//     }
//   }, [query, selectedSearchOption.value]);

//   const searchRss = () => {
//     fetchRSSFeed(query!);
//   }
//   return (
//    <Suspense fallback={<Loader />}>
//      <div className="bg-gray-100 min-h-screen">
//       <div className="w-full flex bg-white mt-[-3px] p-5 rounded-b-lg justify-between h-[10vh] relative">
//         <Link className="flex items-center" href='/'>
//           <Scale className="custom text-xl lg:text-3xl" />
//           <h2 className="custom uppercase text-2xl text-center font-bold mx-1 lg:mx-4 lg:text-3xl">
//             Law <span className="font-normal">Finder</span>
//           </h2>
//         </Link>
//         <div className='flex gap-x-4'>
//           <button
//             className={`flex items-center `}
//             onClick={() => setDrawerOpen(true)}
//           >
//             <Menu className="custom text-2xl" />
//           </button>
//         </div>
//         <Drawer shouldScaleBackground onClose={handleClose} open={drawerOpen}>
//           <DrawerContent>
//             <DrawerHeader>
//               <DrawerTitle>Find Law</DrawerTitle>
//               <DrawerDescription>Select official criminal code.</DrawerDescription>
//               {options.map((option) => (
//                 <Button
//                   key={option.value}
//                   onClick={() => setSelectedSearchOption(option)}
//                   variant={
//                     selectedSearchOption.label === option.label ? 'default' : 'outline'
//                   }
//                   className="m-1 py-2"
//                   size={'lg'}
//                 >
//                   {option.label}
//                 </Button>
//               ))}
//             </DrawerHeader>
//             <DrawerFooter>
//               <DrawerClose>
//                 <Button className="w-full bg-custome" onClick={handleClose}>
//                   Close
//                 </Button>
//               </DrawerClose>
//             </DrawerFooter>
//           </DrawerContent>
//         </Drawer>
//       </div>
//       <div className="max-w-screen-lg mx-auto py-5 px-4">
//         <div className="flex justify-start items-center mb-3 ms-2 underline">
//           <Link className="mt-3 text-2xl flex items-center gap-x-2 custom" href='/'>
//             <ArrowLeft /> Back to home
//           </Link>
//         </div>

//         <SearchBar />
//         <div className="flex justify-start items-center mb-3 ms-2">
//         {mounted && <h1 className="mt-3 text-2xl">Search Results for &quot;{query}&quot; in &quot;{selectedSearchOption.label}&quot; table</h1>}
//         </div>

//         {isLoading ? (
//           <div className="flex justify-center items-center h-[40vh]">
//             <Loader />
//           </div>
//         ) : error ? (
//           <Error error={error} />
//         ) : results.length > 0 ? (
//           <ul className="divide-y divide-gray-200">
//             {results.map((data, index) => (
//               <SearchResultList data={data} index={index} key={data.id} />
//             ))}
//             {isLoadingMore && (
//               <div className="flex justify-center my-4">
//                 <Loader />
//               </div>
//             )}
//             {nextUrl && !isLoadingMore && (
//               <div className="flex justify-center my-4">
//                 <button
//                   className="text-blue-500 font-semibold hover:underline"
//                   onClick={handleExploreMore}
//                 >
//                   Explore More
//                 </button>
//               </div>
//             )}
//           </ul>
//         ) : (
//           <div>No results found</div>
//         )}

//         <div className="mt-5">
//           <h2 className="text-2xl bg-custome text-white p-5 rounded-xl">RSS Feed Results</h2>
//           {isRssLoading ? (
//             <Loader />
//           ) : rssError ? (
//             <Error error={rssError} />
//           ) : rssItems && rssItems.length > 0 ? (
//             <>
//               <div className="flex justify-start items-center mb-3 ms-2">
//                 <h1 className="mt-3 text-2xl">{rssresponce.description[0]}</h1>
//               </div>
//               <div className="flex items-center justify-end space-x-2">
//                 <div>
//                   <Switch id="airplane-mode" checked={getJudgements} onCheckedChange={(checked) => setGetJudgements(checked)} />
//                   <label className="text-sm font-semibold">
//                     Judgments
//                   </label>
//                 </div>
//                 <div>
//                   <select
//                     value={rssOption.value}
//                     onChange={handleChange}
//                   >
//                     {
//                       rssOprion.map((opt, index) => {
//                         return (
//                           <option key={index} value={opt.value}>{opt.label}</option>
//                         )
//                       })
//                     }
//                   </select>
//                 </div>
//                 <div>
//                  {
//                   query &&  <Button onClick={searchRss}>
//                   Search
//                 </Button>
//                  }
//                 </div>
//               </div>
//               <ul className="divide-y divide-gray-200">
//                 {rssItems.map((item: any, index: number) => (
//                   <li key={index} className=" py-4 bg-white rounded-xl my-2 px-4">
//                     <a href={item.link} target='_blank' className="text-blue-500 hover:underline">{item.title}</a>

//                     <p>{item.contentSnippet}</p>
//                     <p dangerouslySetInnerHTML={{ __html: item.description }}></p>
//                   </li>
//                 ))}
//               </ul>
//             </>
//           ) : (
//             <div>No RSS feed results found</div>
//           )}
//         </div>
//       </div>
//     </div>
//     </Suspense>
//   );
// };

// export default SearchPage;


'use client'
import { Suspense, useEffect, useState } from 'react';
import { ArrowLeft, Menu, Scale, Search } from 'lucide-react';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { rssOprion, useDataState } from '@/context/dataContext';
import { options, useOptions } from '@/context/optionContext';
import { API_URL } from '@/utils/constant';
import Link from 'next/link';
import Loader from '@/components/shared/Loader';
import Error from '@/components/shared/Error';
import SearchResultList from '@/components/shared/SearchResultList';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';



const SearchPage = () => {
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  const { getJudgements, setGetJudgements, rssOption, setRssOption } = useDataState();
  const query = searchParams.get('q');

  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { selectedSearchOption, setSelectedSearchOption } = useOptions();
  const handleClose = () => {
    setDrawerOpen(false);
  };
  const [rssItems, setRssItems] = useState<any>([]);
  const [rssError, setRssError] = useState<null | string>(null);
  const [isRssLoading, setIsRssLoading] = useState(false);
  const [rssresponce, setRssResponce] = useState<any>([]);
  const [searchquery, setSearchQuery] = useState('');

  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/search?q=' + searchquery);
  };

  const fetchData = async (query: any, getJudgements: any, rssOption: any) => {
    const feedUrl = `/api/rss?search=${query}&q=${getJudgements}&sort=${rssOption.value}`;
    const response = await fetch(feedUrl);
    const data = await response.json();
    return data.data;
  }
  const fetchRSSFeed = async (query: string) => {
  setIsRssLoading(true);
    try {

      const feed = await fetchData(query, getJudgements, rssOption)
      setRssResponce(feed.rss.channel[0])
      setRssItems(feed.rss.channel[0].item);
      setRssError(null);
    } catch (e) {
      setRssError('Failed to fetch RSS feed');
    }
    setIsRssLoading(false);
  };

  const fetchSearchResults = async (query: string, url?: string) => {
    if (url) {
      setIsLoadingMore(true);
    } else {
      setIsLoading(true);
      setNextUrl(null);
    }

    try {
      const apiUrl = url || `${API_URL}/database/rows/table/${selectedSearchOption.id}/?user_field_names=true&search=${query}&size=20`;
      const resp = await fetch(apiUrl, {
        headers: {
          Authorization: `Token d9guJA1em35vOcs3y3ibAYPkaZs8HIJL`, // Replace with your Baserow API key
        },
      });

      if (resp.status === 200) {
        const response = await resp.json();
        setResults(prevResults => (url ? [...prevResults, ...response.results] : response.results));
        setNextUrl(response.next);
        setError(null);
      } else {
        const errorText = await resp.text();
        setError(errorText);
      }
    } catch (e) {
      setError('Failed to fetch search results');
    }

    if (url) {
      setIsLoadingMore(false);
    } else {
      setIsLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = rssOprion.find(option => option.value === event.target.value);
    if (selected) {
      setRssOption(selected);
    }
  };

  const handleExploreMore = () => {
    if (nextUrl) {
      fetchSearchResults(query!, nextUrl);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (query) {
      fetchSearchResults(query);
      fetchRSSFeed(query);
    }
  }, [query, selectedSearchOption.value]);

  const searchRss = () => {
    fetchRSSFeed(query!);
  };

  return (
    <Suspense fallback={<Loader />}>
      {mounted && (
        <div className="bg-gray-100 min-h-screen">
          <div className="w-full flex bg-white mt-[-3px] p-5 rounded-b-lg justify-between h-[10vh] relative">
            <Link className="flex items-center" href='/'>
              <Scale className="custom text-xl lg:text-3xl" />
              <h2 className="custom uppercase text-2xl text-center font-bold mx-1 lg:mx-4 lg:text-3xl">
                Law <span className="font-normal">Finder</span>
              </h2>
            </Link>
            <div className='flex gap-x-4'>
              <button
                className={`flex items-center `}
                onClick={() => setDrawerOpen(true)}
              >
                <Menu className="custom text-2xl" />
              </button>
            </div>
            <Drawer shouldScaleBackground onClose={handleClose} open={drawerOpen}>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Find Law</DrawerTitle>
                  <DrawerDescription>Select official criminal code.</DrawerDescription>
                  {options.map((option) => (
                    <Button
                      key={option.value}
                      onClick={() => setSelectedSearchOption(option)}
                      variant={
                        selectedSearchOption.label === option.label ? 'default' : 'outline'
                      }
                      className="m-1 py-2"
                      size={'lg'}
                    >
                      {option.label}
                    </Button>
                  ))}
                </DrawerHeader>
                <DrawerFooter>
                  <DrawerClose>
                    <Button className="w-full bg-custome" onClick={handleClose}>
                      Close
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
          <div className="max-w-screen-lg mx-auto py-5 px-4">
            <div className="flex justify-start items-center mb-3 ms-2 underline">
              <Link className="mt-3 text-2xl flex items-center gap-x-2 custom" href='/'>
                <ArrowLeft /> Back to home
              </Link>
            </div>

            {/* <SearchBar /> */}
            <div className="flex items-center bg-white p-4 w-full">
              <form onSubmit={handleSearch} className="search-bar w-full flex items-center">
                <span className="flex items-center w-full">
                  <Input
                    placeholder="Quick Search"
                    className="bg-transparent border-gray-800 mr-[-10px] flex-grow"
                    value={searchquery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    required
                    type="text"
                  />
                  <Button className="bg-custome p-2 ml-[-5px]" size={'icon'} type="submit">
                    <Search className="text-white" />
                  </Button>
                </span>
              </form>

            </div>
            <div className="flex justify-start items-center mb-3 ms-2">
              {mounted && <h1 className="mt-3 text-2xl">Search Results for &quot;{query}&quot; in &quot;{selectedSearchOption.label}&quot; table</h1>}
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-[40vh]">
                <Loader />
              </div>
            ) : error ? (
              <Error error={error} />
            ) : results.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {results.map((data, index) => (
                  <SearchResultList data={data} index={index} key={data.id} />
                ))}
                {isLoadingMore && (
                  <div className="flex justify-center my-4">
                    <Loader />
                  </div>
                )}
                {nextUrl && !isLoadingMore && (
                  <div className="flex justify-center my-4">
                    <button
                      className="text-blue-500 font-semibold hover:underline"
                      onClick={handleExploreMore}
                    >
                      Explore More
                    </button>
                  </div>
                )}
              </ul>
            ) : (
              <div>No results found</div>
            )}

            <div className="mt-5">
              <h2 className="text-2xl bg-custome text-white p-5 rounded-xl">RSS Feed Results jod bee</h2>
              {isRssLoading ? (
                <Loader />
              ) : rssError ? (
                <Error error={rssError} />
              ) : rssItems && rssItems.length > 0 ? (
                <>
                  <div className="flex justify-start items-center mb-3 ms-2">
                    <h1 className="mt-3 text-2xl">{rssresponce.description[0]}</h1>
                  </div>
                  <div className="flex items-center justify-end space-x-2">
                    <div>
                      <Switch id="airplane-mode" checked={getJudgements} onCheckedChange={(checked) => setGetJudgements(checked)} />
                      <label className="text-sm font-semibold">
                        Judgments
                      </label>
                    </div>
                    <div>
                      <select
                        value={rssOption.value}
                        onChange={handleChange}
                      >
                        {
                          rssOprion.map((opt, index) => {
                            return (
                              <option key={index} value={opt.value}>{opt.label}</option>
                            )
                          })
                        }
                      </select>
                    </div>
                    <div>
                      {
                        query && <Button onClick={searchRss}>
                          Search
                        </Button>
                      }
                    </div>
                  </div>
                  <ul className="divide-y divide-gray-200">
                    {rssItems.map((item: any, index: number) => (
                      <li key={index} className=" py-4 bg-white rounded-xl my-2 px-4">
                        <a href={item.link} target='_blank' className="text-blue-500 hover:underline">{item.title}</a>

                        <p>{item.contentSnippet}</p>
                        <p dangerouslySetInnerHTML={{ __html: item.description }}></p>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <div>No RSS feed results found</div>
              )}
            </div>
          </div>
        </div>
      )}
      
    </Suspense>
  );
};

export default SearchPage;
