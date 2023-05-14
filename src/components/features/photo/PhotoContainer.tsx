import { useCallback, useEffect, useRef, useState } from "react";

import { PhotoPresenter } from "@/components/features/photo/PhotoPresenter";
import { Photo } from "@/entities/photo/dto";
import { useListPhotoByAlbumId } from "@/hooks/injections";

export function PhotoContainer() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasFailed, setHasFailed] = useState<boolean>(false);
  const [ret, setRet] = useState<Photo[]>([]);
  // 描画に直接関係あるStateとではない
  const [scroll, setScroll] = useState(1);
  const scrollTriggerRef = useRef<HTMLDivElement>();

  const listInUseEffect = useCallback(
    async (cancel: boolean, abortController: AbortController) => {
      try {
        setIsLoading(true);
        const list = useListPhotoByAlbumId();

        const result = await list(String(scroll), abortController.signal);
        if (!cancel) {
          setScroll((pre) => pre + 1);
          setRet((pre) => [...pre, ...result]);
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
    },
    [],
  );

  useEffect(() => {
    const abortController = new AbortController();
    let cancel = false;
    listInUseEffect(cancel, abortController);
    const intersectionObserver = new IntersectionObserver((entities) => {
      entities.forEach((entity) => {
        if (entity.isIntersecting) {
          (async () => {
            await listInUseEffect(cancel, abortController);
          })();
        }
      });
    });
    if (scrollTriggerRef.current) {
      intersectionObserver.observe(scrollTriggerRef.current);
    }
    return () => {
      // axiosのcancel
      cancel = true;
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
