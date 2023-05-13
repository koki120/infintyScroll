import "@/App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<h1 className="h-10 w-10 bg-black">dfds</h1>} />,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
