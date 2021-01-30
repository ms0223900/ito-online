import { useState, useCallback } from "react";
import fetchDataByAPI from "../functions/fetchDataByAPI";

export interface UseFetchOptions<Res> {
  apiPath: string
  requestInit?: RequestInit
  initResponseData: Res
  fetchFn?: (params: any) => Promise<Res>
  useCorsPrefix?: boolean
}

export default function useFetch<T>({
  apiPath, initResponseData, requestInit, fetchFn,
}: UseFetchOptions<T>) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setErr] = useState();
  const [responseData, setResponseData] = useState<T>(initResponseData);

  const fetchData = useCallback((params?: any) => {
    setLoading(true);
    const fetchCallback = fetchFn ? fetchFn(params) : fetchDataByAPI({
      uri: apiPath,
      defaultRes: initResponseData,
      requestInit,
    });

    fetchCallback
      .then(res => {
        console.log(res);
        setResponseData(res);
      })
      .catch(error => {
        console.error(error);
        setErr(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [apiPath, fetchFn, initResponseData, requestInit]);

  return {
    loading,
    error,
    fetchData,
    responseData
  };
}