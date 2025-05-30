import CreateEmployee from "./pages/employee-form/EmployeeForm";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/login/Login";
import NotFound from "./pages/not-found/NotFound";
import Layout from "./components/layout/Layout";
import EmployeeList from "./pages/employee-list/EmployeeList";
import EmployeeDetails from "./pages/employee-details/EmployeeDetails";
import { EmployeeTable } from "./pages/employee-list/components/EmployeeTable";
import EmployeeForm from "./pages/employee-form/EmployeeForm";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/login" />,
      errorElement: <NotFound />,
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: <NotFound />,
    },
    {
      path: "/employee",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <EmployeeList />,
        },
        {
          path: "create",
          element: <EmployeeForm context="create" />,
        },
        {
          path: "edit/:id",
          element: <EmployeeForm context="edit" />,
        },
        {
          path: ":id",
          element: <EmployeeDetails />,
        },
      ],
      errorElement: <NotFound />,
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
