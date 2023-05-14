import { Link } from "react-router-dom";

import { appURL } from "@/components/functions/appURL";
import { Card } from "@/components/ui/Card";
import { ErrorMessage } from "@/components/ui/ErrorMessege";
import { SixDotsScaleMiddle } from "@/components/ui/SixDotsScaleMiddle";
import { Photo } from "@/entities/photo/dto";

type Props = {
  photos: Photo[];
  isLoading: boolean;
  hasFailed: boolean;
  scrollTriggerRef: (el: HTMLDivElement) => void;
};
export function PhotoPresenter({
  photos,
  isLoading,
  hasFailed,
  scrollTriggerRef,
}: Props) {
  return (
    <>
      <nav className="mx-auto flex w-2/3 flex-wrap gap-5">
        {hasFailed && <ErrorMessage message="情報の取得に失敗しました" />}
        {photos.map((photo) => (
          <Card className="p-1">
            <Link
              key={photo.id + photo.albumId + photo.title}
              to={appURL.photoDetail.replace(":id", String(photo.id))}
            >
              <img
                className="h-40 w-40 rounded-2xl"
                src={photo.thumbnailUrl}
                alt={photo.title}
              />
              <p>{photo.id}</p>
            </Link>
          </Card>
        ))}
      </nav>
      {isLoading && <SixDotsScaleMiddle />}
      <div id="scrollTrigger" ref={scrollTriggerRef} />
    </>
  );
}
