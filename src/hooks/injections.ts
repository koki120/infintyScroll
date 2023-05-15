import { usePhotoAPI } from "@/adapters/api/photos/api";

export const useFindPhotoById = () => {
  const deps = {
    api: usePhotoAPI(),
  };
  return (id: string) => deps.api.findById(id);
};

export const useListPhoto = () => {
  const deps = {
    api: usePhotoAPI(),
  };
  return (skip: string) => deps.api.listByAlbumId(skip);
};
