'use client';
import { useDataState } from '@/context/dataContext';
import { useOptions } from '@/context/optionContext';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';




const OptionSelectable: React.FC = () => {
  const router = useRouter();
  const { options, selectedOption, setSelectedOption ,setSelectedSearchOption} = useOptions(); 
  const {setCurrentIndex,setPageNum}=useDataState();
  const [query, setQuery] = useState('');
//   const navigate = useNavigate();
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = options.find(option => option.value === event.target.value);
    if (selected) {
      setSelectedOption(selected);
      setSelectedSearchOption(selected);
      setCurrentIndex(0)
      setPageNum(1)
    }
  }


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/search?q=' + query);
};



  return (
    <div className="w-full my-4 items-center hidden lg:flex justify-center lg:max-w-[80%] lg:mx-auto bg-white shadow-lg p-3 rounded-lg ">
      <div className="w-inherit">
        <div className="my-3">
          <h2 className="font-semibold text-xl">Find Law</h2>
        </div>
        <div className="flex flex-row space-x-4 my-2 items-end justify-between">
          <div className="flex flex-col w-[25%]">
            <label className="text-sm text-gray-400">
              Select official criminal code*
            </label>
            <select
              value={selectedOption.value} 
              onChange={handleChange}
              id="code_type"
              className="p-3 border rounded-lg border-slate-500 bg-white"
            >
              {options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <form onSubmit={handleSearch} className='search-bar w-full flex items-center justify-between'>
          <div className="flex flex-col w-[70%]">
            <label className="text-sm text-gray-400">Enter Low</label>
            <input
              type="text"
              className="p-3 border rounded-lg border-slate-500 bg-white"
              placeholder="eg. Definations In the Code to be understood subject to exceptions "
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
             
            />
          </div>
          <div className="w-[28%] mt-4">
            <button type='submit' className="py-3 px-5 bg-custome   rounded-lg text-white text-lg capitalize w-full font-semibold">
              Search Low
            </button>
          </div>
          </form>
        
        </div>
      </div>
    </div>
  );
};

export default OptionSelectable;
