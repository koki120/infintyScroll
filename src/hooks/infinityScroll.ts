import { useState, useRef, useCallback, useEffect } from "react";

export type InfinityScrollHookType<T> = {
  hasFailed: boolean;
  ret: T[];
  isLoading: boolean;
  scrollTriggerRef: (el: HTMLDivElement) => void;
};

export const useInfinityScroll = <T>(
  list: (skip: string) => Promise<T[]>,
): InfinityScrollHookType<T> => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasFailed, setHasFailed] = useState<boolean>(false);
  const [ret, setRet] = useState<T[]>([]);
  // 描画に直接関係あるStateとではない  また、useRefはreactのサイクルに関係なく即時更新可能。
  const skip = useRef(1);
  const scrollTrigger = useRef<HTMLDivElement>();

  const listInUseEffect = useCallback(async (exe: boolean) => {
    try {
      if (exe) setIsLoading(true);
      const result = list(String(skip.current));
      skip.current += 1;
      // awaitを後ですることで、scroll.current += 1をする前にpromiseをしなくなる。
      const awaitResult = await result;
      if (exe) setRet((pre) => [...pre, ...awaitResult]);
    } catch (e) {
      if (exe) setHasFailed(true);
    } finally {
      if (exe) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let exe = true;
    const intersectionObserver = new IntersectionObserver((entities) => {
      entities.forEach((entity) => {
        if (entity.isIntersecting) {
          (async () => {
            await listInUseEffect(exe);
          })();
        }
      });
    });
    if (scrollTrigger.current) {
      intersectionObserver.observe(scrollTrigger.current);
    }
    return () => {
      // 全てのset関数の中止
      exe = false;
      // 監視の停止
      if (scrollTrigger.current) {
        intersectionObserver.unobserve(scrollTrigger.current);
      }
    };
  }, []);

  const scrollTriggerRef = (el: HTMLDivElement) => {
    scrollTrigger.current = el;
  };
  return { isLoading, hasFailed, ret, scrollTriggerRef };
};
