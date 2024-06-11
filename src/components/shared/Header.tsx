'use client';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Scale, Menu, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { options, useOptions } from '@/context/optionContext';
import { useDataState } from '@/context/dataContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from '../ui/input';


const Header: React.FC = () => {
    const { selectedOption, setSelectedOption, setSelectedSearchOption } = useOptions();
    const [initialOption, setInitialOption] = useState(selectedOption);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [searchBarVisible, setSearchBarVisible] = useState(false); // State for search bar visibility
    const router = useRouter();
    const { setCurrentIndex, setPageNum } = useDataState();
    const [query, setQuery] = useState('');

    

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.push('/search?q=' + query);
    };

    const handleClose = () => {
        setDrawerOpen(false);
    };

    useEffect(() => {
        if (initialOption !== selectedOption) {
            setInitialOption(selectedOption);
        }
    }, [selectedOption]);
  
    return (
        <div className="w-full flex bg-white p-3 rounded-b-lg justify-between relative">
            <Link className="flex items-center" href='/'>
                <Scale className="custome text-xl lg:text-3xl" />
                <h2 className="custome uppercase text-2xl text-center font-bold mx-1 lg:mx-4 lg:text-3xl">
                    Law <span className="font-normal">Finder</span>
                </h2>
            </Link>
            <div className='flex gap-x-2'>
                <Button
                    className="flex items-center lg:hidden bg-custome"
                    onClick={() => setSearchBarVisible(!searchBarVisible)} // Toggle search bar visibility
                    size={'icon'}
                >
                    <Search className="text-2xl" />
                </Button>

                <Button
                    className={`flex items-center bg-custome lg:hidden`}
                    onClick={() => setDrawerOpen(true)}
                    size={'icon'}
                >
                    <Menu className="text-white text-2xl" />
                </Button>
            </div>
            <Drawer shouldScaleBackground onClose={handleClose} open={drawerOpen}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Find Law</DrawerTitle>
                        <DrawerDescription>Select official criminal code.</DrawerDescription>
                        {options.map((option) => (
                            <Button
                                key={option.value}
                                onClick={() => {
                                    setSelectedOption(option);
                                    setSelectedSearchOption(option);
                                    setCurrentIndex(0);
                                    setPageNum(1);
                                }}
                                variant={
                                    selectedOption.label === option.label ? 'default' : 'outline'
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
            {searchBarVisible && (
                <div className="absolute top-0 left-0 w-full h-full bg-white flex items-center justify-center transition-transform duration-300">
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
                        {searchBarVisible && (
                            <Button className="bg-custome p-2 ml-[5px]" size={'icon'} >
                                <X className="text-white" />
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
