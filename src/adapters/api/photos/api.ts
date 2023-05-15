import axios from "axios";

import { PhotoFromRes } from "@/adapters/api/photos/schema";
import { Photo } from "@/entities/photo/dto";
import { PhotoAPI } from "@/usecase/interface/Photo";

const uri = "https://jsonplaceholder.typicode.com/photos";

export function usePhotoAPI(): PhotoAPI {
  return {
    findById: async (id: string): Promise<Photo> => {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const res = await axios.get<Photo>(`${uri}/${id}`, {});
      return PhotoFromRes(res.data);
    },
    listByAlbumId: async (id: string): Promise<Photo[]> => {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const res = await axios.get<Photo[]>(uri, {
        params: {
          albumId: id,
        },
      });
      return res.data.map((photoRes) => PhotoFromRes(photoRes));
    },
  };
}
