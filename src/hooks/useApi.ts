import axios from 'axios';

axios.defaults.baseURL =
  'https://jzzezp7bhc.execute-api.ap-northeast-1.amazonaws.com/dev/';

export const detect = async (file: File): Promise<Face[]> => {
  const headers = { 'content-type': 'application/octet-stream' };
  const response = await axios.post<Face[]>('/detect', file, { headers });
  return response.data;
};

export const findSimilar = async (faceId: string): Promise<Student[]> => {
  const response = await axios.post<Student[]>('/findSimilar', { faceId });
  return response.data;
};
