import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { PhotoDetailPresenter } from "@/components/features/photo/PhotoDetailPresenter";
import { newPhoto } from "@/entities/photo/constructor";
import { Photo } from "@/entities/photo/dto";
import { useFindPhotoById } from "@/hooks/injections";

export function PhotoDetailContainer() {
  const [IsLoading, setIsLoading] = useState<boolean>(true);
  const [hasFailed, setHasFailed] = useState<boolean>(false);
  const [photo, setPhoto] = useState<Photo>(useMemo(() => newPhoto(), []));
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    const abortController = new AbortController();
    const findById = useFindPhotoById();
    (async () => {
      try {
        setIsLoading(true);
        if (id === undefined || id === "") {
          throw new Error("Not Found");
        }
        const result = await findById(id, abortController.signal);
        setPhoto(result);
      } catch (e) {
        setHasFailed(true);
      } finally {
        setIsLoading(false);
      }
    })();
    //  最後の();は関数の実行
    return () => {
      // axiosのcancel
      abortController.abort();
    };
  }, []);

  return (
    <PhotoDetailPresenter
      hasFailed={hasFailed}
      isLoading={IsLoading}
      photo={photo}
    />
  );
}
