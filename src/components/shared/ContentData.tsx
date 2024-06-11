'use client'
import { useState } from 'react';
import { useDataState } from '@/context/dataContext';
import { IPC_BNS_TableData } from '@/utils/typs';
import { Option } from '@/context/optionContext';
import Loader from './Loader';
import Error from './Error';
import { handleSelectedOption } from '@/lib/utils';
import ContentDataRow from './ContentDataRow';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
interface Props {
  data: IPC_BNS_TableData;
  isLoading: boolean;
  showModal?: boolean;
  setShowModal?: (state: boolean) => void;
  error: string | null;
  openDrawers?: boolean[];
  closeDrawer?: (index: number) => void;
  openDrawer?: () => void;
  selectedOption: Option;
  setGetJudgements: React.Dispatch<React.SetStateAction<boolean>>;
}


const ContentData: React.FC<Props> = ({
  data,
  isLoading,
  error,
  selectedOption,
  setGetJudgements

}) => {
  
  const [wrapIPCText, setWrapIPCText] = useState(true);
  const [wrapBNSText, setWrapBNSText] = useState(true);
 // const navigate = useNavigate();
 const router=useRouter();
 
  if (isLoading) {
    return (
      <div className="flex  justify-center items-center h-[40vh] ">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <Error error={error} />;
  }


  const toggleTextWrap = (id: 'ipc' | 'bns') => {
    if (id === 'bns') {
      setWrapBNSText(!wrapBNSText);
    } else if (id === 'ipc') {
      setWrapIPCText(!wrapIPCText);
    }
  };


  
  // Usage example
  const { tableData } = handleSelectedOption(selectedOption.value, data);
 console.log(tableData, data, "tableData")
 
 const handleSearch = () => {
   setGetJudgements(true);
   router.push(`/search?q=${tableData.I_Section}`);

};
  return (
    <>
      <div className="flex-grow  relative ">
        <div
          className={`flex  border-2 border-gray-300 backdrop-blur-3xl lg:flex-row lg:max-w-[80%] lg:mx-auto flex-col bg-white mx-4 mb-3 transform transition-transform  duration-1000 slide-in-bottom  rounded-xl  `}
        >
          {
            tableData.I_Law && (
              <ContentDataRow
                header={selectedOption.value === 'IPC_BNS' ? 'IPC' : selectedOption.value === 'IEA_BSA' ? 'IEA' : 'CRPC'}
                chapter={tableData.I_Chapter}
                section={tableData.I_Section}
                law={tableData.I_Law}
                wrapText={wrapBNSText}
                toggleTextWrap={toggleTextWrap}
                wrapType='bns'
              />)
          }
          {
            tableData.B_Law && (
              <ContentDataRow
                header={selectedOption.value === 'IPC_BNS' ? 'BNS' : selectedOption.value === 'IEA_BSA' ? 'BSA' : 'BNSS'}
                chapter={tableData.B_Chapter}
                section={tableData.B_Section}
                law={tableData.B_Law}
                wrapText={wrapIPCText}
                toggleTextWrap={toggleTextWrap}
                wrapType='ipc'
              />)
          }
        </div>
        {
          tableData.Changes || tableData.Legislative_Intent ? (
            <div
            className={`flex border-2	 border-gray-300 backdrop-blur-3xl   lg:flex-row lg:max-w-[80%] lg:mx-auto flex-col bg-white mx-4 my-6 transform transition-transform  duration-1000 slide-in-bottom  rounded-xl  `}
          >
            {
              tableData.Changes && (
                <ContentDataRow
                  header="Change"
                  law={tableData.Changes}
                  wrapText={false}
                />)
            }
           {
            tableData.Legislative_Intent && (
              <ContentDataRow
                header="Legislative Intent"
                law={tableData.Legislative_Intent}
                wrapText={false}
              />)
           }
          </div>
          ):""
        }
       

       {
        tableData.Compoundable_and_Non_Compoundable || tableData.Cognizable_or_non_cognizable ? (
          <div
          className={`z-0 flex   border-2	 border-gray-300 backdrop-blur-3xl lg:flex-row lg:max-w-[80%] lg:mx-auto flex-col bg-white mx-4 my-6 rounded-lg transform transition-transform  duration-1000 slide-in-bottom  `}
        >
         {
          tableData.Cognizable_or_non_cognizable && (
            <ContentDataRow
              header="Cognizable or non-cognizable"
              law={tableData.Cognizable_or_non_cognizable}
              wrapText={false}
            />)
         }
          {
            tableData.Compoundable_and_Non_Compoundable && (
              <ContentDataRow
                header="Compoundable and Non-Compoundable"
                law={tableData.Compoundable_and_Non_Compoundable}
                wrapText={false}
              />)
          }
        </div>):""
       }
        {
          tableData.Ingredientes || tableData.Bailable_or_non_bailable ? (
            <div
          className={`z-0 flex  border-2	 border-gray-300 backdrop-blur-3xl  lg:flex-row flex-col lg:max-w-[80%] lg:mx-auto bg-white mx-4 my-6 rounded-lg transform transition-transform  duration-1000 slide-in-bottom`}
        >
          {
            tableData.Bailable_or_non_bailable && (
              <ContentDataRow
                header="Bailable or non-bailable"
                law={tableData.Bailable_or_non_bailable}
                wrapText={false}
              />)
          }
          {
            tableData.Ingredientes && (
              <ContentDataRow
                header="Ingredientes"
                law={tableData.Ingredientes}
                wrapText={false}
              />)
          }
        </div>) :""
        }

        <div className='w-full'>
        <Button className='flex justify-center items-center mx-auto '
         onClick={handleSearch}
        >
          See judgments 
        </Button>
        </div>
      </div>
    </>
  );
};

export default ContentData;
