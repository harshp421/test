'use client';
import { Search, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useRouter } from 'next/navigation';

interface Props {
  closeSearchBar?: () => void; // Prop to close the search bar
}

const SearchBar: React.FC<Props> = ({ closeSearchBar }) => {
  const [query, setQuery] = useState('');

  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/search?q=' + query);
  };

  return (
    <div className="flex items-center bg-white p-4 w-full">
      <form onSubmit={handleSearch} className="search-bar w-full flex items-center">
        <span className="flex items-center w-full">
          <Input
            placeholder="Quick Search"
            className="bg-transparent border-gray-800 mr-[-10px] flex-grow"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
            type="text"
          />
          <Button className="bg-custome p-2 ml-[-5px]" size={'icon'} type="submit">
            <Search className="text-white" />
          </Button>
        </span>
      </form>
      {closeSearchBar && (
        <Button className="bg-custome p-2 ml-[5px]" size={'icon'} onClick={closeSearchBar}>
          <X className="text-white" />
        </Button>
      )}
    </div>
  );
};

export default SearchBar;
