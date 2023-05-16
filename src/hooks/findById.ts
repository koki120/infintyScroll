import { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";

export type FindByIdHookType<T> = {
  ret: T;
  hasFailed: boolean;
  id: string | undefined;
  isLoading: boolean;
};

export const useFindById = <T>(
  findById: (id: string) => Promise<T>,
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

  const findByIdInUseEffect = async (exe: boolean) => {
    try {
      setIsLoading(true);
      setHasFailed(false);
      if (
        (id === undefined || id === "") &&
        (key === undefined || key === "")
      ) {
        throw new Error("Not Found");
      }
      const result = await findById(idToFind());
      if (exe) {
        setRet(result);
      }
    } catch (e) {
      if (exe) {
        setHasFailed(true);
      }
    } finally {
      if (exe) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    let exe = true;
    (async () => {
      await findByIdInUseEffect(exe);
    })();
    return () => {
      // 全てのset関数の中止
      exe = false;
    };
  }, []);

  return { ret, hasFailed, id, isLoading };
};
