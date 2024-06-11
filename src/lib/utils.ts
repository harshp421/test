import { IPC_BNS_TableData } from "@/utils/typs";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function getTableName(selectedOption: string) {
  switch (selectedOption) {
    case 'IPC_BNS':
      return 'IPC';
    case 'IEA_BSA':
      return 'IEA';
    case 'CRPC_BNSS':
      return 'CRPC';
    default:
      return '';
  }
}


export   const handleSelectedOption = (selectedOption: string, data: IPC_BNS_TableData) => {
  // Perform logic based on the selected option
  switch (selectedOption) {
    case 'IPC_BNS':
      const ipcBnsData = data as IPC_BNS_TableData;
      return {
        tableData: {
          I_Chapter: ipcBnsData.IPC_Chapter,
          I_Section: ipcBnsData.IPC_Section,
          I_Law: ipcBnsData.IPC_Law,
          B_Chapter: typeof ipcBnsData.BNS_Chapter === 'object' ? ipcBnsData.BNS_Chapter.value : ipcBnsData.BNS_Chapter,
          B_Section: ipcBnsData.BNS_Section,
          B_Law: ipcBnsData.BNS_Law,
          Changes: ipcBnsData.Changes,
          Legislative_Intent: ipcBnsData.Legislative_Intent,
          Compoundable_and_Non_Compoundable:  typeof ipcBnsData["Compoundable_and_Non-Compoundable"] === 'object' ? ipcBnsData["Compoundable_and_Non-Compoundable"].value : ipcBnsData["Compoundable_and_Non-Compoundable"],
          Ingredientes: ipcBnsData.Ingredientes,
          Cognizable_or_non_cognizable: ipcBnsData["Cognizable_or_non-cognizable"],
          Bailable_or_non_bailable: ipcBnsData["Bailable_or_non-bailable"],
        }
      }

    case 'IEA_BSA':
      const ieaBsaData = data as IPC_BNS_TableData;
      return {
        tableData: {
          I_Chapter: ieaBsaData?.IEA_Chapter,
          I_Section: ieaBsaData?.IEA_Section,
          I_Law: ieaBsaData.IEA_Law,
          B_Chapter: typeof ieaBsaData.BSA_Chapter === 'object' ? ieaBsaData.BSA_Chapter.value : ieaBsaData.BSA_Chapter,
          B_Section: ieaBsaData.BSA_Section,
          B_Law: ieaBsaData.BSA_Law,
          Changes: ieaBsaData.Changes,
          Legislative_Intent: ieaBsaData.Legislative_Intent,
          Compoundable_and_Non_Compoundable: typeof ieaBsaData["Compoundable_and_Non-Compoundable"] === 'object' ? ieaBsaData["Compoundable_and_Non-Compoundable"].value : ieaBsaData["Compoundable_and_Non-Compoundable"],
          Ingredientes: ieaBsaData.Ingredientes,
          Cognizable_or_non_cognizable: ieaBsaData["Cognizable_or_non-cognizable"],
          Bailable_or_non_bailable: ieaBsaData["Bailable_or_non-bailable"],
        }
      }

    case 'CRPC_BNSS':
      const crpcBnssData = data as IPC_BNS_TableData;
      return {
        tableData: {
          I_Chapter: crpcBnssData.CRPC_Chapter,
          I_Section: crpcBnssData.CRPC_Section,
          I_Law: crpcBnssData.CRPC_Law,
          B_Chapter: typeof crpcBnssData.BNSS_Chapter === 'object' ? crpcBnssData.BNSS_Chapter.value : crpcBnssData.BNSS_Chapter,
          B_Section: crpcBnssData.BNSS_Section,
          B_Law: crpcBnssData.BNSS_Law,
          Changes: crpcBnssData.Changes,
          Legislative_Intent: crpcBnssData.Legislative_Intent,
          Compoundable_and_Non_Compoundable:  typeof crpcBnssData["Compoundable_and_Non-Compoundable"] === 'object' ? crpcBnssData["Compoundable_and_Non-Compoundable"].value : crpcBnssData["Compoundable_and_Non-Compoundable"],
          Ingredientes: crpcBnssData.Ingredientes,
          Cognizable_or_non_cognizable: crpcBnssData["Cognizable_or_non-cognizable"],
          Bailable_or_non_bailable: crpcBnssData["Bailable_or_non-bailable"],
        }
      }

    default:
      return {
        tableData: {
          I_Chapter: '',
          I_Section: '',
          I_Law: '',
          B_Chapter: '',
          B_Section: '',
          B_Law: '',
          Changes: '',
          Legislative_Intent: '',
          Compoundable_and_Non_Compoundable: '',
          Ingredientes: '',
          Cognizable_or_non_cognizable: '',
          Bailable_or_non_bailable: '',

        }
      };
  }
};
