import { usePhotoAPI } from "@/adapters/api/photos/api";

export const useFindPhotoById = () => {
  const deps = {
    api: usePhotoAPI(),
  };
  return (id: string, signal: AbortSignal) => deps.api.findById(id, signal);
};

export const useListPhotoByAlbumId = () => {
  const deps = {
    api: usePhotoAPI(),
  };
  return (id: string, signal: AbortSignal) =>
    deps.api.listByAlbumId(id, signal);
};
