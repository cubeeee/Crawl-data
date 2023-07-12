import { Navigate, useRoutes } from "react-router-dom";
import { useAppSelector } from "@redux/hooks";
import { getRoutes } from "@configs/menu";
import { AUTH_PATH } from "@configs/index";
import Login from "./Login";
const View = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const authRouting = useRoutes([
    {
      path: "/*",
      element: <Navigate to={AUTH_PATH} />,
    },
    {
      path: AUTH_PATH,
      element: <Login />,
    },
  ]);
  const appRouting = useRoutes(getRoutes());
  return (
    <>
      {isAuthenticated ? appRouting : authRouting}
    </>
  );
};

export default View;
