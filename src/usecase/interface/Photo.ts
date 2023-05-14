import { Photo } from "@/entities/photo/dto";

export interface PhotoAPI {
  findById: (id: string, signal: AbortSignal) => Promise<Photo>;
  listByAlbumId: (id: string, signal: AbortSignal) => Promise<Photo[]>;
}
