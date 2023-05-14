import { Photo } from "@/entities/photo/dto";

export type PhotoRes = {
  albumId: number;
  id: number;
  thumbnailUrl: string;
  title: string;
  url: string;
};

export const PhotoFromRes = (p: PhotoRes): Photo => ({
  albumId: p.albumId,
  id: p.id,
  thumbnailUrl: p.thumbnailUrl,
  title: p.title,
  url: p.url,
});
