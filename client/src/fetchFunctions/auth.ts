import axios from "axios";

interface fetchData {
  url: string;
  method: string;
}

export const authFunct = async <T>({ url, method }: fetchData): Promise<T> => {
  const data = await axios({
    url: url,
    method: method,
  });
  return data?.data;
};
