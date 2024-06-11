export type IPC_BNS_TableData={
   
    BNS_Law ?:string;
    BNS_Section:string;
    BNS_Chapter:string | { value: string };
    IPC_Law:string;
    IPC_Section:string;
    IPC_Chapter:string;
    //for secound table
    BSA_Law?:string;
    BSA_Section:string;
    BSA_Chapter: string | { value: string };
    IEA_Law:string;
    IEA_Section:string;
    IEA_Chapter:string;
    //for third table
    BNSS_Law?:string;
    BNSS_Section:string;
    BNSS_Chapter:string | { value: string };
    CRPC_Law:string;
    CRPC_Section:string;
    CRPC_Chapter:string;

    Changes:string;
    Legislative_Intent:string;
    "Compoundable_and_Non-Compoundable":string | { value: string };
    Ingredientes:string;
    "Cognizable_or_non-cognizable":string;
    "Bailable_or_non-bailable":string;


}

export type SearchData={

    BNS_Law ?:string;
    BNS_Section:string;
    BNS_Chapter:string;
    IPC_Law:string;
    IPC_Section:string;
    IPC_Chapter:string;
    //for secound table
    BSA_Law?:string;
    BSA_Section:string;
    BSA_Chapter:string;
    IEA_Law:string;
    IEA_Section:string;
    IEA_Chapter:string;
    //for third table
    BNSS_Law?:string;
    BNSS_Section:string;
    BNSS_Chapter:string;
    CRPC_Law:string;
    CRPC_Section:string;
    CRPC_Chapter:string;



}