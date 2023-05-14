import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { DefaultLayout } from "@/components/layouts/DefaultLayout";
import { PhotoPage } from "@/components/pages/PhotoPage";

export const appURL = {
  error: "*",
  top: "/",
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<DefaultLayout />}>
      <Route path={appURL.top} element={<PhotoPage />} />,
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
