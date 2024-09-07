import Router from "@Routes/Router";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";

const App = () => {
  return (
    <div className="app">
      <Suspense fallback="loading ...">
        <RouterProvider router={Router} />
      </Suspense>
    </div>
  );
};

export default App;
