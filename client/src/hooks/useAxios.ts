import { useQuery } from "@tanstack/react-query";

interface QueryProp<T> {
  queryKey: string;
  fetchFunc: () => Promise<T>;
}

const useAxios = <T>({ queryKey, fetchFunc }: QueryProp<T>) => {
  return useQuery<T>([`${queryKey}`], fetchFunc);
};

export default useAxios;
