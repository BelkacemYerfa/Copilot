import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

interface QueryProp {
  queryKey: string;
  fetchFunc: <T>() => Promise<T>;
}

const useAxios = <T>({ queryKey, fetchFunc }: QueryProp) => {
  return useQuery<T>([`${queryKey}`], fetchFunc);
};

export default useAxios;
