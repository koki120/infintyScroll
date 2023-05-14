import { PhotoAPI } from "@/usecase/interface/Photo";

export const findPhotoById = async (
  deps: { api: PhotoAPI },
  id: string,
  signal: AbortSignal,
) => deps.api.findById(id, signal);

export const listPhotoByAlbumId = async (
  deps: { api: PhotoAPI },
  id: string,
  signal: AbortSignal,
) => deps.api.listByAlbumId(id, signal);
