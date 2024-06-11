'use client'

import { useOptions } from '@/context/optionContext';
import { getTableName, handleSelectedOption } from '@/lib/utils';
import { ArrowBigRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Props = {
    data: any;
    index: number;
    
}

const SearchResultList = ({ data, index }: Props) => {
    const { selectedSearchOption } = useOptions();
    const router = useRouter();
   

    const { tableData } = handleSelectedOption(selectedSearchOption.value, data);
   
    return (
        <li
            key={index}
            className="py-4 bg-white rounded-xl my-2 px-4"
            
        >
            <div className="flex w-full">
                <div>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{getTableName(selectedSearchOption.value)} </span>
                    <Link className="text-blue-600 flex font-bold text-lg hover:underline" href={`/law/${data.id}`}>

                       {tableData.I_Section?.length > 90
                            ? tableData.I_Section.substring(0, 90) + '...'
                            : tableData.I_Section}
                    </Link>
                    <p className="text-gray-600">
                        {tableData.I_Law?.length > 90
                            ? tableData.I_Law.substring(0, 90) + '...'
                            : tableData.I_Law}
                    </p>
                    <p className="text-sm text-gray-500 flex my-2 items-center">
                        Chapter: {tableData.I_Chapter} <ArrowBigRight/> {tableData.B_Chapter}
                    </p>
                </div>
            </div>

          
        </li>
    )
}

export default SearchResultList