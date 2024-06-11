

export const API_URL = 'https://baserow.oizom.com/api';

export const getFieldValueForChapter = (fieldData: any) => {
    if (fieldData === undefined || fieldData === '') {
      return 'Law Comparison';
    } else {
      return fieldData;
    }
  };
  