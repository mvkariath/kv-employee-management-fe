// import CreateEmployee from "./pages/employee-form/EmployeeForm";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { lazy, Suspense } from "react";
const Login = lazy(() => import("./pages/login/Login"));
import NotFound from "./pages/not-found/NotFound";
import { LoadingPage } from "./pages/loading-page/Loading";
import Layout from "./components/layout/Layout";
const EmployeeList = lazy(() => import("./pages/employee-list/EmployeeList"));
const EmployeeDetails = lazy(
  () => import("./pages/employee-details/EmployeeDetails")
);
const EmployeeForm = lazy(() => import("./pages/employee-form/EmployeeForm"));
// import { EmployeeTable } from "./pages/employee-list/components/EmployeeTable";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/login" />,
      errorElement: <NotFound />,
    },
    {
      path: "/login",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Login />
        </Suspense>
      ),
      errorElement: <NotFound />,
    },
    {
      path: "/employee",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<LoadingPage />}>
              <EmployeeList />
            </Suspense>
          ),
        },
        {
          path: "create",
          element: (
            <Suspense fallback={<LoadingPage />}>
              <EmployeeForm context="create" />
            </Suspense>
          ),
        },
        {
          path: "edit/:id",
          element: (
            <Suspense fallback={<LoadingPage />}>
              <EmployeeForm context="edit" />
            </Suspense>
          ),
        },
        {
          path: ":id",
          element: <EmployeeDetails />,
        },
      ],
      errorElement: (
        <Suspense fallback={<LoadingPage />}>
          <NotFound />
        </Suspense>
      ),
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
