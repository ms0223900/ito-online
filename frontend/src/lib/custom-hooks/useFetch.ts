import { useState, useCallback } from "react";
import fetchDataByAPI, { FetchDataByAPIOptions } from "../functions/fetchDataByAPI";

export interface UseFetchOptions<Res> extends Omit<FetchDataByAPIOptions<Res>, 'uri' | 'defaultRes'> {
  apiPath: string
  requestInit?: RequestInit
  initResponseData: Res
  fetchFn?: (params: any) => Promise<Res>
}

export default function useFetch<T>({
  apiPath, initResponseData, requestInit, fetchFn, isPostMethod,
}: UseFetchOptions<T>) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setErr] = useState();
  const [responseData, setResponseData] = useState<T>(initResponseData);

  const fetchData = useCallback((params={
    postForm: {},
  }) => {
    setLoading(true);
    const fetchCallback = fetchFn ? fetchFn(params) : fetchDataByAPI({
      uri: apiPath,
      defaultRes: initResponseData,
      requestInit: {
        ...requestInit,
        ...params,
      },
      isPostMethod,
      postForm: params.postForm,
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
  }, [apiPath, fetchFn, initResponseData, requestInit, isPostMethod]);

  return {
    loading,
    error,
    fetchData,
    responseData
  };
}