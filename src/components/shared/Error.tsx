
'use client'
type Props = {
    error: string | null;
  };
  
  const Error = ({ error }: Props) => {
    return (
      <div className="h-full flex items-center justify-center my-4">
        <div className="bg-white shadow-md rounded-lg max-w-sm mx-auto">
          <div className="text-center">
            <h2 className="text-red-600 text-xl font-semibold mb-2">Error</h2>
            <p className="text-gray-700">{error}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Error;
  