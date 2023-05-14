import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { DefaultLayout } from "@/components/layouts/DefaultLayout";
import { PhotoDetailPage } from "@/components/pages/PhotoDetailPage";
import { PhotoPage } from "@/components/pages/PhotoPage";

export const appURL = {
  error: "*",
  photo: "/",
  photoDetail: "/:id",
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<DefaultLayout />}>
      <Route path={appURL.photo} element={<PhotoPage />} />,
      <Route path={appURL.photoDetail} element={<PhotoDetailPage />} />
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
