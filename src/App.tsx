import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { DefaultLayout } from "@/components/layouts/DefaultLayout";

export const appURL = {
  error: "*",
  top: "/",
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<DefaultLayout />}>
      <Route
        path={appURL.top}
        element={<h1 className="h-10 w-10 bg-black">dfds</h1>}
      />
      ,
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
