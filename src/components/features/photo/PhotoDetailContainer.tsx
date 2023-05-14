import { PhotoDetailPresenter } from "@/components/features/photo/PhotoDetailPresenter";
import { newPhoto } from "@/entities/photo/constructor";
import { useFindById } from "@/hooks/findById";
import { useFindPhotoById } from "@/hooks/injections";

export function PhotoDetailContainer() {
  const { hasFailed, isLoading, ret } = useFindById(
    useFindPhotoById(),
    newPhoto,
  );
  return (
    <PhotoDetailPresenter
      hasFailed={hasFailed}
      isLoading={isLoading}
      photo={ret}
    />
  );
}
