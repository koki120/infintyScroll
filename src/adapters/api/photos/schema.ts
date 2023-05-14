import { Photo } from "@/entities/photo/dto";

export type PhotoRes = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export const PhotoFromRes = (p: PhotoRes): Photo => ({
  albumId: p.albumId,
  id: p.id,
  title: p.title,
  url: p.url,
  thumbnailUrl: p.thumbnailUrl,
});
