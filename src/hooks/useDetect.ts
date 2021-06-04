import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import './settings';

type Face = {
  faceId: string;
  faceRectangle: {
    width: number;
    height: number;
    left: number;
    top: number;
  };
};

type IResponse = [(file: File) => void, Face[], AxiosError | null, boolean];

const useDetect = (): IResponse => {
  const [data, setData] = useState<Face[]>([]);
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const detect = (file: File) => {
    setLoading(true);
    setData([]);
    setError(null);

    const headers = { 'content-type': 'application/octet-stream' };

    axios
      .post<Face[]>('/detect', file, { headers })
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

  return [detect, data, error, loading];
};

export default useDetect;
