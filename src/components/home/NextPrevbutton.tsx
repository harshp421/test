import { useDataState } from "@/context/dataContext";
import { Option } from "@/context/optionContext";
import { IPC_BNS_TableData } from "@/utils/typs";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  changeIndex: (types: 'up' | 'down') => void;
  data: IPC_BNS_TableData;
  currentIndex: number;
  totalData: any;
  selectedOption: Option;
  pageNum?: number;
};

const NextPrevbutton = ({
  changeIndex,
  data,
  selectedOption,
  currentIndex,
  totalData,
  pageNum
}: Props) => {
  const { totalRecords } = useDataState();
  const totalPage = Math.ceil(totalRecords / 10);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const chapterName = selectedOption.value === "IPC_BNS" ? data?.IPC_Chapter :
    selectedOption.value === "IEA_BSA" ? data?.IEA_Chapter :
      selectedOption.value === "CRPC_BNSS" ? data?.CRPC_Chapter : "";

  return (
    <div className="flex w-full items-center flex-row justify-between py-4 px-3 mt-[-5px] mx-auto md:top-0 bg-slate-100 md:relative">
      <button
        onClick={() => {
          changeIndex('down');
        }}
        className={`bg-custome h-[32px] w-[34px] flex items-center rounded-[50%] text-white px-[9px] py-[3px] text-xl ${pageNum === 1 && currentIndex === 0 && mounted ? "opacity-50" : ""}`}
        disabled={pageNum === 1 && currentIndex === 0}
      >
        <ArrowLeft />
      </button>
      <div className='flex flex-col justify-center items-center'>
        <h2 className="text-lg lg:text-3xl font-bold ">
          {chapterName === undefined ? "Law Comparison" : chapterName}
        </h2>
      </div>
      <button
        onClick={() => {
          changeIndex('up');
        }}
        className={`h-[32px] w-[34px] flex items-center bg-custome rounded-[50%] text-white px-[9px] py-[3px] text-xl ${pageNum === totalPage && currentIndex === totalData.length - 1 && mounted ? "opacity-50" : ""}`}
        disabled={pageNum === totalPage && currentIndex === totalData.length - 1}
      >
        <ArrowRight />
      </button>
    </div>
  );
};

export default NextPrevbutton;
