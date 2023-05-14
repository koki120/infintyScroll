import axios from "axios";

import { PhotoFromRes } from "@/adapters/api/photos/schema";
import { Photo } from "@/entities/photo/dto";

const uri = "https://jsonplaceholder.typicode.com/photos";

export function usePhotosAPI() {
  return {
    findById: async (id: string, signal: AbortSignal): Promise<Photo> => {
      const res = await axios.get<Photo>(uri, {
        signal,
        params: {
          id,
        },
      });
      return PhotoFromRes(res.data);
    },
    listByAlbumId: async (
      id: string,
      signal: AbortSignal,
    ): Promise<Photo[]> => {
      const res = await axios.get<Photo[]>(uri, {
        signal,
        params: {
          albumId: id,
        },
      });
      return res.data.map((photoRes) => PhotoFromRes(photoRes));
    },
  };
}
