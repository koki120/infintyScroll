import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

import { PhotoPresenter } from "@/components/features/photo/PhotoPresenter";
import { Photo } from "@/entities/photo/dto";
import { useListPhotoByAlbumId } from "@/hooks/injections";

export function PhotoContainer() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasFailed, setHasFailed] = useState<boolean>(false);
  const [ret, setRet] = useState<Photo[]>([]);
  // 描画に直接関係あるStateとではない
  const scroll = useRef(1);
  const scrollTriggerRef = useRef<HTMLDivElement>();

  const listInUseEffect = useCallback(
    async (abortController: AbortController) => {
      try {
        setIsLoading(true);
        const list = useListPhotoByAlbumId();
        const result = list(String(scroll.current), abortController.signal);
        scroll.current += 1;
        // awaitを後ですることで、scroll.current += 1をする前にfetchをしなくなる。
        const awaitResult = await result;
        setRet((pre) => [...pre, ...awaitResult]);
      } catch (e) {
        if (axios.isAxiosError(e) && e.name === "CanceledError") {
          // cancel時の処理
        } else {
          setHasFailed(true);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    const abortController = new AbortController();
    listInUseEffect(abortController);
    const intersectionObserver = new IntersectionObserver((entities) => {
      entities.forEach((entity) => {
        if (entity.isIntersecting) {
          (async () => {
            await listInUseEffect(abortController);
          })();
        }
      });
    });
    if (scrollTriggerRef.current) {
      intersectionObserver.observe(scrollTriggerRef.current);
    }
    return () => {
      // scrollの初期化
      console.log("unmount");
      scroll.current = 1;
      // axiosのcancel
      abortController.abort();
      // 監視の停止
      if (scrollTriggerRef.current) {
        intersectionObserver.unobserve(scrollTriggerRef.current);
      }
    };
  }, []);
  return (
    <PhotoPresenter
      photos={ret}
      isLoading={isLoading}
      hasFailed={hasFailed}
      scrollTriggerRef={(el: HTMLDivElement) => {
        scrollTriggerRef.current = el;
      }}
    />
  );
}
