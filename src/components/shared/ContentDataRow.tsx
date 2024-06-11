'use client'
type ContentDataRowProps = {
    header: string;
    chapter?: string;
    section?: string;
    law: string;
    wrapText: boolean;
    toggleTextWrap?: any;
    wrapType?: string;
  };


const ContentDataRow:React.FC<ContentDataRowProps> = ({
  header,
  chapter,
  section,
  law,
  wrapText,
  toggleTextWrap,
  wrapType
}) => {
  return (
    <div className="min-h-[320px]  w-full  items-start flex flex-col border-b-2 lg:border-b-0 lg:border-r-2">
      <div className="w-full  lg:bg-gray-200 text-xl flex items-center lg:justify-center ps-4 pt-4 lg:py-1 lg:border-b-2 lg:font-normal font-bold">
        {header}  
      </div>
      <div className="w-full flex flex-col py-1 px-4 text-gray-500">
        <h1 className=" font-semibold text-lg lg:text-lg text-black">
          {chapter}
        </h1>
        <h2 className="font-semibold  lg:text-lg text-base text-black">
        {section}
        </h2>
        <div>
          <p className={wrapText ? 'truncate  overflow-hidden line-clamp-6 text-wrap text-sm leading-6 lg:text-base' : 'text-sm lg:text-base leading-6'}>
            {law}
          </p>
          {toggleTextWrap && (
            <button
              className="text-blue-500 hover:underline focus:outline-none"
              onClick={() => toggleTextWrap(wrapType)}
            >
              Read {wrapText ? 'More' : 'Less'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentDataRow;
