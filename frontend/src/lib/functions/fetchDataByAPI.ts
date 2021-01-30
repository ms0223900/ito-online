export interface FetchDataByAPIOptions<DefaultRes> {
  uri: string
  requestInit?: RequestInit
  defaultRes: DefaultRes
}

async function fetchDataByAPI<DefaultRes>({
  uri, 
  defaultRes,
  requestInit,
}: FetchDataByAPIOptions<DefaultRes>) {
  try {
    const res = await fetch(uri, {
      mode: 'cors',
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