import { useLocation } from "umi";

interface Query {
  [key: string]: string;
}

const usePath = () => {
  const location: any = useLocation();
  const { query }: { query: Query } = location;
  const queryHook: Query = query;
  return { queryHook, ...useLocation() };
};

const useQuery = (): Query => {
  return usePath().queryHook;
};

export { usePath, useQuery };
