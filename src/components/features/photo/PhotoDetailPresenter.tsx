import { Card } from "@/components/ui/Card";
import { ErrorMessage } from "@/components/ui/ErrorMessege";
import { SixDotsScaleMiddle } from "@/components/ui/SixDotsScaleMiddle";
import { Photo } from "@/entities/photo/dto";

type Props = {
  isLoading: boolean;
  hasFailed: boolean;
  photo: Photo;
};

export function PhotoDetailPresenter({ isLoading, hasFailed, photo }: Props) {
  return (
    <Card className="mx-auto flex w-1/2 flex-col items-center justify-center gap-2 p-10">
      {isLoading ? (
        <SixDotsScaleMiddle />
      ) : (
        <>
          {hasFailed && <ErrorMessage message="情報の取得に失敗しました" />}
          <img alt={photo.title} src={photo.thumbnailUrl} />
          <h1>{photo.title}</h1>
        </>
      )}
    </Card>
  );
}
