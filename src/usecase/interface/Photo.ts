import { Photo } from "@/entities/photo/dto";

export interface PhotoAPI {
  findById: (id: string) => Promise<Photo>;
  listByAlbumId: (id: string) => Promise<Photo[]>;
}
