import { Photo } from "@/entities/photo/dto";

export const newPhoto = (): Photo => ({
  albumId: 0,
  id: 0,
  title: "",
  url: "",
  thumbnailUrl: "",
});
