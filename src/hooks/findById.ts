import { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";

export type FindByIdHookType<T> = {
  ret: T;
  hasFailed: boolean;
  id: string | undefined;
  isLoading: boolean;
};

export const useFindById = <T>(
  findById: (id: string, signal: AbortSignal) => Promise<T>,
  newT: () => T,
  key?: string,
): FindByIdHookType<T> => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasFailed, setHasFailed] = useState<boolean>(false);
  const [ret, setRet] = useState<T>(useMemo(() => newT(), []));
  const { id } = useParams<{ id: string }>();

  const idToFind = (): string => {
    if (key !== undefined) return key;
    if (id !== undefined) return id;
    return "";
  };

  useEffect(() => {
    const abortController = new AbortController();
    let cancel = false;
    (async () => {
      try {
        setIsLoading(true);
        setHasFailed(false);
        if (
          (id === undefined || id === "") &&
          (key === undefined || key === "")
        ) {
          throw new Error("Not Found");
        }
        const result = await findById(idToFind(), abortController.signal);
        if (!cancel) {
          setRet(result);
        }
      } catch (e) {
        if (!cancel) {
          setHasFailed(true);
        }
      } finally {
        if (!cancel) {
          setIsLoading(false);
        }
      }
    })();
    return () => {
      // axiosのcancel
      cancel = true;
      abortController.abort();
    };
  }, []);

  return { ret, hasFailed, id, isLoading };
};
