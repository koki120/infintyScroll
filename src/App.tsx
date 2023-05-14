import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { appURL } from "@/components/functions/appURL";
import { DefaultLayout } from "@/components/layouts/DefaultLayout";
import { PhotoDetailPage } from "@/components/pages/PhotoDetailPage";
import { PhotoPage } from "@/components/pages/PhotoPage";

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
