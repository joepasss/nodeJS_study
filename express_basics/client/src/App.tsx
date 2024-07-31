import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./components/Router";

const App = () => {
  return (
    <div className="app">
      <Suspense>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
};

export default App;
