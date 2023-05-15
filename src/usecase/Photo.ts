import { PhotoAPI } from "@/usecase/interface/Photo";

export const findPhotoById = async (deps: { api: PhotoAPI }, id: string) =>
  deps.api.findById(id);

export const listPhotoByAlbumId = async (deps: { api: PhotoAPI }, id: string) =>
  deps.api.listByAlbumId(id);
