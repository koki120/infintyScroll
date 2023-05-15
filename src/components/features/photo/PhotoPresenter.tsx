import { Link } from "react-router-dom";

import { appURL } from "@/components/functions/appURL";
import { Card } from "@/components/ui/Card";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
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
    <div className="mx-auto flex w-2/3 flex-col gap-y-4">
      {hasFailed && (
        <ErrorMessage
          className="text-center"
          message="情報の取得に失敗しました"
        />
      )}
      <nav className="flex flex-wrap gap-5">
        {photos.map((photo) => (
          <Card
            className="flex h-44 w-44 flex-col items-center justify-center p-2"
            key={photo.id + photo.albumId + photo.title}
          >
            <Link to={appURL.photoDetail.replace(":id", String(photo.id))}>
              <img
                className="h-36 w-36 rounded-2xl"
                src={photo.thumbnailUrl}
                alt={photo.title}
              />
              <p className="text-center">{photo.id}</p>
            </Link>
          </Card>
        ))}
      </nav>
      {isLoading && <SixDotsScaleMiddle className="mx-auto" />}
      <div id="scrollTrigger" ref={scrollTriggerRef} />
    </div>
  );
}
