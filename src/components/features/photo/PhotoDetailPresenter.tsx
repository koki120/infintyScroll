import { Link } from "react-router-dom";

import { appURL } from "@/components/functions/appURL";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { SixDotsScaleMiddle } from "@/components/ui/SixDotsScaleMiddle";
import { Photo } from "@/entities/photo/dto";

type Props = {
  isLoading: boolean;
  hasFailed: boolean;
  photo: Photo;
};

export function PhotoDetailPresenter({ isLoading, hasFailed, photo }: Props) {
  return (
    <div className="mx-auto flex w-1/2 flex-col items-center justify-center gap-9 p-10">
      {isLoading ? (
        <SixDotsScaleMiddle />
      ) : (
        <>
          {hasFailed && <ErrorMessage message="情報の取得に失敗しました" />}
          <img alt={photo.title} src={photo.thumbnailUrl} />
          <h1>{photo.title}</h1>
        </>
      )}
      <Link to={appURL.photo}>
        <button
          className="rounded-xl bg-slate-800 p-1 text-white shadow-md"
          type="button"
        >
          back
        </button>
      </Link>
    </div>
  );
}
