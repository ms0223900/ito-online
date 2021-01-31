export interface FetchDataByAPIOptions<DefaultRes> {
  uri: string
  requestInit?: RequestInit
  defaultRes: DefaultRes
  isPostMethod?: boolean
  postForm?: Record<string, string>
}

export const getFetchPostInit = (isPostMethod=false, postForm={}) => {
  return isPostMethod ? {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(postForm)
  } : {};
};

async function fetchDataByAPI<DefaultRes>({
  uri, 
  defaultRes,
  requestInit,
  isPostMethod,
  postForm,
}: FetchDataByAPIOptions<DefaultRes>) {
  try {
    const fetchPostInit: RequestInit = getFetchPostInit(isPostMethod, postForm);

    const res = await fetch(uri, {
      mode: 'cors',
      ...fetchPostInit,
      ...requestInit,
    });
    const res_1 = await res.json();
    return res_1;
  } catch (rej) {
    console.log(rej);
    return defaultRes;
  }
}

export default fetchDataByAPI;