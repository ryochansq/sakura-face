import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import './settings';

type Student = {
  name: string;
  confidence: number;
};

type IResponse = [
  (faceId: string) => void,
  Student[],
  AxiosError | null,
  boolean
];

const useFindSimilar = (): IResponse => {
  const [data, setData] = useState<Student[]>([]);
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const findSimilar = (faceId: string) => {
    setLoading(true);
    setData([]);
    setError(null);

    axios
      .post<Student[]>('/findSimilar', { faceId })
      .then((response) => {
        setData(response.data);
        setError(null);
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        setError(err);
        setLoading(false);
      });
  };

  return [findSimilar, data, error, loading];
};

export default useFindSimilar;
