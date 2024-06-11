'use client';
import { getInitialState } from '@/utils/localstorage';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';


export type Option = {
    value: string;
    label: string;
    id?: number;
}

interface OptionsContextType {
    options: Option[];
    selectedOption: Option;
    setSelectedOption: (option: Option) => void;
    selectedSearchOption: Option;
    setSelectedSearchOption: (option: Option) => void;
}

export const options: Option[] = [
    { value: 'IPC_BNS', label: 'IPC --> BNS', id: 537 },
    { value: 'IEA_BSA', label: 'IEA --> BSA', id: 538 },
    { value: 'CRPC_BNSS', label: 'CRPC 1780 --> BNSS 2023', id: 539 },
];

const OptionsContext = createContext<OptionsContextType | undefined>(undefined);

interface OptionsProviderProps {
    children: ReactNode;
}

export const OptionsProvider: React.FC<OptionsProviderProps> = ({ children }) => {
    const [selectedOption, setSelectedOption] = useState<Option>(getInitialState('selectedOption', options[0]));
    const [selectedSearchOption, setSelectedSearchOption] = useState<Option>(getInitialState('selectedsearchOption', options[0]));

    useEffect(() => {
        localStorage.setItem('selectedOption', JSON.stringify(selectedOption));
        localStorage.setItem('selectedsearchOption', JSON.stringify(selectedSearchOption));
    }, [selectedOption, selectedSearchOption]);

    const value: OptionsContextType = {
        options,
        selectedOption,
        setSelectedOption,
        selectedSearchOption,
        setSelectedSearchOption
    };

    return (
        <OptionsContext.Provider value={value}>
            {children}
        </OptionsContext.Provider>
    );
};

export const useOptions = (): OptionsContextType => {
    const context = useContext(OptionsContext);
    if (!context) {
        throw new Error('useOptions must be used within an OptionsProvider');
    }
    return context;
};
